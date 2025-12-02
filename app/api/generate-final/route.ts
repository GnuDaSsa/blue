import { NextRequest } from 'next/server';
import { generateSceneImages } from '@/utils/imageService';
import { sessionStore } from '@/utils/sessionStore';

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder();

  // Create a readable stream for SSE (Server-Sent Events)
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const { protagonistImageUrl, sessionId } = await request.json();

        if (!protagonistImageUrl) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: 'No protagonist image provided' })}\n\n`)
          );
          controller.close();
          return;
        }

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

        console.log('Starting scene generation with protagonist image...');

        // Generate all 30 scene images with progress updates
        const sceneImages: string[] = [];

        for (let i = 0; i < scenePrompts.length; i++) {
          try {
            console.log(`Generating scene ${i + 1}/30...`);
            
            // Import generateImage directly to have more control
            const { generateImage } = await import('@/utils/imageService');
            
            const imageUrl = await generateImage({
              prompt: scenePrompts[i].prompt,
              referenceImageUrl: protagonistImageUrl,
              useCharacterConsistency: true,
            });

            sceneImages.push(imageUrl);

            // Send progress update to client
            const progressData = {
              progress: i + 1,
              total: 30,
            };
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(progressData)}\n\n`)
            );

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));

          } catch (error) {
            console.error(`Error generating scene ${i + 1}:`, error);
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ 
                error: `Failed at scene ${i + 1}`,
                details: error instanceof Error ? error.message : 'Unknown error'
              })}\n\n`)
            );
            controller.close();
            return;
          }
        }

        // Send completion message
        const completionData = {
          completed: true,
          sceneImages,
        };
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(completionData)}\n\n`)
        );

        console.log('All scenes generated successfully!');
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
