'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  onReset: () => void;
}

export default function ImageGallery({ images, onReset }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="glass-morphism rounded-2xl p-8 md:p-12 shadow-2xl">
        <h2 className="text-4xl font-bold mb-4 text-center neon-text">
          🎬 뮤직비디오 완성!
        </h2>
        <p className="text-center text-gray-400 mb-10">
          총 {images.length}개의 씬이 생성되었습니다
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(imageUrl)}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer image-card ring-2 ring-purple-500/30 hover:ring-purple-500"
            >
              <Image
                src={imageUrl}
                alt={`Scene ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-1 text-sm">
                Scene {index + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onReset}
            className="btn-primary px-12 py-3 rounded-lg font-semibold text-white"
          >
            새로운 뮤직비디오 생성
          </button>
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = images[0];
              link.download = 'music-video-scenes.zip';
              link.click();
            }}
            className="px-8 py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-all"
          >
            📥 다운로드
          </button>
        </div>
      </div>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 cursor-pointer"
        >
          <div className="relative max-w-5xl w-full h-[80vh]">
            <Image
              src={selectedImage}
              alt="Full size preview"
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white bg-purple-600 hover:bg-purple-700 rounded-full p-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
