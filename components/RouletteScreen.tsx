
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { KEYWORDS } from '../constants';
import { PredictionResult } from '../types';

interface RouletteScreenProps {
  result: PredictionResult;
  onComplete: () => void;
}

const ITEM_WIDTH = 220; 

const RouletteRow: React.FC<{ 
  direction: 'left' | 'right'; 
  targetWord: string;
  isSpinning: boolean;
}> = ({ direction, targetWord, isSpinning }) => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const spinWords = useMemo(() => {
    const base = [...KEYWORDS];
    // Tạo một dãy từ dài để quay
    const strip = Array(12).fill(null).flatMap(() => [...base].sort(() => 0.5 - Math.random()));
    // Xác định vị trí đích tùy theo hướng quay
    const targetPos = direction === 'right' ? strip.length - 15 : 15;
    // Chèn từ khóa mục tiêu vào vị trí chính xác
    strip[targetPos] = targetWord;
    return { strip, targetPos };
  }, [targetWord, direction]);

  useEffect(() => {
    const updatePosition = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const centerX = containerWidth / 2;
      
      // Vị trí bắt đầu
      const startX = direction === 'right' ? -((spinWords.strip.length - 8) * ITEM_WIDTH) : 0;
      
      if (isSpinning) {
        setOffset(startX);
        const timeout = setTimeout(() => {
          // Tính toán vị trí dừng sao cho targetPos nằm chính giữa màn hình
          const finalX = centerX - (spinWords.targetPos * ITEM_WIDTH) - (ITEM_WIDTH / 2);
          setOffset(finalX);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const finalX = centerX - (spinWords.targetPos * ITEM_WIDTH) - (ITEM_WIDTH / 2);
        setOffset(finalX);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isSpinning, spinWords, direction]);

  return (
    <div ref={containerRef} className="relative h-24 flex items-center overflow-hidden border-b border-white/[0.05] last:border-0 bg-white/5">
      <div 
        className="flex items-center will-change-transform"
        style={{ 
          transform: `translateX(${offset}px)`,
          transition: isSpinning ? 'transform 5.5s cubic-bezier(0.1, 0, 0, 1)' : 'none',
          width: `${spinWords.strip.length * ITEM_WIDTH}px`,
        }}
      >
        {spinWords.strip.map((word, i) => (
          <div 
            key={i} 
            className="flex-none flex items-center justify-center h-full"
            style={{ width: `${ITEM_WIDTH}px` }}
          >
            <div className={`
              px-6 py-2.5 rounded-2xl transition-all duration-700
              ${i === spinWords.targetPos && !isSpinning 
                ? 'bg-primary text-secondary scale-110 shadow-xl opacity-100' 
                : 'text-white/20 font-medium scale-90 opacity-40'}
            `}>
              <span className="font-extrabold text-2xl uppercase tracking-tighter whitespace-nowrap no-wrap">
                {word}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RouletteScreen: React.FC<RouletteScreenProps> = ({ result, onComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    setIsSpinning(true);
    const timer = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    const stopSpin = setTimeout(() => setIsSpinning(false), 5500);
    const end = setTimeout(onComplete, 7500);

    return () => {
      clearInterval(timer);
      clearTimeout(stopSpin);
      clearTimeout(end);
    };
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      <header className="px-8 pt-10 pb-6 z-10 animate-fade-up">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-[1.25rem] flex items-center justify-center text-2xl shadow-xl">🐎</div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary">Hành Trình 2026</span>
            <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Năm Bính Ngọ</span>
          </div>
        </div>
        <h2 className="text-4xl font-black text-white tracking-tight leading-snug">
          KHAI MỞ <br/> <span className="text-gold-gradient opacity-80">VẬN THẾ</span>
        </h2>
      </header>

      <div className="flex-1 flex flex-col justify-center px-4 relative z-10">
        <div className="relative max-w-sm mx-auto w-full">
          {/* Main Slots Frame */}
          <div className="glass-card rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative border-white/10">
            
            {/* Selection Indicators */}
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-primary/40 to-transparent z-30"></div>
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-transparent via-primary/40 to-transparent z-30"></div>
            
            <div className="absolute top-1/2 left-3 -translate-y-1/2 flex flex-col items-center gap-1 z-30 opacity-80">
               <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#D4AF37]"></div>
               <div className="w-0.5 h-14 bg-primary/50 rounded-full"></div>
               <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#D4AF37]"></div>
            </div>
            <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col items-center gap-1 z-30 opacity-80">
               <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#D4AF37]"></div>
               <div className="w-0.5 h-14 bg-primary/50 rounded-full"></div>
               <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#D4AF37]"></div>
            </div>

            {/* Slot Content */}
            <div className="relative">
              <RouletteRow direction="right" isSpinning={isSpinning} targetWord={result.word1} />
              <RouletteRow direction="left" isSpinning={isSpinning} targetWord={result.word2} />
              <RouletteRow direction="right" isSpinning={isSpinning} targetWord={result.word3} />
              
              {/* Edge Fading */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-secondary via-secondary/40 to-transparent z-20 pointer-events-none opacity-80"></div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-secondary via-secondary/40 to-transparent z-20 pointer-events-none opacity-80"></div>
            </div>
          </div>
        </div>
      </div>

      <footer className="p-10 pb-14 z-10 flex flex-col items-center">
        {isSpinning ? (
          <div className="flex flex-col items-center gap-5">
            <div className="flex gap-2.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: `${i * 0.12}s` }}></div>
              ))}
            </div>
            <div className="text-white/40 text-[10px] font-black tracking-[0.6em] uppercase">Đang phân tích {countdown}s</div>
          </div>
        ) : (
          <div className="animate-fade-up flex flex-col items-center gap-3">
             <span className="text-primary font-black text-sm tracking-widest uppercase">Hoàn tất phân tích</span>
          </div>
        )}
      </footer>
    </div>
  );
};

export default RouletteScreen;
