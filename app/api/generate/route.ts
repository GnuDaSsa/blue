import { NextRequest, NextResponse } from 'next/server';
import { generateStoryboard } from '@/utils/llmService';
import { sessionStore } from '@/utils/sessionStore';

export async function POST(request: NextRequest) {
  try {
    const { lyrics, sceneCount = 20 } = await request.json();

    if (!lyrics || typeof lyrics !== 'string') {
      return NextResponse.json(
        { error: 'Invalid lyrics provided' },
        { status: 400 }
      );
    }

    // Validate scene count
    const validSceneCounts = [8, 12, 20, 25, 32];
    if (!validSceneCounts.includes(sceneCount)) {
      return NextResponse.json(
        { error: 'Invalid scene count. Must be 8, 12, 20, 25, or 32' },
        { status: 400 }
      );
    }

    // Step 1: Generate storyboard using LLM
    console.log(`Generating storyboard with LLM... (${sceneCount} scenes)`);
    const storyboard = await generateStoryboard(lyrics, sceneCount);

    // Create session ID and store data
    const sessionId = Date.now().toString();
    sessionStore.set(sessionId, {
      storyboard,
      timestamp: Date.now(),
    });

    console.log('Created session:', sessionId);
    console.log('Stored storyboard with', storyboard.scene_prompts.length, 'scenes');
    console.log('Session verification:', sessionStore.has(sessionId));

    // Return storyboard for review (protagonist generation will be separate)
    return NextResponse.json({
      sessionId,
      storyboard,
    });

  } catch (error) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate storyboard',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
