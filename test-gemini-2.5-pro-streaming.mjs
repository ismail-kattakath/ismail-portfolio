#!/usr/bin/env node

/**
 * Test Gemini 2.5 Pro streaming to understand thinking mode structure
 */

const GEMINI_API_KEY = 'AIzaSyADCErIzzIqqQaI_s5b9kFucxY81lxiLoI'
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta'

console.log('='.repeat(70))
console.log('Testing Gemini 2.5 Pro Streaming (Thinking Mode)')
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
            parts: [{ text: 'Write a short 2-sentence professional summary for a software engineer.' }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
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
  let fullContent = ''

  console.log('📥 Streaming chunks:\n')

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

          console.log(`\n--- Chunk ${chunkCount} ---`)
          console.log('Full chunk:', JSON.stringify(chunk, null, 2))

          const parts = chunk.candidates?.[0]?.content?.parts
          if (parts) {
            console.log('\nParts:')
            parts.forEach((part, idx) => {
              console.log(`  Part ${idx}:`)
              if (part.text !== undefined) {
                console.log(`    text: "${part.text}"`)
                fullContent += part.text
              }
              if (part.thought !== undefined) {
                console.log(`    thought: "${part.thought}"`)
              }
              if (part.executableCode !== undefined) {
                console.log(`    executableCode:`, part.executableCode)
              }
              if (part.codeExecutionResult !== undefined) {
                console.log(`    codeExecutionResult:`, part.codeExecutionResult)
              }
            })
          }

          const finishReason = chunk.candidates?.[0]?.finishReason
          if (finishReason) {
            console.log(`\nFinish reason: ${finishReason}`)
          }

          const usage = chunk.usageMetadata
          if (usage) {
            console.log('\nUsage metadata:')
            console.log('  promptTokenCount:', usage.promptTokenCount)
            console.log('  candidatesTokenCount:', usage.candidatesTokenCount)
            console.log('  totalTokenCount:', usage.totalTokenCount)
            if (usage.thoughtsTokenCount !== undefined) {
              console.log('  thoughtsTokenCount:', usage.thoughtsTokenCount)
            }
          }
        } catch (e) {
          console.warn('⚠️  Failed to parse chunk:', jsonStr.substring(0, 100))
        }
      }
    }
  }

  console.log('\n' + '='.repeat(70))
  console.log('✅ Streaming complete!')
  console.log('='.repeat(70))
  console.log('\nFull content extracted:')
  console.log(fullContent)
  console.log('\nTotal chunks received:', chunkCount)
  console.log('\nContent length:', fullContent.length, 'characters')
} catch (error) {
  console.error('❌ FAIL:', error.message)
  process.exit(1)
}
