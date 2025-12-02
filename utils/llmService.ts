import type { LLMResponse } from '@/types';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function generateStoryboard(lyrics: string, sceneCount: number = 30): Promise<LLMResponse> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const prompt = `
You are a professional music video director and storyboard artist. Analyze the following song lyrics and create a detailed storyboard for a cinematic music video with ${sceneCount} scenes.

LYRICS:
${lyrics}

CRITICAL REQUIREMENTS FOR PROTAGONIST:
1. Style: Professional 2D illustration (anime/webtoon/character design quality) - NO CARTOON style
2. Background: Pure white background (#FFFFFF)
3. Details: Include specific details about:
   - Facial features (eye color, shape, expression)
   - Hair style, color, and texture
   - Clothing style, colors, patterns, accessories
   - Body type, posture, and pose
   - Age and personality traits
   - Unique identifying features
4. Quality: High-resolution, clean lines, professional character sheet quality
5. Format: Full body or upper body portrait, front-facing or 3/4 view

Please return a JSON object with the following structure:
{
  "protagonist_prompt": "EXTREMELY DETAILED character prompt. Must include: specific facial features (eye shape, eye color, nose, mouth), detailed hair description (style, length, color, texture), complete clothing description (type, color, patterns, accessories, shoes), body type, age range, personality visible in pose/expression, artistic style (professional 2D illustration, anime style, clean lines), pure white background. Make this as detailed as possible for consistent character generation.",
  "scene_prompts": [
    {
      "scene_number": 1,
      "timestamp": "0:00-0:08",
      "description": "Scene description matching the lyrics",
      "camera_angle": "Camera angle (wide shot, close-up, etc.)",
      "lighting": "Lighting description (dramatic, soft, neon, etc.)",
      "prompt": "DETAILED scene description including: protagonist's specific action and emotion, detailed environment description (location, background elements, atmospheric details), mood and feeling, specific camera angle and framing, lighting direction and quality (golden hour, dramatic shadows, neon glow, etc.), color palette, cinematic composition, visual style (cinematic photography, movie scene quality), ultra detailed, high quality, professional composition."
    },
    ... (30 scenes total)
  ]
}

IMPORTANT INSTRUCTIONS:
- Protagonist prompt MUST be EXTREMELY DETAILED (minimum 100 words) with specific physical features
- Include unique identifying features that make the character memorable and consistent
- NEVER use cartoon style - use anime, webtoon, or realistic illustration style only
- Create exactly ${sceneCount} scenes distributed evenly across the song duration
- Each scene prompt should be highly detailed (minimum 50 words per scene)
- Scene prompts should include:
  * Protagonist's exact pose, action, facial expression
  * Detailed environment description
  * Specific lighting setup (direction, color temperature, intensity)
  * Camera angle and shot type (extreme close-up, close-up, medium, wide, extreme wide, aerial)
  * Color palette and mood
  * Cinematic references or visual style
- Make scenes emotionally resonant with the lyrics
- Vary locations, times of day, weather, and atmosphere across scenes
- Return ONLY valid JSON, no markdown formatting, no code blocks
- Ensure all JSON strings are properly escaped and use double quotes

Generate a highly detailed, professional storyboard now:`;

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
          temperature: 0.5,
          topK: 20,
          topP: 0.9,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              protagonist_prompt: {
                type: "string"
              },
              scene_prompts: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    scene_number: { type: "integer" },
                    timestamp: { type: "string" },
                    description: { type: "string" },
                    camera_angle: { type: "string" },
                    lighting: { type: "string" },
                    prompt: { type: "string" }
                  },
                  required: ["scene_number", "timestamp", "description", "camera_angle", "lighting", "prompt"]
                }
              }
            },
            required: ["protagonist_prompt", "scene_prompts"]
          }
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

    if (parsedResponse.scene_prompts.length !== sceneCount) {
      console.warn(`Expected ${sceneCount} scenes, got ${parsedResponse.scene_prompts.length}`);
      // Allow slight variations in scene count
    }

    return parsedResponse;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
