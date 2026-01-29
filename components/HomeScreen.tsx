
import React from 'react';
import { IMAGES } from '../constants';
import Footer from './Footer';

interface HomeScreenProps {
  onStart: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <div className="relative flex-1 flex flex-col items-center px-8 overflow-y-auto hide-scrollbar">
      {/* Hero Content Wrapper */}
      <div className="min-h-screen flex flex-col items-center justify-center py-12 w-full">
        <div className="z-10 flex flex-col items-center text-center space-y-5 animate-fade-up">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse-soft"></div>
            <div className="relative w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:rotate-[360deg] group-hover:rounded-full">
              <span className="text-4xl">🐎</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <p className="text-primary font-black tracking-[0.2em] text-[9px] uppercase">Xuân Bính Ngọ 2026</p>
            </div>
            <h1 className="text-5xl font-black tracking-tight text-white leading-snug">
              VẬN THẾ <br/>
              <span className="text-gold-gradient">KHAI MỞ</span>
            </h1>
            <p className="text-white/60 text-sm font-medium leading-relaxed max-w-[240px] mx-auto">
              Khám phá nguồn năng lượng ẩn giấu của bạn trong năm mới!
            </p>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative z-10 w-52 h-52 my-8 animate-float flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl"></div>
          <div className="relative w-40 h-40 rounded-[42%] bg-gradient-to-br from-primary to-accent shadow-[0_20px_50px_rgba(212,175,55,0.3)] border-b-[8px] border-amber-800 flex items-center justify-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 w-4 h-6 bg-amber-950 rounded-full"></div>
            <div className="glass-card w-20 h-20 rounded-3xl shadow-xl flex items-center justify-center transform -rotate-6">
              <span className="material-symbols-rounded text-4xl text-white">auto_awesome</span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="z-20 w-full max-w-xs animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={onStart}
            className="group relative w-full h-16 bg-primary text-secondary font-black rounded-[1.5rem] overflow-hidden transition-all active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out opacity-20"></div>
            <span className="relative z-10 tracking-widest text-xs flex items-center justify-center gap-3">
              TỪ KHÓA NĂM MỚI CỦA BẠN LÀ GÌ?
              <span className="material-symbols-rounded text-lg group-hover:translate-x-1 transition-transform">east</span>
            </span>
          </button>
        </div>
      </div>

      {/* MobiFone Detailed Footer */}
      <Footer className="animate-fade-up opacity-0 pb-16" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' } as any} />
    </div>
  );
};

export default HomeScreen;
