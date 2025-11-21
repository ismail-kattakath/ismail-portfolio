# AI Cover Letter Generator

## Overview

The AI Cover Letter Generator is a client-side feature that allows users to automatically generate tailored cover letters using AI. It integrates with OpenAI-compatible APIs to create professional, customized cover letters based on resume data and job descriptions.

**Requirements:**
- OpenAI API credentials (API key)
- OpenAI-compatible API endpoint (OpenAI, Azure OpenAI, or local LLM servers like LM Studio)
- Internet connection (for remote APIs) or local AI server running

## Features

- ✨ **AI-Powered Generation**: Leverages OpenAI-compatible APIs to generate tailored cover letters
- 🔒 **Client-Side Processing**: All API calls happen in the browser - no backend required
- 💾 **Credential Persistence**: Optionally save API credentials locally for convenience
- 🎯 **Smart Prompting**: Intelligent prompt engineering that combines resume data with job requirements
- ✅ **Accuracy Guarantee**: AI is strictly instructed to ONLY use qualifications and experiences from your actual resume data - no fabrication allowed
- 🛡️ **Validation**: Built-in checks to detect and warn about potential unverified claims
- ⚡ **Fast & Responsive**: Typical generation time: 3-10 seconds
- 🔐 **Secure**: Credentials stored locally in browser, never sent to external servers (except your configured API)
- ♿ **Accessible**: Full keyboard support and screen reader compatibility

## User Interface

### Generate with AI Button

Located at the bottom of the cover letter content textarea on the `/cover-letter/edit` page:

```
┌─────────────────────────────────────────────┐
│  ✨ Generate with AI                        │
│  Let AI craft your cover letter             │
└─────────────────────────────────────────────┘
```

### AI Generation Modal

When clicked, opens a modal with:

1. **API URL** - Enter your OpenAI-compatible endpoint:
   - OpenAI: `https://api.openai.com` (default)
   - Azure OpenAI: `https://your-resource.openai.azure.com`
   - Local LM Studio: `http://localhost:1234` or custom address
2. **API Key** - Password field with show/hide toggle (required)
   - Get from: https://platform.openai.com/api-keys (for OpenAI)
   - Or your local server's configuration
3. **Remember Credentials** - Checkbox to save credentials locally
4. **Job Description** - Large textarea for pasting job posting
5. **Generate Button** - Triggers the AI generation

## How It Works

### 1. User Flow

1. User clicks "Generate with AI" button
2. Modal opens with form fields
3. User enters:
   - API URL (or uses default)
   - API Key
   - Job Description
4. Optionally checks "Remember credentials"
5. Clicks "Generate Cover Letter"
6. AI processes request (3-10 seconds)
7. Generated cover letter replaces textarea content
8. Modal closes automatically

### 2. Technical Flow

```
User Input (Job Description)
    ↓
Combine with Resume Data (resume.json)
    ↓
Build Prompt (Prompt Engineering)
    ↓
Send to OpenAI-Compatible API
    ↓
Receive Generated Content
    ↓
Post-Process & Validate
    ↓
Insert into Cover Letter Textarea
```

### 3. Prompt Engineering

The system builds a comprehensive prompt that includes:

- **Candidate Info**: Name, position, contact details
- **Professional Summary**: From resume.json
- **Work Experience**: Top 3 most recent positions with achievements
- **Skills**: Relevant technical and soft skills
- **Job Description**: User-provided job posting
- **Generation Instructions**: Specific formatting and style guidelines
- **CRITICAL ACCURACY RULES**: Explicit instructions to the AI to ONLY use information from the provided resume data and NEVER fabricate qualifications, skills, or experiences

Example prompt structure:
```
You are a professional cover letter writer. Write based STRICTLY on the
candidate information provided below.

CANDIDATE INFORMATION:
Name: John Doe
Current Role: Senior Software Engineer
Professional Summary: [...]
Key Experience: [...]
Technical Skills: [...]

JOB DESCRIPTION:
[User-provided job posting]

CRITICAL REQUIREMENTS - YOU MUST FOLLOW THESE EXACTLY:
1. ONLY mention qualifications, skills, and experiences explicitly listed above
2. DO NOT invent, assume, or fabricate ANY qualifications not shown above
3. DO NOT claim skills not listed in their technical skills
4. DO NOT reference companies or achievements not mentioned in their experience
5. If the job requires something the candidate doesn't have, DO NOT claim they have it
6. Use ONLY the specific metrics and details provided in the candidate's experience

WRITING INSTRUCTIONS:
1. Write 3-4 paragraphs (250-350 words)
2. Highlight 2-3 relevant achievements from the candidate's ACTUAL experience
3. Show how DOCUMENTED skills solve employer needs
4. Use ONLY specific metrics from the candidate's background provided above
5. NO salutation or signature
[...]

ACCURACY VERIFICATION:
Before writing each sentence, verify that ANY claim about the candidate's
background is explicitly stated in the candidate information above.
```

