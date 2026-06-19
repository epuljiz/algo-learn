import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Dashboard } from './components/Dashboard';
import { LearningArena } from './components/LearningArena';
import { Sidebar } from './components/Sidebar';
import { LessonsPath } from './components/LessonsPath';

const MainView: React.FC = () => {
  const { activeAlgorithmId, activeTab } = useGame();
  
  return (
    <main className="w-full h-screen text-text-main flex overflow-hidden">
      {!activeAlgorithmId && <Sidebar />}
      
      <div className="flex-1 h-screen overflow-y-auto custom-scrollbar">
        {activeAlgorithmId ? (
          <LearningArena />
        ) : activeTab === 'practice' ? (
          <Dashboard />
        ) : (
          <LessonsPath />
        )}
      </div>
    </main>
  );
};

function App() {
  return (
    <GameProvider>
      <MainView />
    </GameProvider>
  );
}

export default App;
