import { NextRequest, NextResponse } from 'next/server';
import { sessionStore } from '@/utils/sessionStore';
import type { LLMResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, storyboard }: { sessionId: string; storyboard: LLMResponse } = await request.json();

    if (!sessionId || !storyboard) {
      return NextResponse.json(
        { error: 'Missing sessionId or storyboard' },
        { status: 400 }
      );
    }

    // Check if session exists
    if (!sessionStore.has(sessionId)) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Update session with edited storyboard
    const existingSession = sessionStore.get(sessionId);
    sessionStore.set(sessionId, {
      ...existingSession,
      storyboard: storyboard,
    });

    console.log(`[UPDATE] Updated storyboard for session ${sessionId}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating storyboard:', error);
    return NextResponse.json(
      { error: 'Failed to update storyboard' },
      { status: 500 }
    );
  }
}