**This ensures the AI never fabricates qualifications or experiences not in your resume!**

### 4. API Integration

Compatible with any OpenAI-compatible API:

**Request Format:**
```json
POST {baseURL}/v1/chat/completions
{
  "model": "openai/gpt-oss-20b",
  "messages": [
    {
      "role": "system",
      "content": "You are a professional cover letter writer..."
    },
    {
      "role": "user",
      "content": "[Generated prompt with resume + job description]"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 800
}
```

**Response:**
```json
{
  "choices": [
    {
      "message": {
        "content": "[Generated cover letter text]"
      }
    }
  ]
}
```

## Setup & Configuration

### Option 1: OpenAI API (Recommended for Most Users)

1. **Get OpenAI API Key**
   - Visit https://platform.openai.com/api-keys
   - Sign up or log in
   - Create a new API key
   - Copy the key (starts with `sk-...`)

2. **Configure in Application**
   - API URL: `https://api.openai.com`
   - API Key: Your OpenAI API key (e.g., `sk-proj-...`)
   - Model: `gpt-4` or `gpt-3.5-turbo` (automatically configured)

3. **Costs**
   - Typical cover letter: ~800 tokens (~$0.01-0.03 per generation)
   - See pricing: https://openai.com/pricing

### Option 2: Azure OpenAI

1. **Setup Azure OpenAI Resource**
   - Create resource in Azure Portal
   - Deploy a model (GPT-4 or GPT-3.5-turbo)
   - Get endpoint URL and API key

2. **Configure in Application**
   - API URL: `https://your-resource.openai.azure.com`
   - API Key: Your Azure API key
   - Model: Your deployment name

### Option 3: Local AI Server (LM Studio)

**For users who want to run AI locally without cloud APIs:**

1. **Install LM Studio** or similar OpenAI-compatible server
   - Download from: https://lmstudio.ai
   - Or use alternatives: Ollama, LocalAI, etc.

2. **Start Server** with model loaded
   - Model example: `openai/gpt-oss-20b`
   - Ensure server runs on accessible port (e.g., `1234`)

3. **Configure CORS** - Ensure server allows browser requests:
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type, Authorization
   ```

4. **Configure in Application**
   - API URL: `http://localhost:1234` or `http://10.237.207.139:1234`
   - API Key: Your server's API key (or `sk-local` if none required)
   - Model: `openai/gpt-oss-20b` or your model ID

**Local Server Benefits:**
- ✅ No API costs
- ✅ Full data privacy
- ✅ Works offline
- ⚠️ Requires powerful hardware (8GB+ RAM, GPU recommended)
- ⚠️ Slower generation (5-30 seconds depending on hardware)

### Using the Feature

1. Navigate to `/cover-letter/edit`
2. Enter password (if protected)
3. Click "Generate with AI"
4. First time:
   - Enter API URL:
     - OpenAI: `https://api.openai.com`
     - Local: `http://localhost:1234`
     - Custom: Your endpoint
   - Enter API Key (required)
   - Check "Remember credentials" to save API credentials for next time
   - Paste job description (automatically saved)
5. Click "Generate Cover Letter"
6. Next time: Job description is pre-filled, just update if needed!

## Data Persistence

### How It Works

- **Credentials**: Stored in browser's `localStorage` (opt-in via checkbox)
- **Job Description**: Always saved automatically for convenience
- **Storage key**: `ai_cover_letter_credentials`
- **Format**: JSON string with `{ apiUrl, apiKey, rememberCredentials, lastJobDescription }`

### What Gets Saved

**Always Saved:**
- ✅ Last job description (auto-saved every time you generate)
- Purpose: Avoid re-pasting the same job description

**Conditionally Saved (opt-in):**
- 🔐 API URL (only if "Remember credentials" is checked)
- 🔐 API Key (only if "Remember credentials" is checked)

### Security Considerations

- ✅ **Client-side only** - API credentials never sent to portfolio website servers
- ✅ **Local storage** - Stays in user's browser only
- ✅ **User consent** - Opt-in via checkbox
- ⚠️ **Plain text** - Stored unencrypted (browser localStorage limitation)
- 🔒 **Recommendation** - Only use on personal/trusted devices
- 🔐 **OpenAI API Keys** - Treat like passwords, never share publicly
- ⚠️ **API Costs** - Monitor your OpenAI usage dashboard to avoid unexpected charges

### Clearing Data

**Credentials** are cleared when:
- User unchecks "Remember credentials" and generates new letter
- User clears browser data/localStorage

