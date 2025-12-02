'use client';

import { useState } from 'react';
import type { LLMResponse } from '@/types';

interface StoryboardReviewProps {
  storyboard: LLMResponse;
  onConfirm: () => void;
  onBack: () => void;
}

export default function StoryboardReview({ storyboard, onConfirm, onBack }: StoryboardReviewProps) {
  const [showAllScenes, setShowAllScenes] = useState(false);
  const displayScenes = showAllScenes ? storyboard.scene_prompts : storyboard.scene_prompts.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="glass-morphism rounded-2xl p-8 md:p-12 shadow-2xl">
        <h2 className="text-4xl font-bold mb-4 text-center neon-text">
          📋 스토리보드 검토
        </h2>
        <p className="text-center text-gray-400 mb-8">
          AI가 생성한 스토리보드를 확인하고 진행하세요
        </p>

        {/* Protagonist Description */}
        <div className="mb-8 p-6 bg-black/30 rounded-xl border border-purple-500/30">
          <h3 className="text-2xl font-bold mb-3 text-purple-400">👤 주인공 설정</h3>
          <p className="text-gray-300 leading-relaxed">{storyboard.protagonist_prompt}</p>
        </div>

        {/* Scene Summary */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4 text-purple-400">
            🎬 씬 구성 ({storyboard.scene_prompts.length}개 씬)
          </h3>
          
          <div className="space-y-4">
            {displayScenes.map((scene) => (
              <div 
                key={scene.scene_number}
                className="p-4 bg-black/20 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                    <span className="text-2xl font-bold text-purple-400">
                      {scene.scene_number}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-purple-400 font-semibold">
                        {scene.timestamp}
                      </span>
                      <span className="text-xs text-gray-500">|</span>
                      <span className="text-sm text-blue-400">
                        📷 {scene.camera_angle}
                      </span>
                      <span className="text-xs text-gray-500">|</span>
                      <span className="text-sm text-yellow-400">
                        💡 {scene.lighting}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-2 font-medium">
                      {scene.description}
                    </p>
                    
                    <details className="mt-2">
                      <summary className="text-sm text-gray-500 cursor-pointer hover:text-purple-400 transition-colors">
                        상세 프롬프트 보기
                      </summary>
                      <p className="text-xs text-gray-400 mt-2 pl-4 border-l-2 border-purple-500/30">
                        {scene.prompt}
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!showAllScenes && storyboard.scene_prompts.length > 5 && (
            <button
              onClick={() => setShowAllScenes(true)}
              className="mt-4 w-full py-3 rounded-lg bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 transition-all text-purple-400 font-semibold"
            >
              모든 씬 보기 ({storyboard.scene_prompts.length - 5}개 더)
            </button>
          )}

          {showAllScenes && (
            <button
              onClick={() => setShowAllScenes(false)}
              className="mt-4 w-full py-3 rounded-lg bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 transition-all text-purple-400 font-semibold"
            >
              접기
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={onBack}
            className="px-8 py-3 rounded-lg font-semibold text-white bg-gray-700 hover:bg-gray-600 transition-all"
          >
            ← 다시 작성
          </button>
          <button
            onClick={onConfirm}
            className="btn-primary px-12 py-3 rounded-lg font-semibold text-white"
          >
            주인공 생성 시작 →
          </button>
        </div>

        <p className="text-center text-gray-500 mt-6 text-sm">
          * 확인 후 4개의 주인공 후보가 생성됩니다 (약 10초 소요)
        </p>
      </div>
    </div>
  );
}
