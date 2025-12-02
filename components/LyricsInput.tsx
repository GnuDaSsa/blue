'use client';

import { useState } from 'react';

interface LyricsInputProps {
  onGenerate: (lyrics: string) => void;
}

export default function LyricsInput({ onGenerate }: LyricsInputProps) {
  const [lyrics, setLyrics] = useState('');

  const handleSubmit = () => {
    if (lyrics.trim()) {
      onGenerate(lyrics);
    }
  };

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
          className="w-full h-96 bg-black/30 border border-purple-500/30 rounded-xl p-6 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 resize-none text-lg"
        />

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
