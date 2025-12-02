// Gemini Image Generation API (Nano Banana Pro = Gemini 2.5 Flash Image)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_IMAGE_MODEL = 'gemini-2.5-flash-image';
const GEMINI_IMAGE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_IMAGE_MODEL}:generateContent`;

interface ImageGenerationOptions {
  prompt: string;
  referenceImageUrl?: string;
  useCharacterConsistency?: boolean;
}

export async function generateImage(options: ImageGenerationOptions): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const { prompt, referenceImageUrl, useCharacterConsistency } = options;

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

  const requestBody = {
    contents: [{
      parts: parts
    }],
    generationConfig: {
      temperature: 0.8,
      topK: 40,
      topP: 0.95,
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

export async function generateProtagonistImages(protagonistPrompt: string): Promise<string[]> {
  const images: string[] = [];
  
  // Generate 4 protagonist candidate images with slight variations
  const variations = [
    'front view, centered composition, standing straight, neutral expression, professional character sheet style',
    '3/4 angle view, slight smile, confident posture, detailed facial features',
    'side profile view, clean silhouette, distinctive features visible, character design reference',
    'dynamic pose, expressive face, personality showing, detailed clothing and accessories'
  ];
  
  const qualityEnhancement = 'masterpiece, best quality, ultra detailed, sharp focus, clean lines, professional 2D illustration, anime art style, character concept art, vibrant colors, high resolution, detailed shading, perfect anatomy';
  
  for (let i = 0; i < 4; i++) {
    try {
      // Add variation to each generation while maintaining core character
      const variedPrompt = `${protagonistPrompt}. ${variations[i]}. ${qualityEnhancement}. Pure white background.`;
      
      console.log(`Generating protagonist candidate ${i + 1}/4 with detailed prompt`);
      
      const imageUrl = await generateImage({
        prompt: variedPrompt,
        useCharacterConsistency: false,
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
  
  const qualityEnhancement = 'cinematic composition, movie scene quality, dramatic lighting, ultra detailed, high resolution, professional photography, vibrant colors, depth of field, atmospheric, 4K quality';

  for (let i = 0; i < scenePrompts.length; i++) {
    try {
      console.log(`Generating scene ${i + 1}/${scenePrompts.length}...`);
      
      // Enhance scene prompt with quality keywords
      const enhancedPrompt = `${scenePrompts[i].prompt}. ${qualityEnhancement}. Maintain exact character appearance from reference.`;
      
      const imageUrl = await generateImage({
        prompt: enhancedPrompt,
        referenceImageUrl: protagonistImageUrl,
        useCharacterConsistency: true,
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
