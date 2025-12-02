'use client';

import { useState } from 'react';
import Image from 'next/image';
import JSZip from 'jszip';
import type { SceneImage } from '@/types';

interface ImageGalleryProps {
  images: string[];
  sceneImagesWithPrompts?: SceneImage[];
  onReset: () => void;
}

export default function ImageGallery({ images, sceneImagesWithPrompts, onReset }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadZip = async () => {
    setIsDownloading(true);
    
    try {
      const zip = new JSZip();
      const folder = zip.folder('music-video-scenes');
      
      if (!folder) {
        throw new Error('Failed to create ZIP folder');
      }

      // Download each image and add to ZIP
      for (let i = 0; i < images.length; i++) {
        const imageUrl = images[i];
        
        try {
          // Check if it's a base64 data URL
          if (imageUrl.startsWith('data:')) {
            // Extract base64 data
            const base64Data = imageUrl.split(',')[1];
            const extension = imageUrl.match(/image\/(jpeg|jpg|png|gif)/)?.[1] || 'jpg';
            folder.file(`scene_${String(i + 1).padStart(3, '0')}.${extension}`, base64Data, { base64: true });
          } else {
            // Fetch external URL
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            folder.file(`scene_${String(i + 1).padStart(3, '0')}.jpg`, blob);
          }
        } catch (error) {
          console.error(`Failed to add image ${i + 1} to ZIP:`, error);
        }
      }

      // Add prompts as a text file if available
      if (sceneImagesWithPrompts && sceneImagesWithPrompts.length > 0) {
        let promptsText = 'AI 뮤직비디오 생성 프롬프트\n';
        promptsText += '='.repeat(50) + '\n\n';
        
        sceneImagesWithPrompts.forEach((scene, index) => {
          promptsText += `Scene ${scene.scene_number}:\n`;
          promptsText += `설명: ${scene.description}\n`;
          promptsText += `프롬프트: ${scene.prompt}\n`;
          promptsText += '-'.repeat(50) + '\n\n';
        });
        
        folder.file('prompts.txt', promptsText);
      }

      // Generate ZIP file
      const zipBlob = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });

      // Download ZIP file
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `music-video-${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      
    } catch (error) {
      console.error('Error creating ZIP file:', error);
      alert('ZIP 파일 생성 중 오류가 발생했습니다.');
    } finally {
      setIsDownloading(false);
    }
  };

  const currentSceneData = hoveredIndex !== null && sceneImagesWithPrompts 
    ? sceneImagesWithPrompts[hoveredIndex] 
    : null;

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
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer image-card ring-2 ring-purple-500/30 hover:ring-purple-500 group"
            >
              <Image
                src={imageUrl}
                alt={`Scene ${index + 1}`}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-1 text-sm">
                Scene {index + 1}
              </div>
              
              {/* Hover overlay for prompt preview */}
              {hoveredIndex === index && currentSceneData && (
                <div className="absolute inset-0 bg-black/90 p-3 flex flex-col justify-center text-white text-xs overflow-hidden animate-fadeIn">
                  <p className="font-bold mb-1 text-purple-300">Scene {currentSceneData.scene_number}</p>
                  <p className="line-clamp-6 text-gray-300">
                    {currentSceneData.description}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">클릭하면 전체 프롬프트 확인</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={onReset}
            className="btn-primary px-12 py-3 rounded-lg font-semibold text-white"
          >
            🎵 새로운 뮤직비디오 생성
          </button>
          <button
            onClick={handleDownloadZip}
            disabled={isDownloading}
            className="px-8 py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? '⏳ 생성 중...' : '📥 모든 이미지 다운로드 (ZIP)'}
          </button>
        </div>
      </div>

      {/* Modal for full-size image with prompt details */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 cursor-pointer"
        >
          <div className="relative max-w-7xl w-full h-[90vh] flex flex-col md:flex-row gap-4">
            {/* Image */}
            <div className="relative flex-1 min-h-0">
              <Image
                src={selectedImage}
                alt="Full size preview"
                fill
                className="object-contain"
              />
            </div>
            
            {/* Prompt details sidebar */}
            {sceneImagesWithPrompts && (
              <div className="w-full md:w-96 bg-gray-900/95 rounded-lg p-6 overflow-y-auto max-h-[90vh]">
                <h3 className="text-xl font-bold text-purple-400 mb-4">
                  🎬 Scene {images.indexOf(selectedImage) + 1} 상세 정보
                </h3>
                
                {sceneImagesWithPrompts[images.indexOf(selectedImage)] && (
                  <>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">📝 한글 설명</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {sceneImagesWithPrompts[images.indexOf(selectedImage)].description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">🎨 영문 프롬프트</h4>
                      <p className="text-gray-400 text-xs leading-relaxed font-mono bg-black/50 p-3 rounded">
                        {sceneImagesWithPrompts[images.indexOf(selectedImage)].prompt}
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
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
