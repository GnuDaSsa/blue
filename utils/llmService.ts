import type { LLMResponse } from '@/types';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function generateStoryboard(lyrics: string): Promise<LLMResponse> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const prompt = `
You are a professional music video director and storyboard artist. Analyze the following song lyrics and create a detailed storyboard for a cinematic music video with 30 scenes.

LYRICS:
${lyrics}

CRITICAL REQUIREMENTS FOR PROTAGONIST:
1. Style: Must be 2D illustration style (anime/cartoon/artistic style)
2. Background: Must have clean white background (background: white)
3. Character design: Create a consistent, memorable protagonist design
4. Format: Full body or upper body portrait suitable for character reference

Please return a JSON object with the following structure:
{
  "protagonist_prompt": "A detailed prompt for generating the main character in 2D illustration style with white background. Include: character appearance, clothing, expression, pose. MUST include: '2D illustration style, white background, clean design'",
  "scene_prompts": [
    {
      "scene_number": 1,
      "timestamp": "0:00-0:08",
      "description": "Scene description matching the lyrics",
      "camera_angle": "Camera angle (wide shot, close-up, etc.)",
      "lighting": "Lighting description (dramatic, soft, neon, etc.)",
      "prompt": "Complete image generation prompt including: protagonist action, environment, mood, camera angle, lighting, cinematic quality. Make it cinematic and visually stunning."
    },
    ... (30 scenes total)
  ]
}

IMPORTANT:
- Create exactly 30 scenes distributed evenly across the song
- Each scene should be visually distinct and cinematic
- Protagonist prompt MUST specify: "2D illustration style, white background"
- Scene prompts should maintain character consistency but vary in action, location, and mood
- Include diverse camera angles (wide shot, close-up, medium shot, aerial view, etc.)
- Include varied lighting (dramatic, soft, neon, golden hour, etc.)
- Make scenes emotionally resonant with the lyrics
- Return ONLY valid JSON, no markdown formatting, no code blocks
- Ensure all JSON strings are properly escaped
- Use double quotes for all JSON strings

Return the JSON response now:`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from response (remove markdown code blocks if present)
    let jsonText = textResponse;
    
    // Remove markdown code blocks if present
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    // Try to find JSON object
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Failed to extract JSON from response:', textResponse);
      throw new Error('Failed to extract JSON from LLM response');
    }

    let parsedResponse: LLMResponse;
    try {
      parsedResponse = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Attempted to parse:', jsonMatch[0].substring(0, 500));
      throw new Error(`Failed to parse JSON: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
    }
    
    // Validate response structure
    if (!parsedResponse.protagonist_prompt || !Array.isArray(parsedResponse.scene_prompts)) {
      throw new Error('Invalid response structure from LLM');
    }

    if (parsedResponse.scene_prompts.length !== 30) {
      throw new Error(`Expected 30 scenes, got ${parsedResponse.scene_prompts.length}`);
    }

    return parsedResponse;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
