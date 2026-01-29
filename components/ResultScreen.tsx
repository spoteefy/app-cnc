
import React, { useRef, useState } from 'react';
import { PredictionResult } from '../types';
import { IMAGES } from '../constants';
import Footer from './Footer';
import { toPng } from 'https://esm.sh/html-to-image';

interface ResultScreenProps {
  result: PredictionResult;
  onReset: () => void;
}

const ResultCard: React.FC<{ label: string; word: string; delay: string }> = ({ label, word, delay }) => (
  <div 
    className="glass-card p-4 rounded-[1.5rem] flex flex-col items-center animate-fade-up opacity-0 border-white/10"
    style={{ animationDelay: delay, animationFillMode: 'forwards' }}
  >
    <span className="text-[9px] text-primary/70 font-bold uppercase tracking-[0.2em] mb-1">{label}</span>
    <h3 className="text-2xl font-black text-white tracking-tighter">{word}</h3>
  </div>
);

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onReset }) => {
  const captureRef = useRef<HTMLDivElement>(null);
  const wishRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const scrollToWish = () => {
    wishRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCapture = async () => {
    if (!captureRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      
      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
        backgroundColor: '#8B0000',
        pixelRatio: 2,
        skipFonts: false,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });

      const link = document.createElement('a');
      link.download = `Van-May-Binh-Ngo-2026-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Lỗi khi chụp ảnh màn hình:', err);
      window.print();
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-festive overflow-y-auto hide-scrollbar">
      <div ref={captureRef} className="relative flex flex-col w-full bg-festive">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] overflow-hidden z-0">
          <img 
            src={IMAGES.horseIcon} 
            className="w-[150%] max-w-none grayscale brightness-200 rotate-12"
            alt="Horse Background"
            crossOrigin="anonymous"
          />
        </div>

        <header className="flex justify-between items-center px-8 py-6 sticky top-0 z-50 animate-fade-up bg-festive/60 backdrop-blur-md">
          <button onClick={onReset} className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-white transition-transform active:scale-90 border-white/10">
            <span className="material-symbols-rounded text-xl">close</span>
          </button>
          <div className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
             <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">2026</span>
          </div>
        </header>

        <main className="px-8 pb-48 relative z-10 flex flex-col w-full">
          <div className="mb-10 text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-[10px] font-bold text-primary/80 uppercase tracking-[0.3em] mb-3">Kết quả phân tích</p>
            <h1 className="text-3xl font-black tracking-tight text-white leading-snug">
              TỪ KHÓA CỦA BẠN <br/> 
              <span className="text-gold-gradient">TRONG NĂM 2026 LÀ</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-6">
            <ResultCard label="TỪ KHÓA 1" word={result.word1} delay="0.4s" />
            <ResultCard label="TỪ KHÓA 2" word={result.word2} delay="0.5s" />
            <ResultCard label="TỪ KHÓA 3" word={result.word3} delay="0.6s" />
          </div>

          <button 
            onClick={scrollToWish}
            className="flex flex-col items-center gap-1.5 mb-8 animate-fade-up opacity-0 active:scale-95 transition-transform" 
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
          >
            <p className="text-[10px] font-bold text-primary/90 uppercase tracking-[0.2em] bg-primary/10 px-4 py-2 rounded-full border border-primary/20 backdrop-blur-sm">
              Xem lời chúc từ Trung tâm Công nghệ cao
            </p>
            <div className="animate-bounce">
              <span className="material-symbols-rounded text-primary text-3xl">keyboard_double_arrow_down</span>
            </div>
          </button>

          <div 
            ref={wishRef}
            className="glass-card p-8 rounded-[2.5rem] shadow-2xl animate-fade-up opacity-0 text-white scroll-mt-24 border-white/10" 
            style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">🧧</span>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>
            <div className="text-lg font-medium italic leading-relaxed text-white/90">
              {result.wish.split('\n').map((line, i) => (
                <p key={i} className={i === 0 ? "mb-2 text-primary font-black not-italic text-sm uppercase tracking-wide" : ""}>{line}</p>
              ))}
            </div>
          </div>

          <div className="mt-12 mb-8 flex flex-col items-center animate-fade-up opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
             <div className="text-5xl mb-3 animate-float">🐎</div>
             <p className="text-[9px] font-black tracking-[0.8em] uppercase text-primary/40">Mã Đáo Thành Công</p>
          </div>

          <Footer className="mt-4 border-t border-white/5 pt-8 animate-fade-up opacity-0" style={{ animationDelay: '1.4s', animationFillMode: 'forwards' } as any} />
        </main>
      </div>

      <footer className="fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#4A0000] via-[#4A0000]/95 to-transparent z-50">
        <div className="max-w-sm mx-auto">
          <button 
            onClick={handleCapture}
            disabled={isCapturing}
            className={`w-full h-14 ${isCapturing ? 'bg-amber-700 opacity-80' : 'bg-primary'} text-secondary font-black rounded-2xl flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all`}
          >
            {isCapturing ? (
              <>
                <div className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin"></div>
                ĐANG XỬ LÝ...
              </>
            ) : (
              <>
                <span className="material-symbols-rounded text-xl">screenshot_region</span>
                LƯU ẢNH KẾT QUẢ
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ResultScreen;
