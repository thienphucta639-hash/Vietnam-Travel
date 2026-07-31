import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    const phaseTimer = setInterval(() => {
      setPhase(p => (p + 1) % 3);
    }, 600);
    return () => { clearInterval(timer); clearInterval(phaseTimer); };
  }, [onComplete]);

  const texts = ['Đang tải dữ liệu...', 'Chuẩn bị bản đồ...', 'Sẵn sàng khám phá!'];

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center loading-screen transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
      {/* Centered content container */}
      <div className="flex flex-col items-center justify-center text-center">
        {/* Logo */}
        <div className="relative mb-8">
          <div className="text-6xl md:text-8xl font-bold text-white font-display tracking-tight flex items-center justify-center">
            <span className="inline-block animate-wave">V</span>
            <span className="inline-block animate-wave stagger-1">i</span>
            <span className="inline-block animate-wave stagger-2">ệ</span>
            <span className="inline-block animate-wave stagger-3">t</span>
            <span className="inline-block mx-2"></span>
            <span className="inline-block animate-wave stagger-4">N</span>
            <span className="inline-block animate-wave stagger-5">a</span>
            <span className="inline-block animate-wave stagger-6">m</span>
          </div>
          <div className="text-white/70 text-sm mt-3 text-center tracking-[0.3em] uppercase">Travel Planner v2.0</div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-white/20 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mb-3 justify-center">
          {[0, 1, 2].map(i => (
            <div key={i} className={`w-2 h-2 rounded-full loading-dot ${i === phase ? 'bg-yellow-400' : 'bg-white/30'}`} />
          ))}
        </div>

        {/* Status text */}
        <p className="text-white/80 text-sm font-body text-center">{texts[phase]}</p>

        {/* Decorative elements */}
        <div className="mt-8 flex items-center gap-3 text-white/40 text-xs">
          <span>Hà Nội</span>
          <span>•</span>
          <span>Đà Nẵng</span>
          <span>•</span>
          <span>Sài Gòn</span>
        </div>
      </div>
    </div>
  );
}
