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

  const handleGenerateStart = async (lyrics: string) => {
    setGenerationState({
      status: 'generating_story',
      message: 'AI가 가사를 분석하고 스토리보드를 생성하고 있습니다...',
    });

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lyrics }),
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

  const handleStoryboardConfirm = async () => {
    setGenerationState(prev => ({
      ...prev,
      status: 'generating_story',
      message: '주인공 후보 4개를 생성하고 있습니다... (약 10초 소요)',
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

  const handleProtagonistSelect = async (selectedImage: ProtagonistImage) => {
    setGenerationState({
      status: 'generating_scenes',
      message: '30컷의 뮤직비디오 이미지를 생성하고 있습니다... (약 5-10분 소요)',
      progress: 0,
    });

    try {
      const response = await fetch('/api/generate-final', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          protagonistImageUrl: selectedImage.url,
          sessionId: sessionId
        }),
      });

      if (!response.ok) {
        throw new Error('이미지 생성에 실패했습니다.');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6));
              
              if (data.progress !== undefined) {
                setGenerationState(prev => ({
                  ...prev,
                  progress: data.progress,
                  message: `이미지 생성 중... (${data.progress}/30)`,
                }));
              }

              if (data.completed && data.sceneImages) {
                setGenerationState({
                  status: 'completed',
                  message: '뮤직비디오 생성이 완료되었습니다!',
                  sceneImages: data.sceneImages,
                });
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
          />
        )}

        {generationState.status === 'storyboard_review' && generationState.storyboard && (
          <StoryboardReview
            storyboard={generationState.storyboard}
            onConfirm={handleStoryboardConfirm}
            onBack={handleReset}
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
          <ImageGallery images={generationState.sceneImages} onReset={handleReset} />
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
