import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Dashboard } from './components/Dashboard';
import { LearningArena } from './components/LearningArena';

const MainView: React.FC = () => {
  const { activeAlgorithmId } = useGame();
  
  return (
    <main className="w-full min-h-screen text-text-main flex flex-col">
      {activeAlgorithmId ? <LearningArena /> : <Dashboard />}
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
