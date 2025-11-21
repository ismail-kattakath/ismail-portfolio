import type {
  OpenAIConfig,
  OpenAIRequest,
  OpenAIResponse,
  OpenAIError,
  StoredCredentials,
} from "@/types/openai";
import type { ResumeData } from "@/types";
import {
  buildCoverLetterPrompt,
  validateCoverLetter,
  postProcessCoverLetter,
} from "@/lib/prompts/coverLetter";

const STORAGE_KEY = "ai_cover_letter_credentials";
const REQUEST_TIMEOUT = 120000; // 120 seconds (2 minutes) - increased for thinking models like OLMo-3

/**
 * Custom error class for OpenAI API errors
 */
export class OpenAIAPIError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly type?: string
  ) {
    super(message);
    this.name = "OpenAIAPIError";
  }
}

/**
 * Makes a request to OpenAI-compatible API
 */
async function makeOpenAIRequest(
  config: OpenAIConfig,
  request: OpenAIRequest
): Promise<OpenAIResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`${config.baseURL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Try to parse error response
      let errorMessage = `API request failed with status ${response.status}`;
      try {
        const errorData: OpenAIError = await response.json();
        errorMessage = errorData.error.message || errorMessage;
        throw new OpenAIAPIError(
          errorMessage,
          errorData.error.code,
          errorData.error.type
        );
      } catch (parseError) {
        // If can't parse error, throw generic error
        if (parseError instanceof OpenAIAPIError) {
          throw parseError;
        }
        throw new OpenAIAPIError(errorMessage);
      }
    }

    const data: OpenAIResponse = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof OpenAIAPIError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new OpenAIAPIError(
          "Request timed out after 2 minutes. The model may be too slow or the server is overloaded. Try using a faster model or check your server status.",
          "timeout"
        );
      }

      if (error.message.includes("fetch")) {
        throw new OpenAIAPIError(
          "Unable to connect to AI server. Please check the URL and ensure the server is running.",
          "network_error"
        );
      }

      throw new OpenAIAPIError(error.message);
    }

    throw new OpenAIAPIError("An unexpected error occurred");
  }
}

/**
 * Generates a cover letter using OpenAI API
 */
export async function generateCoverLetter(
  config: OpenAIConfig,
  resumeData: ResumeData,
  jobDescription: string
): Promise<string> {
  // Build the prompt
  const prompt = buildCoverLetterPrompt(resumeData, jobDescription);

  // Prepare the request
  const request: OpenAIRequest = {
    model: config.model,
    messages: [
      {
        role: "system",
        content:
          "You are a professional cover letter writer with expertise in highlighting candidate strengths and tailoring content to job requirements. You write compelling, specific, and achievement-focused cover letters.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 800,
    top_p: 0.9,
  };

  // Make the API request
  const response = await makeOpenAIRequest(config, request);

  // Extract the generated text
  if (!response.choices || response.choices.length === 0) {
    throw new OpenAIAPIError(
      "AI generated an empty response. Please try again.",
      "empty_response"
    );
  }

  const generatedContent = response.choices[0].message.content;

  if (!generatedContent || generatedContent.trim().length === 0) {
    throw new OpenAIAPIError(
      "AI generated an empty response. Please try rephrasing the job description.",
      "empty_content"
    );
  }

  // Post-process the content
  const processedContent = postProcessCoverLetter(generatedContent);

  // Validate the content
  const validation = validateCoverLetter(processedContent);
  if (!validation.isValid) {
    console.warn("Cover letter validation warnings:", validation.errors);
    // Still return the content, but log warnings
  }

  return processedContent;
}

/**
 * Saves API credentials and job description to localStorage
 */
export function saveCredentials(credentials: StoredCredentials): void {
  if (typeof window === "undefined") return;

  if (credentials.rememberCredentials) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
  } else {
    // Clear credentials but keep job description if it was provided
    if (credentials.lastJobDescription) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          apiUrl: "",
          apiKey: "",
          rememberCredentials: false,
          lastJobDescription: credentials.lastJobDescription,
        })
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

/**
 * Loads API credentials from localStorage
 */
export function loadCredentials(): StoredCredentials | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const credentials: StoredCredentials = JSON.parse(stored);
    return credentials;
  } catch (error) {
    console.error("Failed to load credentials:", error);
    return null;
  }
}

/**
 * Clears stored API credentials
 */
export function clearCredentials(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Tests the API connection
 */
export async function testConnection(config: OpenAIConfig): Promise<boolean> {
  try {
    const request: OpenAIRequest = {
      model: config.model,
      messages: [
        {
          role: "user",
          content: "Hello",
        },
      ],
      max_tokens: 5,
    };

    await makeOpenAIRequest(config, request);
    return true;
  } catch (error) {
    return false;
  }
}
