'use client';

interface LoadingSpinnerProps {
  message: string;
  progress?: number;
}

export default function LoadingSpinner({ message, progress }: LoadingSpinnerProps) {
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

        {progress !== undefined && (
          <div className="mt-6">
            <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${(progress / 30) * 100}%` }}
              ></div>
            </div>
            <p className="text-gray-400 mt-2">
              {progress} / 30 씬 완료
            </p>
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
      </div>
    </div>
  );
}
