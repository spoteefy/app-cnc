
import React, { useState, useCallback } from 'react';
import { AppView, PredictionResult } from './types';
import { KEYWORDS, WISHES, IMAGES } from './constants';
import HomeScreen from './components/HomeScreen';
import RouletteScreen from './components/RouletteScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const startSpinning = useCallback(() => {
    const shuffled = [...KEYWORDS].sort(() => 0.5 - Math.random());
    const randomWish = WISHES[Math.floor(Math.random() * WISHES.length)];
    
    setResult({
      word1: shuffled[0],
      word2: shuffled[1],
      word3: shuffled[2],
      wish: randomWish,
    });
    
    setView(AppView.SPINNING);
  }, []);

  const showResult = useCallback(() => {
    setView(AppView.RESULT);
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setView(AppView.HOME);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col bg-festive text-white">
      {/* Background Horse Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.07] overflow-hidden z-0">
        <img 
          src={IMAGES.horseIcon} 
          alt="Horse Background" 
          className="w-[150%] max-w-none grayscale brightness-200 contrast-0 rotate-12"
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        {view === AppView.HOME && (
          <HomeScreen onStart={startSpinning} />
        )}
        
        {view === AppView.SPINNING && result && (
          <RouletteScreen result={result} onComplete={showResult} />
        )}
        
        {view === AppView.RESULT && result && (
          <ResultScreen result={result} onReset={reset} />
        )}
      </div>
    </div>
  );
};

export default App;
