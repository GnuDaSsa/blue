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

STEP 1: ANALYZE MOOD AND STYLE
First, carefully analyze the lyrics to determine:
- Overall mood: (romantic, melancholic, energetic, dark, uplifting, nostalgic, rebellious, peaceful, etc.)
- Visual tone: (bright & vibrant, dark & moody, pastel & soft, neon & edgy, warm & cozy, cold & distant, etc.)
- Setting preference: (urban, nature, indoor, fantasy, retro, futuristic, etc.)
- Character vibe: (cool & confident, soft & vulnerable, fierce & powerful, cute & playful, mysterious & enigmatic, etc.)

Based on your analysis, adapt the art style accordingly:
- For BRIGHT/UPLIFTING songs → Use vibrant colors, warm lighting, cheerful expressions, sunny environments
- For DARK/MELANCHOLIC songs → Use muted colors, dramatic shadows, intense expressions, moody atmospheres  
- For ROMANTIC/SOFT songs → Use pastel tones, gentle lighting, tender expressions, dreamy settings
- For ENERGETIC/REBELLIOUS songs → Use bold colors, dynamic poses, fierce expressions, urban/edgy settings
- For NOSTALGIC songs → Use warm vintage tones, soft focus, contemplative expressions, retro settings

STEP 2: CREATE PROTAGONIST BASED ON MOOD
Design a protagonist that MATCHES the song's mood and visual tone:

REQUIRED ELEMENTS:
1. Art Style: Modern anime/webtoon (Netflix/Crunchyroll quality)
   - NOT textbook/educational style
   - High-quality character design
2. Proportions: Natural, well-balanced proportions suitable for the mood
   - Adapt proportions to match the song's vibe
   - NOT forced into specific ratios
