'use client';

import { useState } from 'react';
import LyricsInput from '@/components/LyricsInput';
import StoryboardReview from '@/components/StoryboardReview';
import ProtagonistSelector from '@/components/ProtagonistSelector';
import ImageGallery from '@/components/ImageGallery';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { GenerationState, ProtagonistImage } from '@/types';

export default function Home() {
  const [generationState, setGenerationState] = useState<GenerationState>({
    status: 'idle',
    message: '',
  });
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<string>('');
  const [sceneCount, setSceneCount] = useState(20);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');

  const handleGenerateStart = async (inputLyrics: string, selectedSceneCount: number, selectedAspectRatio: '16:9' | '9:16') => {
    setLyrics(inputLyrics);
    setSceneCount(selectedSceneCount);
    setAspectRatio(selectedAspectRatio);
    setGenerationState({
      status: 'generating_story',
      message: 'AI가 가사를 분석하고 스토리보드를 생성하고 있습니다...',
    });

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lyrics: inputLyrics, sceneCount: selectedSceneCount }),
      });

      if (!response.ok) {
        throw new Error('스토리 생성에 실패했습니다.');
      }

      const data = await response.json();

      setSessionId(data.sessionId);
      
      // Show storyboard review first
      setGenerationState({
        status: 'storyboard_review',
        message: '스토리보드를 검토해주세요',
        storyboard: data.storyboard,
      });
    } catch (error) {
      setGenerationState({
        status: 'error',
        message: '오류가 발생했습니다. 다시 시도해주세요.',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      });
    }
  };

  const handleStoryboardRegenerate = async () => {
    if (!lyrics) return;
    
    setGenerationState(prev => ({
      ...prev,
      status: 'generating_story',
      message: 'AI가 스토리보드를 다시 생성하고 있습니다...',
    }));

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lyrics, sceneCount }),
      });

      if (!response.ok) {
        throw new Error('스토리 재생성에 실패했습니다.');
      }

      const data = await response.json();

      setSessionId(data.sessionId);
      setGenerationState({
        status: 'storyboard_review',
        message: '스토리보드를 검토해주세요',
        storyboard: data.storyboard,
      });
    } catch (error) {
      setGenerationState({
        status: 'error',
        message: '오류가 발생했습니다. 다시 시도해주세요.',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      });
    }
  };

  const handleStoryboardConfirm = async (editedStoryboard?: LLMResponse) => {
    // If storyboard was edited, update session with new data
    if (editedStoryboard && sessionId) {
      try {
        await fetch('/api/update-storyboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, storyboard: editedStoryboard }),
        });
      } catch (error) {
        console.warn('Failed to update storyboard in session:', error);
      }
    }

    setGenerationState(prev => ({
      ...prev,
      status: 'generating_story',
      message: '주인공 후보 4개를 생성하고 있습니다... (약 10초 소요)',
      storyboard: editedStoryboard || prev.storyboard,
    }));

    try {
      const response = await fetch('/api/generate-protagonist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        throw new Error('주인공 생성에 실패했습니다.');
      }

      const data = await response.json();

      setGenerationState(prev => ({
        ...prev,
        status: 'protagonist_selection',
        message: '주인공 이미지를 선택해주세요',
        protagonistImages: data.protagonistImages,
      }));
    } catch (error) {
      setGenerationState({
        status: 'error',
        message: '오류가 발생했습니다. 다시 시도해주세요.',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      });
    }
  };

  const handleCancelGeneration = () => {
    setGenerationState(prev => ({
      ...prev,
      cancelGeneration: true,
    }));
  };

  const handleProtagonistSelect = async (selectedImage: ProtagonistImage | null) => {
    const noProtagonist = selectedImage === null;
    
    setGenerationState({
      status: 'generating_scenes',
      message: noProtagonist 
        ? `${sceneCount}컷의 뮤직비디오 이미지를 생성하고 있습니다... (씬마다 다른 캐릭터)`
        : `${sceneCount}컷의 뮤직비디오 이미지를 생성하고 있습니다...`,
      progress: 0,
      totalScenes: sceneCount,
      sceneImages: [],
      cancelGeneration: false,
    });

    try {
      const response = await fetch('/api/generate-final', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          protagonistImageUrl: selectedImage?.url || null,
          noProtagonist: noProtagonist,
          sessionId: sessionId,
          aspectRatio: aspectRatio
        }),
      });

      if (!response.ok) {
        throw new Error('이미지 생성에 실패했습니다.');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = ''; // Buffer for incomplete SSE messages

      if (reader) {
        while (true) {
          // Check if user cancelled
          if (generationState.cancelGeneration) {
            reader.cancel();
            setGenerationState(prev => ({
              status: 'completed',
              message: '생성이 취소되었습니다',
              sceneImages: prev.sceneImages || [],
              sceneImagesWithPrompts: prev.sceneImagesWithPrompts || [],
            }));
            return;
          }

          const { done, value } = await reader.read();
          if (done) break;

          // Append new chunk to buffer
          buffer += decoder.decode(value, { stream: true });
          
          // Split by double newlines (SSE message delimiter)
          const messages = buffer.split('\n\n');
          
          // Keep the last incomplete message in buffer
          buffer = messages.pop() || '';

          for (const message of messages) {
            const lines = message.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const jsonStr = line.slice(6).trim();
                  if (!jsonStr) continue; // Skip empty data
                  
                  const data = JSON.parse(jsonStr);
                  
                  // Handle error from server
                  if (data.error) {
                    console.error('Server error:', data.error, data.details);
                    setGenerationState({
                      status: 'error',
                      message: data.error,
                      error: data.details || '서버에서 오류가 발생했습니다.',
                    });
                    return;
                  }
                  
                  // Handle progress update
                  if (data.progress !== undefined) {
                    setGenerationState(prev => {
                      const newSceneImages = [...(prev.sceneImages || [])];
                      const newSceneImagesWithPrompts = [...(prev.sceneImagesWithPrompts || [])];
                      
                      // Add newly generated image if available
                      if (data.imageUrl) {
                        newSceneImages.push(data.imageUrl);
                      }
                      
                      // Add scene data with prompt if available
                      if (data.sceneData) {
                        newSceneImagesWithPrompts.push(data.sceneData);
                      }
                      
                      return {
                        ...prev,
                        progress: data.progress,
                        totalScenes: data.total || prev.totalScenes,
                        message: `이미지 생성 중... (${data.progress}/${data.total || sceneCount})`,
                        sceneImages: newSceneImages,
                        sceneImagesWithPrompts: newSceneImagesWithPrompts,
                      };
                    });
                  }

                  // Handle completion
                  if (data.completed && data.sceneImages) {
                    setGenerationState(prev => ({
                      status: 'completed',
                      message: '뮤직비디오 생성이 완료되었습니다!',
                      sceneImages: data.sceneImages,
                      sceneImagesWithPrompts: prev.sceneImagesWithPrompts,
                    }));
                  }
                } catch (parseError) {
                  console.warn('JSON parse error (will retry with next chunk):', parseError);
                  console.warn('Problematic line:', line);
                  // Don't throw - just log and continue, the buffer will accumulate
                  // This allows the SSE connection to stay open
                }
              }
            }
          }
        }
      }
    } catch (error) {
      setGenerationState({
        status: 'error',
        message: '오류가 발생했습니다. 다시 시도해주세요.',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      });
    }
  };

  const handleReset = () => {
    setSessionId(null);
    setGenerationState({
      status: 'idle',
      message: '',
    });
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 neon-text">
          AI 뮤직비디오 생성기
        </h1>
        <p className="text-center text-gray-400 mb-12 text-lg">
          가사를 입력하면 AI가 시네마틱한 뮤직비디오를 만들어드립니다
        </p>

        {generationState.status === 'idle' && (
          <LyricsInput onGenerate={handleGenerateStart} />
        )}

        {(generationState.status === 'generating_story' || 
          generationState.status === 'generating_scenes') && (
          <LoadingSpinner 
            message={generationState.message} 
            progress={generationState.progress}
            totalScenes={generationState.totalScenes}
            sceneImages={generationState.sceneImages}
            onCancel={handleCancelGeneration}
            showCancel={generationState.status === 'generating_scenes'}
          />
        )}

        {generationState.status === 'storyboard_review' && generationState.storyboard && (
          <StoryboardReview
            storyboard={generationState.storyboard}
            onConfirm={handleStoryboardConfirm}
            onBack={handleReset}
            onRegenerate={handleStoryboardRegenerate}
          />
        )}

        {generationState.status === 'protagonist_selection' && 
         generationState.protagonistImages && (
          <ProtagonistSelector
            images={generationState.protagonistImages}
            onSelect={handleProtagonistSelect}
            onBack={handleReset}
          />
        )}

        {generationState.status === 'completed' && generationState.sceneImages && (
          <ImageGallery 
            images={generationState.sceneImages} 
            sceneImagesWithPrompts={generationState.sceneImagesWithPrompts}
            onReset={handleReset} 
          />
        )}

        {generationState.status === 'error' && (
          <div className="glass-morphism rounded-2xl p-8 text-center">
            <div className="text-red-500 text-2xl mb-4">⚠️ 오류 발생</div>
            <p className="text-gray-300 mb-4">{generationState.message}</p>
            {generationState.error && (
              <p className="text-sm text-gray-500 mb-6">{generationState.error}</p>
            )}
            <button
              onClick={handleReset}
              className="btn-primary px-8 py-3 rounded-lg font-semibold text-white"
            >
              처음으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
