'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProtagonistImage } from '@/types';

interface ProtagonistSelectorProps {
  images: ProtagonistImage[];
  onSelect: (image: ProtagonistImage | null) => void; // null = no protagonist
  onBack: () => void;
}

export default function ProtagonistSelector({ images, onSelect, onBack }: ProtagonistSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ id: string; url: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSelect = (image: ProtagonistImage) => {
    setSelectedId(image.id);
  };

  const handleConfirm = () => {
    if (selectedId === 'no-protagonist') {
      // No protagonist selected - AI will generate varied characters per scene
      onSelect(null);
      return;
    }
    
    let selected;
    if (uploadedImage && selectedId === uploadedImage.id) {
      selected = uploadedImage;
    } else {
      selected = images.find(img => img.id === selectedId);
    }
    if (selected) {
      onSelect(selected);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    setIsUploading(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        const uploadedImg = {
          id: 'uploaded-custom',
          url: base64,
        };
        setUploadedImage(uploadedImg);
        setSelectedId(uploadedImg.id);
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert('이미지 업로드에 실패했습니다.');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Image upload error:', error);
      alert('이미지 업로드에 실패했습니다.');
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="glass-morphism rounded-2xl p-8 md:p-12 shadow-2xl">
        <h2 className="text-4xl font-bold mb-4 text-center neon-text">
          주인공 선택
        </h2>
        <p className="text-center text-gray-400 mb-4">
          뮤직비디오의 주인공이 될 이미지를 선택해주세요
        </p>
        <p className="text-center text-purple-400 mb-2 text-sm">
          💡 마음에 드는 이미지가 없다면 직접 업로드하세요!
        </p>
        <p className="text-center text-pink-400 mb-10 text-sm">
          ✨ 또는 '주인공 없음'을 선택하면 씬마다 다양한 캐릭터가 자동 생성됩니다
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-10">
          {/* No Protagonist Option */}
          <div
            onClick={() => setSelectedId('no-protagonist')}
            className={`
              relative aspect-square rounded-xl overflow-hidden cursor-pointer
              transition-all duration-300 bg-gradient-to-br from-pink-900/30 to-purple-900/30
              ${selectedId === 'no-protagonist'
                ? 'ring-4 ring-pink-500 scale-105' 
                : 'ring-2 ring-gray-700 hover:ring-pink-400'
              }
            `}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <svg className="w-16 h-16 text-pink-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-pink-400 font-bold text-center text-sm">
                주인공 없음
              </p>
              <p className="text-gray-400 text-xs text-center mt-2">
                씬마다 다른 캐릭터
              </p>
            </div>
            {selectedId === 'no-protagonist' && (
              <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                <div className="bg-pink-600 rounded-full p-3">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Upload Custom Image Card */}
          <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-dashed border-purple-500/50 hover:border-purple-400 transition-all cursor-pointer bg-black/20">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              disabled={isUploading}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              {isUploading ? (
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
              ) : uploadedImage ? (
                <>
                  <Image
                    src={uploadedImage.url}
                    alt="Uploaded protagonist"
                    fill
                    className="object-cover"
                  />
                  {selectedId === uploadedImage.id && (
                    <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                      <div className="bg-purple-600 rounded-full p-3">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <svg className="w-16 h-16 text-purple-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-purple-400 font-semibold text-center">
                    이미지 업로드
                  </p>
                  <p className="text-gray-500 text-xs text-center mt-2">
                    클릭하여 선택
                  </p>
                </>
              )}
            </div>
          </div>

          {/* AI Generated Images */}
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