**Job Description** persists until:
- User manually clears browser data/localStorage
- User generates with an empty job description

**Note**: Even with "Remember credentials" unchecked, job description remains saved for your convenience.

## Error Handling

### Common Errors & Solutions

1. **"Unable to connect to AI server"**
   - **Cause**: Server unreachable or URL incorrect
   - **Solution**: Check API URL, ensure server is running, verify CORS settings

2. **"Authentication failed"**
   - **Cause**: Invalid API key
   - **Solution**: Verify API key is correct, check server authentication requirements

3. **"Request timed out"**
   - **Cause**: Server overloaded or slow model
   - **Solution**: Wait and retry, consider using faster model

4. **"AI generated an empty response"**
   - **Cause**: Model failed to generate content or job description unclear
   - **Solution**: Rephrase job description, add more details

5. **"Rate limit exceeded"**
   - **Cause**: Too many requests to API
   - **Solution**: Wait a few minutes before retrying

## Keyboard Shortcuts

- **Open Modal**: Click button or Tab to button + Enter
- **Generate**: `Ctrl/Cmd + Enter` in Job Description textarea
- **Close Modal**: `Escape` key
- **Toggle Password**: Tab to eye icon + Enter

## Architecture

### File Structure

```
src/
├── components/
│   ├── ui/
│   │   └── Modal.tsx                          # Reusable modal component
│   └── cover-letter/
│       └── forms/
│           ├── CoverLetterContent.tsx         # Main component with AI button
│           └── AIGenerateModal.tsx            # AI generation modal
├── lib/
│   ├── services/
│   │   └── openai.ts                          # OpenAI API client service
│   └── prompts/
│       └── coverLetter.ts                     # Prompt engineering logic
└── types/
    └── openai.ts                              # TypeScript types
```

### Components

**Modal.tsx**
- Reusable modal wrapper
- Framer Motion animations
- Keyboard & accessibility support
- Backdrop click-to-close

**AIGenerateModal.tsx**
- Form for API credentials & job description
- State management for loading/errors
- Credential persistence
- API call orchestration

**CoverLetterContent.tsx**
- Main cover letter editor
- "Generate with AI" button
- Modal integration
- Content insertion

### Services

**openai.ts**
- API client for OpenAI-compatible endpoints
- Request/response handling
- Timeout management (30 seconds)
- Error wrapping (OpenAIAPIError)
- Credential storage (localStorage)

**coverLetter.ts**
- Prompt builder (resume + job → prompt)
- Content validator (length, placeholders)
- Post-processor (formatting, cleanup)

## Testing

Comprehensive test coverage:

- ✅ **Modal**: 12 tests (accessibility, keyboard, animations)
- ✅ **OpenAI Service**: 14 tests (API calls, errors, storage)
- ✅ **Prompt Engineering**: 23 tests (prompt building, validation)

Run tests:
```bash
npm test -- Modal.test
npm test -- openai.test
npm test -- coverLetter.test
```

## Performance

- **API Call**: 3-10 seconds (depends on model speed)
- **Timeout**: 30 seconds (configurable)
- **Bundle Size**: ~15KB (gzipped, including dependencies)
- **No Server Load**: All processing client-side

## Future Enhancements

Potential improvements:

1. **Multiple Model Support**: Allow switching between models
2. **Tone Selection**: Professional, casual, enthusiastic presets
3. **Length Control**: Short (200 words) vs Long (400 words)
4. **Streaming Responses**: Show generation in real-time
5. **History**: Save previously generated letters
6. **Templates**: Pre-built cover letter structures
7. **A/B Testing**: Generate multiple variations

## Troubleshooting

### CORS Issues

If you see CORS errors:

1. Configure your local server to allow browser requests
2. For LM Studio:
   - Settings → Server → Enable CORS
   - Or use a CORS proxy

### Slow Generation

If generation takes too long:

1. Check model size (smaller = faster)
2. Reduce `max_tokens` in request (src/lib/services/openai.ts)
3. Use quantized models (Q4, Q5)

### API Compatibility

If API doesn't work:

1. Verify endpoint follows OpenAI format
2. Check model identifier matches your server
3. Test API with curl first:
   ```bash
   curl http://10.237.207.139:1234/v1/chat/completions \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_KEY" \
     -d '{
       "model": "openai/gpt-oss-20b",
       "messages": [{"role": "user", "content": "Hello"}]
     }'
   ```

## Support

For issues or questions:

1. Check console for errors (F12 → Console)
2. Verify API server is running
3. Test API endpoint independently
4. Review CORS configuration
5. Open issue on GitHub

## Credits

- **OpenAI API Format**: Industry standard for LLM APIs
- **Framer Motion**: Modal animations
- **Lucide React**: Icons
- **Sonner**: Toast notifications
