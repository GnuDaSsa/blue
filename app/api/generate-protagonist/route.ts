import { NextRequest, NextResponse } from 'next/server';
import { generateProtagonistImages } from '@/utils/imageService';
import { sessionStore } from '@/utils/sessionStore';

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve storyboard from session
    if (!sessionStore.has(sessionId)) {
      return NextResponse.json(
        { error: 'Session not found or expired' },
        { status: 404 }
      );
    }

    const sessionData = sessionStore.get(sessionId);
    const storyboard = sessionData?.storyboard;

    if (!storyboard || !storyboard.protagonist_prompt) {
      return NextResponse.json(
        { error: 'Invalid session data' },
        { status: 400 }
      );
    }

    // Generate 4 protagonist candidate images
    console.log('Generating protagonist images...');
    console.log('Protagonist prompt:', storyboard.protagonist_prompt);
    
    const protagonistImageUrls = await generateProtagonistImages(
      storyboard.protagonist_prompt
    );

    // Return protagonist images to frontend
    const protagonistImages = protagonistImageUrls.map((url, index) => ({
      id: `protagonist-${index}`,
      url,
    }));

    return NextResponse.json({
      protagonistImages,
    });

  } catch (error) {
    console.error('Error in generate-protagonist API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate protagonist images',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
