'use client';

import Image from 'next/image';

interface LoadingSpinnerProps {
  message: string;
  progress?: number;
  totalScenes?: number;
  sceneImages?: string[];
  onCancel?: () => void;
  showCancel?: boolean;
}

export default function LoadingSpinner({ message, progress, totalScenes, sceneImages, onCancel, showCancel }: LoadingSpinnerProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-morphism rounded-2xl p-12 shadow-2xl text-center">
        {/* Animated spinner */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4 neon-text">
          {message}
        </h3>

        {progress !== undefined && totalScenes && (
          <div className="mt-6">
            <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${(progress / totalScenes) * 100}%` }}
              ></div>
            </div>
            <p className="text-gray-400 mt-2">
              {progress} / {totalScenes} 씬 완료
            </p>
          </div>
        )}

        {/* Display generated images in real-time */}
        {sceneImages && sceneImages.length > 0 && (
          <div className="mt-8">
            <p className="text-center text-purple-400 mb-4 font-semibold">
              생성된 이미지 미리보기
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-4 bg-black/20 rounded-xl">
              {sceneImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden ring-2 ring-purple-500/30 hover:ring-purple-500 transition-all animate-fadeIn"
                >
                  <Image
                    src={imageUrl}
                    alt={`Scene ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-center py-1 text-xs">
                    Scene {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        <p className="text-gray-500 mt-6 text-sm">
          잠시만 기다려주세요... ☕
        </p>

        {/* Cancel Button */}
        {showCancel && onCancel && progress !== undefined && totalScenes && progress < totalScenes && (
          <div className="mt-6">
            <button
              onClick={onCancel}
              className="px-8 py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-all"
            >
              ❌ 생성 취소
            </button>
            <p className="text-gray-500 text-xs mt-2">
              * 이미 생성된 이미지는 유지됩니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
