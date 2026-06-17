import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Zap, Trophy } from 'lucide-react';
import { CodeEditor } from './CodeEditor';

export const LearningArena: React.FC = () => {
  const { algorithms, activeAlgorithmId, setActiveAlgorithmId, updateStreak, addScore } = useGame();
  
  const [mode, setMode] = useState<'blanks' | 'editor'>('blanks');
  const [feedbackMsg, setFeedbackMsg] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  // Memorization Phase States
  const [isMemorizing, setIsMemorizing] = useState(true);
  const [timerCount, setTimerCount] = useState(20);

  const algorithm = algorithms.find(a => a.id === activeAlgorithmId);
  
  // Reset memorization phase when active algorithm changes
  useEffect(() => {
    setIsMemorizing(true);
    setTimerCount(20);
    setFeedbackMsg(null);
  }, [activeAlgorithmId]);

  // Countdown timer logic
  useEffect(() => {
    if (!isMemorizing) return;
    if (timerCount <= 0) {
      setIsMemorizing(false);
      return;
    }
    const interval = setInterval(() => {
      setTimerCount(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isMemorizing, timerCount]);

  if (!algorithm) return null;

  // Instant validation is active if the streak is low (e.g. less than 3)
  const instantValidation = algorithm.streak < 3;

  const handleSuccess = () => {
    updateStreak(algorithm.id, true);
    addScore(100);
    setFeedbackMsg({ type: 'success', text: 'Točno! Odličan posao.' });
    setTimeout(() => setFeedbackMsg(null), 3000);
    
    // Check if it got solved right now
    if (algorithm.streak + 1 >= algorithm.maxStreakReq) {
      setTimeout(() => setActiveAlgorithmId(null), 2000); // go back to dash
    }
  };

  const handleFail = () => {
    updateStreak(algorithm.id, false);
    setFeedbackMsg({ type: 'error', text: 'Nije sasvim točno. Pokušaj ponovno!' });
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  // 1. Memorization Phase Render
  if (isMemorizing) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (timerCount / 20) * circumference;

    return (
      <div className="app-container max-w-6xl p-6">
        <header className="arena-header dashboard-header">
          <button 
            onClick={() => setActiveAlgorithmId(null)}
            className="back-btn"
          >
            <ArrowLeft size={20} /> Povratak na popis
          </button>
          
          <div className="text-gradient font-bold text-lg uppercase tracking-wider">
            Faza pamćenja koda
          </div>
        </header>

        <div className="arena-content memorization-layout glass-panel p-8">
          <div className="memorization-sidebar">
            <h2 className="text-3xl font-bold mb-4">{algorithm.title}</h2>
            <p className="text-text-muted mb-8">{algorithm.description}</p>
            
            <div className="timer-container mb-8">
              <svg className="timer-svg" width="120" height="120">
                <circle 
                  cx="60" 
                  cy="60" 
                  r={radius} 
                  className="timer-bg-circle" 
                />
                <circle 
                  cx="60" 
                  cy="60" 
                  r={radius} 
                  className="timer-progress-circle" 
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset
                  }}
                />
                <text x="60" y="66" className="timer-text" textAnchor="middle">
                  {timerCount}s
                </text>
              </svg>
              <div className="text-xs text-text-muted mt-3 font-mono uppercase tracking-wider">
                Vrijeme za proučavanje
              </div>
            </div>

            <button 
              onClick={() => setIsMemorizing(false)}
              className="submit-btn"
            >
              Preskoči i počni rješavati
            </button>
          </div>

          <div className="memorization-main code-solution-container">
            <h3 className="text-sm font-bold text-secondary-accent uppercase tracking-wider mb-3">
              Rješenje za proučavanje:
            </h3>
            <div className="memorize-code-box">
              {algorithm.templateCode}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Solving Phase Render
  return (
    <div className="app-container max-w-6xl p-6">
      <header className="arena-header dashboard-header">
        <button 
          onClick={() => setActiveAlgorithmId(null)}
          className="back-btn"
        >
          <ArrowLeft size={20} /> Povratak na popis
        </button>
        
        <div className="flex gap-4 items-center">
          <div className="badge badge-streak">
            <Zap className="text-warning" size={16} /> 
            Streak: <span className={algorithm.streak > 0 ? 'text-warning' : ''}>{algorithm.streak}</span> / {algorithm.maxStreakReq}
          </div>
          {algorithm.status === 'solved' && (
            <div className="badge badge-solved">
              <Trophy size={16} /> Riješeno
            </div>
          )}
        </div>
      </header>

      <div className="arena-content">
        {/* Left Side: Info & Controls */}
        <div className="arena-sidebar">
          <div className="glass-panel p-6 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">{algorithm.title}</h2>
              <p className="text-text-muted mb-8">{algorithm.description}</p>
              
              <h3 className="font-semibold text-white mb-3">Način učenja:</h3>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setMode('blanks')}
                  className={`mode-btn ${mode === 'blanks' ? 'active' : ''}`}
                >
                  <div className="font-bold mb-1">Popuni praznine</div>
                  <div className="text-xs text-text-muted">Dopuni samo ključne linije koda. (Lakše)</div>
                </button>
                
                <button 
                  onClick={() => setMode('editor')}
                  className={`mode-btn ${mode === 'editor' ? 'active' : ''}`}
                >
                  <div className="font-bold mb-1">Puni kod</div>
                  <div className="text-xs text-text-muted">Napiši cijeli algoritam od nule. (Kao na ispitu)</div>
                </button>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-color">
              <h3 className="font-semibold text-white mb-2">Pomoć:</h3>
              <p className="text-xs text-text-muted">
                {instantValidation 
                  ? "Live validacija je UKLJUČENA. Greške se crvene odmah čim počneš pisati." 
                  : "Imaš dobar streak! Live validacija je isključena. Saznat ćeš je li točno tek nakon predaje."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Code Editor */}
        <div className="arena-main glass-panel p-6">
          {feedbackMsg && (
            <div className={`feedback-msg animate-fade-in ${feedbackMsg.type}`}>
              {feedbackMsg.text}
            </div>
          )}
          <CodeEditor 
            algorithm={algorithm} 
            mode={mode} 
            instantValidation={instantValidation}
            onSuccess={handleSuccess}
            onFail={handleFail}
          />
        </div>
      </div>
    </div>
  );
};

