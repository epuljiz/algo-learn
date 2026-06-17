import React from 'react';
import { useGame } from '../context/GameContext';
import { Play, CheckCircle2, Lock } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { algorithms, score, setActiveAlgorithmId } = useGame();

  return (
    <div className="animate-fade-in w-full max-w-5xl mx-auto p-6">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Algo<span className="text-gradient">Learn</span></h1>
          <p className="text-text-muted">Master algorithms by writing them.</p>
        </div>
        
        <div className="glass-panel px-6 py-4 flex items-center gap-4">
          <div className="text-sm text-text-muted uppercase tracking-wider font-semibold">Total Score</div>
          <div className="text-3xl font-bold text-gradient">{score}</div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algo) => (
          <div 
            key={algo.id}
            className={`glass-panel p-6 relative overflow-hidden transition-all duration-300
              ${algo.status === 'locked' ? 'opacity-60 cursor-not-allowed' : 'hover:var(--bg-panel-hover) cursor-pointer hover:-translate-y-1'}`}
            onClick={() => algo.status !== 'locked' && setActiveAlgorithmId(algo.id)}
          >
            {/* Status indicator line */}
            <div className={`absolute top-0 left-0 w-full h-1 
              ${algo.status === 'solved' ? 'bg-success' : 
                algo.status === 'available' ? 'bg-primary-accent' : 'bg-gray-600'}`} 
            />

            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{algo.title}</h3>
              {algo.status === 'solved' && <CheckCircle2 className="text-success" size={24} />}
              {algo.status === 'locked' && <Lock className="text-text-muted" size={24} />}
              {algo.status === 'available' && <Play className="text-primary-accent" size={24} />}
            </div>
            
            <p className="text-text-muted text-sm mb-6 h-10">{algo.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="text-xs font-mono text-text-muted">
                Streak: <span className={algo.streak > 0 ? "text-warning font-bold" : ""}>{algo.streak}/{algo.maxStreakReq}</span>
              </div>
              
              <button 
                className={`btn ${algo.status === 'locked' ? 'locked' : algo.status === 'solved' ? 'solved' : 'start'}`}
                disabled={algo.status === 'locked'}
              >
                {algo.status === 'solved' ? 'Practice Again' : algo.status === 'locked' ? 'Locked' : 'Start Learning'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
