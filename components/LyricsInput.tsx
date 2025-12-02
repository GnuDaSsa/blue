'use client';

import { useState } from 'react';

interface LyricsInputProps {
  onGenerate: (lyrics: string, sceneCount: number, aspectRatio: '16:9' | '9:16') => void;
}

export default function LyricsInput({ onGenerate }: LyricsInputProps) {
  const [lyrics, setLyrics] = useState('');
  const [sceneCount, setSceneCount] = useState(20);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');

  const handleSubmit = () => {
    if (lyrics.trim()) {
      onGenerate(lyrics, sceneCount, aspectRatio);
    }
  };

  const sceneCounts = [8, 12, 20, 25, 32];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-morphism rounded-2xl p-8 md:p-12 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Suno 가사 붙여넣기
        </h2>
        
        <textarea
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="여기에 가사를 입력하세요...&#10;&#10;예시:&#10;[Verse 1]&#10;Walking down the empty street&#10;Memories flowing at my feet..."
          className="w-full h-80 bg-black/30 border border-purple-500/30 rounded-xl p-6 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 resize-none text-lg"
        />

        {/* Aspect Ratio Selection */}
        <div className="mt-6">
          <label className="block text-center text-gray-400 mb-3 font-semibold">
            📐 이미지 비율 선택
          </label>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setAspectRatio('16:9')}
              className={`px-8 py-4 rounded-lg font-bold transition-all ${
                aspectRatio === '16:9'
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400 scale-105'
                  : 'bg-black/30 text-gray-400 border border-blue-500/30 hover:border-blue-500 hover:text-blue-400'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-9 border-2 border-current rounded mb-2"></div>
                <span>16:9 가로</span>
                <span className="text-xs opacity-70">1920x1080</span>
              </div>
            </button>
            <button
              onClick={() => setAspectRatio('9:16')}
              className={`px-8 py-4 rounded-lg font-bold transition-all ${
                aspectRatio === '9:16'
                  ? 'bg-pink-600 text-white ring-2 ring-pink-400 scale-105'
                  : 'bg-black/30 text-gray-400 border border-pink-500/30 hover:border-pink-500 hover:text-pink-400'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-9 h-16 border-2 border-current rounded mb-2"></div>
                <span>9:16 세로</span>
                <span className="text-xs opacity-70">1080x1920</span>
              </div>
            </button>
          </div>
        </div>

        {/* Scene Count Selection */}
        <div className="mt-6">
          <label className="block text-center text-gray-400 mb-3 font-semibold">
            🎬 생성할 씬 개수 선택
          </label>
          <div className="flex justify-center gap-3 flex-wrap">
            {sceneCounts.map((count) => (
              <button
                key={count}
                onClick={() => setSceneCount(count)}
                className={`px-6 py-3 rounded-lg font-bold transition-all ${
                  sceneCount === count
                    ? 'bg-purple-600 text-white ring-2 ring-purple-400 scale-105'
                    : 'bg-black/30 text-gray-400 border border-purple-500/30 hover:border-purple-500 hover:text-purple-400'
                }`}
              >
                {count}개
              </button>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-2">
            * 씬이 많을수록 생성 시간이 길어집니다 (약 {Math.ceil(sceneCount * 2 / 60)}분 소요)
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!lyrics.trim()}
            className="btn-primary px-12 py-4 rounded-xl font-bold text-xl text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            🎬 뮤직비디오 생성 시작
          </button>
        </div>

        <p className="text-center text-gray-500 mt-6 text-sm">
          * 생성 시간은 약 5-10분 소요됩니다
        </p>
      </div>
    </div>
  );
}
