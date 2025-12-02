'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProtagonistImage } from '@/types';

interface ProtagonistSelectorProps {
  images: ProtagonistImage[];
  onSelect: (image: ProtagonistImage) => void;
  onBack: () => void;
}

export default function ProtagonistSelector({ images, onSelect, onBack }: ProtagonistSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (image: ProtagonistImage) => {
    setSelectedId(image.id);
  };

  const handleConfirm = () => {
    const selected = images.find(img => img.id === selectedId);
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="glass-morphism rounded-2xl p-8 md:p-12 shadow-2xl">
        <h2 className="text-4xl font-bold mb-4 text-center neon-text">
          주인공 선택
        </h2>
        <p className="text-center text-gray-400 mb-10">
          뮤직비디오의 주인공이 될 이미지를 선택해주세요
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {images.map((image) => (
            <div
              key={image.id}
              onClick={() => handleSelect(image)}
              className={`
                relative aspect-square rounded-xl overflow-hidden cursor-pointer
                transition-all duration-300 image-card
                ${selectedId === image.id 
                  ? 'ring-4 ring-purple-500 scale-105' 
                  : 'ring-2 ring-gray-700 hover:ring-purple-400'
                }
              `}
            >
              <Image
                src={image.url}
                alt={`주인공 후보 ${image.id}`}
                fill
                className="object-cover"
              />
              {selectedId === image.id && (
                <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                  <div className="bg-purple-600 rounded-full p-3">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onBack}
            className="px-8 py-3 rounded-lg font-semibold text-white bg-gray-700 hover:bg-gray-600 transition-all"
          >
            ← 뒤로가기
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedId}
            className="btn-primary px-12 py-3 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            선택 완료 →
          </button>
        </div>
      </div>
    </div>
  );
}
