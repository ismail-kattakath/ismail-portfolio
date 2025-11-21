import type { ResumeData } from "@/types";

/**
 * Builds a comprehensive prompt for AI cover letter generation
 * Combines resume data with job description to create tailored content
 */
export function buildCoverLetterPrompt(
  resumeData: ResumeData,
  jobDescription: string
): string {
  // Extract key information from resume
  const { name, position, summary, workExperience, skills } = resumeData;

  console.log("Building prompt with resume data:", {
    name,
    position,
    summaryLength: summary?.length || 0,
    experienceCount: workExperience?.length || 0,
    skillsCount: skills?.length || 0,
  });

  // Build work experience summary
  const experienceSummary = workExperience
    ?.slice(0, 3) // Use top 3 most recent experiences
    .map((exp) => {
      const achievements = exp.keyAchievements
        ?.split("\n")
        .filter(Boolean)
        .slice(0, 3) // Top 3 achievements per job
        .join("; ");

      return `${exp.position} at ${exp.company}: ${achievements}`;
    })
    .filter(Boolean)
    .join("\n\n") || "No work experience provided";

  // Build skills summary
  const skillsList = skills
    ?.flatMap((group) => group.skills.map((s) => s.text))
    .slice(0, 15) // Top 15 skills
    .join(", ") || "No skills provided";

  console.log("Prompt data prepared:", {
    experienceSummaryLength: experienceSummary.length,
    skillsListLength: skillsList.length,
  });

  // Build the prompt
  const prompt = `You are a professional cover letter writer. Write a compelling, tailored cover letter based STRICTLY on the candidate information provided below.

CANDIDATE INFORMATION:
Name: ${name}
Current Role: ${position}

Professional Summary:
${summary}

Key Experience:
${experienceSummary}

Technical Skills: ${skillsList}

JOB DESCRIPTION:
${jobDescription}

CRITICAL REQUIREMENTS - YOU MUST FOLLOW THESE EXACTLY:
1. ONLY mention qualifications, skills, and experiences that are explicitly listed in the candidate information above
2. DO NOT invent, assume, or fabricate ANY qualifications, certifications, or experiences not shown above
3. DO NOT claim the candidate has skills not listed in their technical skills
4. DO NOT reference companies, positions, or achievements not mentioned in their experience
5. If the job requires something the candidate doesn't have, DO NOT claim they have it - focus on what they DO have
6. Use ONLY the specific metrics, achievements, and details provided in the candidate's experience

WRITING INSTRUCTIONS:
1. Write a professional cover letter that is 3-4 paragraphs long (approximately 250-350 words)
2. Start with a strong opening that shows enthusiasm and alignment with the role
3. Highlight 2-3 relevant achievements from the candidate's ACTUAL experience that match the job requirements
4. Demonstrate how the candidate's DOCUMENTED skills and experience solve the employer's needs
5. Use ONLY the specific metrics and examples from the candidate's background provided above
6. End with a confident call-to-action
7. Use a professional yet personable tone
8. DO NOT include a salutation (no "Dear Hiring Manager") or signature (no "Sincerely, ${name}")
9. DO NOT include placeholders like [Company Name] - infer from job description or omit
10. Write ONLY the body content of the cover letter

ACCURACY VERIFICATION:
Before writing each sentence, verify that ANY claim about the candidate's background is explicitly stated in the candidate information above. If you cannot find it in the provided information, DO NOT include it.

OUTPUT FORMAT:
Return ONLY the cover letter content as plain text, without any additional formatting, markdown, or explanations.`;

  return prompt;
}

/**
 * Validates the generated cover letter content
 * Ensures it meets minimum quality standards and doesn't contain fabrications
 */
export function validateCoverLetter(content: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check minimum length (should be at least 200 characters)
  if (content.length < 200) {
    errors.push("Cover letter is too short");
  }

  // Check maximum length (should not exceed 2000 characters)
  if (content.length > 2000) {
    errors.push("Cover letter is too long");
  }

  // Check for common placeholder issues
  const placeholders = [
    "[Company Name]",
    "[Your Name]",
    "[Position]",
    "Dear Hiring Manager",
    "Sincerely,",
    "Best regards,",
  ];

  for (const placeholder of placeholders) {
    if (content.includes(placeholder)) {
      errors.push(`Contains placeholder: ${placeholder}`);
    }
  }

  // Check for suspicious patterns that might indicate fabrication
  const suspiciousPatterns = [
    /certified in/i,
    /degree in(?! Computer Science)/i, // Allow only CS degree if explicitly in resume
    /licensed to/i,
    /awarded (the|a)/i,
    /published in/i,
    /patent for/i,
    /I have \d+ years/i, // Avoid specific year claims not in resume
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(content)) {
      // This is a warning, not a hard error
      // We don't add to errors but log it
      console.warn(`Cover letter may contain unverified claim: ${pattern}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Post-processes the generated cover letter
 * Cleans up formatting and ensures consistency
 */
export function postProcessCoverLetter(content: string): string {
  let processed = content.trim();

  // Remove any leading/trailing quotes that AI might add
  processed = processed.replace(/^["']|["']$/g, "");

  // Normalize line breaks (ensure double line breaks between paragraphs)
  processed = processed.replace(/\n{3,}/g, "\n\n");

  // Remove any markdown formatting that might slip through
  processed = processed.replace(/\*\*/g, "");
  processed = processed.replace(/\*/g, "");
  processed = processed.replace(/#{1,6}\s/g, "");

  return processed.trim();
}
