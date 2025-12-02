'use client';

import { useState } from 'react';
import type { LLMResponse } from '@/types';

interface StoryboardReviewProps {
  storyboard: LLMResponse;
  onConfirm: (editedStoryboard?: LLMResponse) => void;
  onBack: () => void;
  onRegenerate?: () => void;
}

export default function StoryboardReview({ storyboard, onConfirm, onBack, onRegenerate }: StoryboardReviewProps) {
  const [showAllScenes, setShowAllScenes] = useState(false);
  const [editingScene, setEditingScene] = useState<number | null>(null);
  const [editedStoryboard, setEditedStoryboard] = useState<LLMResponse>(storyboard);
  const displayScenes = showAllScenes ? editedStoryboard.scene_prompts : editedStoryboard.scene_prompts.slice(0, 5);

  const handleSceneEdit = (sceneNumber: number, field: keyof typeof editedStoryboard.scene_prompts[0], value: string) => {
    setEditedStoryboard(prev => ({
      ...prev,
      scene_prompts: prev.scene_prompts.map(scene =>
        scene.scene_number === sceneNumber
          ? { ...scene, [field]: value }
          : scene
      )
    }));
  };

  const handleConfirmWithEdits = () => {
    // Pass edited storyboard if there were changes
    const hasChanges = JSON.stringify(editedStoryboard) !== JSON.stringify(storyboard);
    onConfirm(hasChanges ? editedStoryboard : undefined);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="glass-morphism rounded-2xl p-8 md:p-12 shadow-2xl">
        <h2 className="text-4xl font-bold mb-4 text-center neon-text">
          📋 스토리보드 검토
        </h2>
        <p className="text-center text-gray-400 mb-8">
          AI가 생성한 스토리보드를 확인하고 진행하세요
        </p>

        {/* Mood Analysis */}
        {storyboard.mood_analysis && (
          <div className="mb-6 p-5 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-400/40">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🎭</span>
              <h3 className="text-xl font-bold text-purple-300">노래 무드 분석</h3>
            </div>
            <p className="text-gray-200 leading-relaxed text-lg">{storyboard.mood_analysis}</p>
          </div>
        )}

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
                    {editingScene === scene.scene_number ? (
                      // Edit mode
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-400 block mb-1">설명 (Description)</label>
                          <textarea
                            value={scene.description}
                            onChange={(e) => handleSceneEdit(scene.scene_number, 'description', e.target.value)}
                            className="w-full p-2 bg-black/50 border border-purple-500/30 rounded text-gray-300 text-sm"
                            rows={2}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-gray-400 block mb-1">카메라 앵글</label>
                            <input
                              type="text"
                              value={scene.camera_angle}
                              onChange={(e) => handleSceneEdit(scene.scene_number, 'camera_angle', e.target.value)}
                              className="w-full p-2 bg-black/50 border border-purple-500/30 rounded text-gray-300 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-400 block mb-1">조명</label>
                            <input
                              type="text"
                              value={scene.lighting}
                              onChange={(e) => handleSceneEdit(scene.scene_number, 'lighting', e.target.value)}
                              className="w-full p-2 bg-black/50 border border-purple-500/30 rounded text-gray-300 text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 block mb-1">프롬프트 (Prompt)</label>
                          <textarea
                            value={scene.prompt}
                            onChange={(e) => handleSceneEdit(scene.scene_number, 'prompt', e.target.value)}
                            className="w-full p-2 bg-black/50 border border-purple-500/30 rounded text-gray-300 text-xs font-mono"
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingScene(null)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-semibold transition-all"
                          >
                            ✓ 저장
                          </button>
                          <button
                            onClick={() => {
                              setEditedStoryboard(storyboard);
                              setEditingScene(null);
                            }}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm transition-all"
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View mode
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
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
                          <button
                            onClick={() => setEditingScene(scene.scene_number)}
                            className="px-3 py-1 text-xs bg-purple-600/30 hover:bg-purple-600/50 rounded border border-purple-500/30 transition-all"
                          >
                            ✏️ 수정
                          </button>
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
                      </>
                    )}
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
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <button
            onClick={onBack}
            className="px-8 py-3 rounded-lg font-semibold text-white bg-gray-700 hover:bg-gray-600 transition-all"
          >
            ← 처음으로
          </button>
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="px-8 py-3 rounded-lg font-semibold text-white bg-orange-600 hover:bg-orange-700 transition-all"
            >
              🔄 스토리보드 다시 생성
            </button>
          )}
          <button
            onClick={handleConfirmWithEdits}
            className="btn-primary px-12 py-3 rounded-lg font-semibold text-white"
          >
            주인공 생성 시작 →
          </button>
        </div>

        <p className="text-center text-gray-500 mt-6 text-sm">
          * 씬을 직접 수정하거나 다시 생성할 수 있습니다
        </p>
        <p className="text-center text-gray-500 mt-2 text-sm">
          * 확인 후 4개의 주인공 후보가 생성됩니다 (약 10초 소요)
        </p>
      </div>
    </div>
  );
}
