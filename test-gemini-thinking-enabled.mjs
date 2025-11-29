#!/usr/bin/env node

/**
 * Test Gemini 2.5 Pro with thinking mode enabled (includeThoughts: true)
 */

const GEMINI_API_KEY = 'AIzaSyADCErIzzIqqQaI_s5b9kFucxY81lxiLoI'
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta'

console.log('='.repeat(70))
console.log('Testing Gemini 2.5 Pro with Thinking Mode Enabled')
console.log('='.repeat(70) + '\n')

const model = 'gemini-2.5-pro'

console.log(`🧪 Testing model: ${model}\n`)

try {
  const response = await fetch(
    `${GEMINI_BASE_URL}/models/${model}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: 'Write a 2-sentence professional summary for a senior software engineer with 8 years experience.' }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
          thinkingConfig: {
            includeThoughts: true,
          },
        },
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ FAIL:', response.status, response.statusText)
    console.error('Error:', errorText)
    process.exit(1)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let chunkCount = 0
  let thoughts = ''
  let content = ''

  console.log('📥 Streaming response:\n')

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed === 'data: [DONE]') continue

      if (trimmed.startsWith('data: ')) {
        const jsonStr = trimmed.slice(6)
        try {
          const chunk = JSON.parse(jsonStr)
          chunkCount++

          const parts = chunk.candidates?.[0]?.content?.parts || []

          for (const part of parts) {
            if (part.thought && part.text) {
              thoughts += part.text
              console.log('💭 THOUGHT:', part.text)
            } else if (part.text) {
              content += part.text
              console.log('💬 CONTENT:', part.text)
            }
          }

          const finishReason = chunk.candidates?.[0]?.finishReason
          if (finishReason) {
            console.log(`\n✓ Finish reason: ${finishReason}`)
          }

          const usage = chunk.usageMetadata
          if (usage) {
            console.log('\n📊 Usage:')
            console.log('  Total tokens:', usage.totalTokenCount)
            console.log('  Prompt tokens:', usage.promptTokenCount)
            console.log('  Response tokens:', usage.candidatesTokenCount)
            if (usage.thoughtsTokenCount !== undefined) {
              console.log('  Thoughts tokens:', usage.thoughtsTokenCount)
            }
          }
        } catch (e) {
          console.warn('⚠️  Failed to parse chunk')
        }
      }
    }
  }

  console.log('\n' + '='.repeat(70))
  console.log('✅ Streaming complete!')
  console.log('='.repeat(70))
  console.log('\n📝 FINAL CONTENT:')
  console.log(content)
  console.log('\n💭 THOUGHTS COLLECTED:')
  console.log(thoughts || '(No thoughts returned)')
  console.log('\n📈 Statistics:')
  console.log('  Chunks:', chunkCount)
  console.log('  Content length:', content.length, 'chars')
  console.log('  Thoughts length:', thoughts.length, 'chars')
} catch (error) {
  console.error('❌ FAIL:', error.message)
  process.exit(1)
}
