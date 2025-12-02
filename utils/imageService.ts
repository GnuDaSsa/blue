// Nano Banana API Service
const NANOBANANA_API_KEY = process.env.NANOBANANA_API_KEY;
const NANOBANANA_API_URL = 'https://api.genspark.ai/v1/images/generations';

interface ImageGenerationOptions {
  prompt: string;
  referenceImageUrl?: string;
  useCharacterConsistency?: boolean;
}

export async function generateImage(options: ImageGenerationOptions): Promise<string> {
  if (!NANOBANANA_API_KEY) {
    throw new Error('NANOBANANA_API_KEY is not configured');
  }

  const { prompt, referenceImageUrl, useCharacterConsistency } = options;

  const requestBody: any = {
    model: 'nano-banana-pro',
    prompt: prompt,
    aspect_ratio: '16:9',
    image_size: '2k',
  };

  // If reference image is provided, use image-to-image generation
  if (referenceImageUrl && useCharacterConsistency) {
    requestBody.image_urls = [referenceImageUrl];
    requestBody.task_summary = 'Generate scene with character consistency';
  }

  try {
    const response = await fetch(NANOBANANA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NANOBANANA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Nano Banana API error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    // Extract image URL from response
    // Adjust this based on actual API response structure
    if (data.data && data.data[0] && data.data[0].url) {
      return data.data[0].url;
    } else if (data.url) {
      return data.url;
    } else if (data.image_url) {
      return data.image_url;
    } else {
      throw new Error('Unable to extract image URL from API response');
    }
  } catch (error) {
    console.error('Error calling Nano Banana API:', error);
    throw error;
  }
}

export async function generateProtagonistImages(protagonistPrompt: string): Promise<string[]> {
  const images: string[] = [];
  
  // Generate 4 protagonist candidate images
  for (let i = 0; i < 4; i++) {
    try {
      // Add slight variation to each generation
      const variedPrompt = `${protagonistPrompt}, variation ${i + 1}`;
      const imageUrl = await generateImage({
        prompt: variedPrompt,
        useCharacterConsistency: false,
      });
      images.push(imageUrl);
      
      // Add small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
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

  for (let i = 0; i < scenePrompts.length; i++) {
    try {
      const imageUrl = await generateImage({
        prompt: scenePrompts[i].prompt,
        referenceImageUrl: protagonistImageUrl,
        useCharacterConsistency: true,
      });
      
      sceneImages.push(imageUrl);
      
      // Report progress
      if (onProgress) {
        onProgress(i + 1);
      }

      // Add delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error generating scene ${i + 1}:`, error);
      throw error;
    }
  }

  return sceneImages;
}
