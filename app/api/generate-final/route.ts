import { NextRequest } from 'next/server';
import { generateSceneImages } from '@/utils/imageService';
import { sessionStore } from '@/utils/sessionStore';

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();

  // Create a readable stream for SSE (Server-Sent Events)
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const { protagonistImageUrl, noProtagonist, sessionId, aspectRatio = '16:9' } = await request.json();

        // Retrieve storyboard from session (if sessionId provided)
        let scenePrompts;
        if (sessionId && sessionStore.has(sessionId)) {
          const sessionData = sessionStore.get(sessionId);
          scenePrompts = sessionData.storyboard.scene_prompts;
        } else {
          // Fallback: use a default or return error
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: 'Session expired or not found' })}\n\n`)
          );
          controller.close();
          return;
        }

        console.log(`Starting scene generation with protagonist image... (${scenePrompts.length} scenes)`);

        // Generate all scene images with progress updates
        const sceneImages: string[] = [];
        const totalScenes = scenePrompts.length;

        for (let i = 0; i < totalScenes; i++) {
          try {
            console.log(`Generating scene ${i + 1}/${totalScenes}...`);
            
            // Import generateImage directly to have more control
            const { generateImage } = await import('@/utils/imageService');
            
            const imageUrl = await generateImage({
              prompt: scenePrompts[i].prompt,
              referenceImageUrl: noProtagonist ? undefined : protagonistImageUrl,
              useCharacterConsistency: !noProtagonist,
              aspectRatio: aspectRatio as '16:9' | '9:16',
            });

            sceneImages.push(imageUrl);

            // Send progress update with image and prompt to client (with error handling)
            try {
              const progressData = {
                progress: i + 1,
                total: totalScenes,
                imageUrl: imageUrl, // Send the newly generated image
                sceneNumber: i + 1,
                sceneData: {
                  url: imageUrl,
                  prompt: scenePrompts[i].prompt,
                  description: scenePrompts[i].description,
                  scene_number: scenePrompts[i].scene_number,
                },
              };
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(progressData)}\n\n`)
              );
            } catch (enqueueError) {
              console.warn(`Client disconnected at scene ${i + 1}, continuing generation...`);
              // Continue generating even if client disconnected
            }

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));

          } catch (error) {
            console.error(`Error generating scene ${i + 1}:`, error);
            try {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ 
                  error: `Failed at scene ${i + 1}`,
                  details: error instanceof Error ? error.message : 'Unknown error'
                })}\n\n`)
              );
            } catch (enqueueError) {
              console.warn('Client already disconnected, cannot send error');
            }
            controller.close();
            return;
          }
        }

        // Send completion message (with error handling)
        try {
          const completionData = {
            completed: true,
            sceneImages,
          };
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(completionData)}\n\n`)
          );
          console.log('All scenes generated successfully!');
        } catch (enqueueError) {
          console.warn('Client disconnected before completion message, but all images were generated');
        }
        
        controller.close();

      } catch (error) {
        console.error('Error in generate-final API:', error);
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ 
            error: 'Failed to generate scenes',
            details: error instanceof Error ? error.message : 'Unknown error'
          })}\n\n`)
        );
        controller.close();
      }
    },
  });

  // Return response with SSE headers
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
