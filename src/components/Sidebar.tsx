import React from 'react';
import { useGame } from '../context/GameContext';
import { Code2, BookOpen } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useGame();

  return (
    <div className="w-64 h-screen glass-panel rounded-none border-t-0 border-b-0 border-l-0 flex flex-col pt-8 pb-4">
      <div className="px-6 mb-12">
        <h1 className="text-3xl font-bold mb-1">Algo<span className="text-gradient">Learn</span></h1>
        <div className="text-xs text-text-muted uppercase tracking-wider font-semibold">Master Algorithms</div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <button
          onClick={() => setActiveTab('practice')}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-lg
            ${activeTab === 'practice' ? 'active-nav-btn' : 'inactive-nav-btn'}`}
        >
          <Code2 size={24} />
          Practice
        </button>

        <button
          onClick={() => setActiveTab('lessons')}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-lg
            ${activeTab === 'lessons' ? 'active-nav-btn' : 'inactive-nav-btn'}`}
        >
          <BookOpen size={24} />
          Lessons
        </button>
      </nav>
      
      <div className="px-6 text-xs text-text-muted text-center opacity-50">
        v1.0.0
      </div>
    </div>
  );
};