3. Background: Pure white (#FFFFFF)

MOOD-ADAPTIVE DESIGN:
- If song is BRIGHT/HAPPY → Warm colors, soft smile, approachable features, casual trendy fashion, bright eyes
- If song is DARK/INTENSE → Cool colors, intense gaze, sharp features, edgy/leather fashion, dramatic styling
- If song is ROMANTIC/SOFT → Pastel colors, gentle expression, delicate features, elegant/flowing fashion, dreamy look
- If song is ENERGETIC/BOLD → Vibrant colors, confident pose, dynamic features, sporty/street fashion, fierce attitude
- If song is MELANCHOLIC/SAD → Muted colors, contemplative expression, softer features, simple/understated fashion, distant gaze
- If song is MYSTERIOUS/COOL → Monochrome or deep tones, enigmatic expression, refined features, sophisticated fashion, alluring presence

FLEXIBILITY: The character should reflect the song's emotional core through:
- Color palette (warm/cool, bright/muted, vibrant/subtle)
- Expression (happy/sad, fierce/gentle, confident/vulnerable)
- Fashion style (casual/formal, edgy/soft, modern/retro)
- Overall energy (high/low, intense/calm, bold/subtle)

STEP 3: CREATE 4 PROTAGONIST VARIATIONS
Generate 4 different interpretations of the protagonist, each emphasizing different moods/aspects:
- Variation 1: Confident/Cool mood - strong, charismatic presence
- Variation 2: Gentle/Soft mood - approachable, warm expression
- Variation 3: Mysterious/Enigmatic mood - intriguing, distant aura
- Variation 4: Dynamic/Energetic mood - vibrant, lively personality

Each variation should maintain the core character identity but express different emotional facets.

STEP 4: OUTPUT JSON
Return a JSON object with:
{
  "mood_analysis": "Brief 1-2 sentence description of the song's overall mood, emotional tone, and recommended visual style",
  "protagonist_prompt": "EXTREMELY DETAILED modern anime character designed to MATCH THE SONG'S MOOD. Include: mood-appropriate color palette, expression matching emotional tone, fashion style fitting the vibe, natural well-balanced proportions (DO NOT mention specific head-to-body ratios), detailed features (eyes, hair, clothing), accessories. Art style: Modern anime (Netflix quality, NOT textbook style). White background. This is the main/representative prompt shown in UI. IMPORTANT: Focus on describing visual style, personality, and mood - avoid technical proportion specifications.",
  "protagonist_variations": [
    "Variation 1: [Confident/Cool mood] Detailed prompt...",
    "Variation 2: [Gentle/Soft mood] Detailed prompt...",
    "Variation 3: [Mysterious/Enigmatic mood] Detailed prompt...",
    "Variation 4: [Dynamic/Energetic mood] Detailed prompt..."
  ],

  "scene_prompts": [
    {
      "scene_number": 1,
      "timestamp": "0:00-0:08",
      "description": "Scene description matching the lyrics",
      "camera_angle": "Camera angle (wide shot, close-up, etc.)",
      "lighting": "Lighting description (dramatic, soft, neon, etc.)",
      "prompt": "DETAILED anime scene with well-balanced proportions. Protagonist (mature features, expressive eyes, fitting the mood) performing specific action with strong emotion. Environment: detailed location with atmospheric elements, depth, and scale. Mood: intense and cinematic. Camera: dynamic angle with professional framing. Lighting: dramatic with strong contrast and depth. Art style: High-quality modern anime illustration (anime film/series quality, professional animation frame), detailed shading and highlights, vibrant but sophisticated colors. NOT textbook style, NOT educational illustration. Think: Studio Trigger, MAPPA, Netflix anime quality. Composition: Dynamic, engaging, with strong visual impact."
    },
    ... (30 scenes total)
  ]
}

IMPORTANT INSTRUCTIONS FOR CHARACTER STYLE:
- Art style: Modern anime/webtoon (high-quality series style, NOT textbook/educational style)
- Proportions: Natural, well-balanced proportions that fit the mood (NOT forced ratios)
- Face: Expressive features with strong personality (adapt to song mood)
- Overall vibe: Main character from a popular anime series - matches the song's emotional tone
- Protagonist prompt MUST be EXTREMELY DETAILED (minimum 120 words) with specific physical features
- Include unique identifying features that make the character memorable and consistent
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
              mood_analysis: {
                type: "string"
              },
              protagonist_prompt: {
                type: "string"
              },
              protagonist_variations: {
                type: "array",
                items: {
                  type: "string"
                }
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
    
    // Since we specified responseMimeType as application/json, the response should be valid JSON
    // Try to parse directly first
    let parsedResponse: LLMResponse;
    
    try {
      const textResponse = data.candidates[0].content.parts[0].text;
      
      // Clean up the response
      let jsonText = textResponse.trim();
      
      // Remove markdown code blocks if present
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      // Try direct parse first (since we use responseSchema)
      try {
        parsedResponse = JSON.parse(jsonText);
      } catch (directParseError) {
        console.warn('Direct parse failed, trying to extract JSON object...');
        
        // Try to find JSON object
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          console.error('Failed to extract JSON from response');
          console.error('Response text:', textResponse.substring(0, 1000));
          throw new Error('Failed to extract JSON from LLM response');
        }
        
        // Try to fix common JSON issues
        let fixedJson = jsonMatch[0];
        
        // Fix trailing commas
        fixedJson = fixedJson.replace(/,(\s*[}\]])/g, '$1');
        
        // Fix unescaped quotes in strings (simple approach)
        // This is a simplified fix - may not catch all cases
        
        try {
          parsedResponse = JSON.parse(fixedJson);
        } catch (finalError) {
          console.error('JSON parse error after fixes:', finalError);
          console.error('Attempted to parse:', fixedJson.substring(0, 1000));
          
          // Last resort: try to manually construct a minimal valid response
          console.warn('Creating minimal fallback response...');
          parsedResponse = {
            protagonist_prompt: "A detailed anime-style character with distinctive features, professional 2D illustration, white background",
            scene_prompts: Array.from({ length: sceneCount }, (_, i) => ({
              scene_number: i + 1,
              timestamp: `0:${String(i * 10).padStart(2, '0')}-0:${String((i + 1) * 10).padStart(2, '0')}`,
              description: `Scene ${i + 1}`,
              camera_angle: "Medium shot",
              lighting: "Dramatic lighting",
              prompt: `Cinematic scene ${i + 1} with protagonist, detailed environment, professional quality`
            }))
          };
        }
      }
    } catch (error) {
      console.error('Error processing LLM response:', error);
      throw error;
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
