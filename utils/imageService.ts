// Gemini Image Generation API (Latest Gemini Image Model)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// Using Gemini 2.5 Flash Image (latest stable model for image generation)
// Alternative: 'gemini-2.5-pro-image' for even better quality (if available)
const GEMINI_IMAGE_MODEL = 'gemini-2.5-flash-image';
const GEMINI_IMAGE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_IMAGE_MODEL}:generateContent`;

interface ImageGenerationOptions {
  prompt: string;
  referenceImageUrl?: string;
  useCharacterConsistency?: boolean;
  aspectRatio?: '16:9' | '9:16' | '1:1';
}

export async function generateImage(options: ImageGenerationOptions): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const { prompt, referenceImageUrl, useCharacterConsistency, aspectRatio = '1:1' } = options;

  // Build request body for Gemini image generation
  const parts: any[] = [{ text: prompt }];

  // If reference image is provided, include it for character consistency
  if (referenceImageUrl && useCharacterConsistency) {
    try {
      // Fetch the reference image and convert to base64
      const imageResponse = await fetch(referenceImageUrl);
      const imageBuffer = await imageResponse.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString('base64');
      
      parts.unshift({
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image
        }
      });
      
      // Add instruction for character consistency
      parts[1].text = `Using the character shown in the reference image, generate: ${prompt}. Maintain the exact same character appearance, facial features, and style.`;
    } catch (error) {
      console.warn('Failed to load reference image, generating without it:', error);
    }
  }

  // Map aspect ratio to Gemini's format
  const aspectRatioConfig: { [key: string]: string } = {
    '16:9': '16:9',
    '9:16': '9:16',
    '1:1': '1:1'
  };

  const requestBody = {
    contents: [{
      parts: parts
    }],
    generationConfig: {
      temperature: 0.8,
      topK: 40,
      topP: 0.95,
      responseModalities: ['image'],
      outputOptions: {
        aspectRatio: aspectRatioConfig[aspectRatio]
      }
    }
  };

  try {
    const response = await fetch(`${GEMINI_IMAGE_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini Image API error response:', errorText);
      throw new Error(`Gemini Image API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract image from response
    // Gemini returns image as base64 in inlineData
    if (data.candidates && data.candidates[0]) {
      const candidate = data.candidates[0];
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData && part.inlineData.data) {
            // Convert base64 to data URL
            const mimeType = part.inlineData.mimeType || 'image/jpeg';
            return `data:${mimeType};base64,${part.inlineData.data}`;
          }
        }
      }
    }
    
    throw new Error('Unable to extract image from Gemini response');
  } catch (error) {
    console.error('Error calling Gemini Image API:', error);
    throw error;
  }
}

export async function generateProtagonistImages(
  protagonistPrompt: string, 
  protagonistVariations?: string[]
): Promise<string[]> {
  const images: string[] = [];
  
  // Use provided variations if available, otherwise create default variations
  const prompts = protagonistVariations && protagonistVariations.length === 4
    ? protagonistVariations
    : [
        `${protagonistPrompt}. Confident/Cool mood: strong presence, charismatic expression, sharp gaze`,
        `${protagonistPrompt}. Gentle/Soft mood: warm expression, approachable demeanor, soft features`,
        `${protagonistPrompt}. Mysterious/Enigmatic mood: intriguing aura, enigmatic expression, captivating presence`,
        `${protagonistPrompt}. Dynamic/Energetic mood: vibrant personality, lively expression, energetic pose`
      ];
  
  const qualityEnhancement = 'high-quality modern anime style, detailed shading and highlights, clean linework, professional anime series quality (Netflix anime, Crunchyroll original quality), NOT chibi style, NOT textbook illustration, vibrant sophisticated colors, charismatic character energy';
  
  for (let i = 0; i < 4; i++) {
    try {
      // Use each specific variation prompt
      const variedPrompt = `${prompts[i]}. ${qualityEnhancement}. Pure white background (#FFFFFF).`;
      
      console.log(`Generating protagonist candidate ${i + 1}/4 with mood variation ${i + 1}`);
      
      const imageUrl = await generateImage({
        prompt: variedPrompt,
        useCharacterConsistency: false,
        aspectRatio: '1:1', // Protagonist images are always square
      });
      images.push(imageUrl);
      
      console.log(`Generated protagonist candidate ${i + 1}/4`);
      
      // Add delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error generating protagonist image ${i + 1}:`, error);
      throw error;
    }
  }

  return images;
}

export async function generateSceneImages(
  scenePrompts: { prompt: string }[],
  protagonistImageUrl: string,
  onProgress?: (progress: number) => void
): Promise<string[]> {
  const sceneImages: string[] = [];
  
  const qualityEnhancement = 'high-quality anime scene, modern animation style (Netflix anime quality), realistic character proportions, sharp facial features, dynamic composition, dramatic lighting with strong contrast, detailed environment, vibrant sophisticated colors, cinematic framing, professional anime film/series quality, detailed shading and depth, NOT textbook style';

  for (let i = 0; i < scenePrompts.length; i++) {
    try {
      console.log(`Generating scene ${i + 1}/${scenePrompts.length}...`);
      
      // Enhance scene prompt with quality keywords
      const enhancedPrompt = `${scenePrompts[i].prompt}. ${qualityEnhancement}. CRITICAL: Maintain exact character appearance from reference image - same face, same features, same style. Character should look identical to reference.`;
      
      const imageUrl = await generateImage({
        prompt: enhancedPrompt,
        referenceImageUrl: protagonistImageUrl,
        useCharacterConsistency: true,
        aspectRatio: '16:9', // Default aspect ratio, will be overridden in API call
      });
      
      sceneImages.push(imageUrl);
      
      // Report progress
      if (onProgress) {
        onProgress(i + 1);
      }

      // Add delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error generating scene ${i + 1}:`, error);
      // Continue with next scene instead of failing completely
      sceneImages.push(''); // Placeholder for failed image
    }
  }

  return sceneImages;
}
