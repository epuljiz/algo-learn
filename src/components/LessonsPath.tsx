import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { lessonsData } from '../data/lessonsData';
import { Check, Lock, BookOpen } from 'lucide-react';
import { LessonViewer } from './LessonViewer';

export const LessonsPath: React.FC = () => {
  const { completedLessons, score } = useGame();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const selectedLesson = selectedLessonId ? lessonsData.find(l => l.id === selectedLessonId) : null;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 relative h-screen overflow-y-auto overflow-x-hidden custom-scrollbar pb-32">
      {selectedLesson && (
        <LessonViewer 
          lesson={selectedLesson} 
          onClose={() => setSelectedLessonId(null)} 
        />
      )}

      <header className="flex justify-between items-center mb-12 mt-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">Algorithm <span className="text-gradient">Lessons</span></h2>
          <p className="text-text-muted">Nauči teoriju i Big O notacije kroz lekcije.</p>
        </div>
        
        <div className="glass-panel px-6 py-4 flex items-center gap-4">
          <div className="text-sm text-text-muted uppercase tracking-wider font-semibold">Total Score</div>
          <div className="text-3xl font-bold text-gradient">{score}</div>
        </div>
      </header>

      <div className="relative py-10 flex flex-col items-center">
        {lessonsData.map((lesson, index) => {
          // A lesson is unlocked if it's the first one, or if the previous one is completed.
          const isFirst = index === 0;
          const previousLesson = index > 0 ? lessonsData[index - 1] : null;
          const isUnlocked = isFirst || (previousLesson && completedLessons.includes(previousLesson.id));
          const isCompleted = completedLessons.includes(lesson.id);
          
          // Calculate an offset to create a snake-like path
          const xOffset = Math.sin((index * Math.PI) / 3) * 80;

          return (
            <div key={lesson.id} className="relative flex flex-col items-center my-6" style={{ transform: `translateX(${xOffset}px)` }}>
              
              {/* Connection Line to previous node */}
              {index > 0 && (
                <svg className="absolute w-64 h-32 pointer-events-none" style={{ top: '-110px', left: '-128px', zIndex: -1 }}>
                  <path 
                    d={`M 128 110 Q ${128 - xOffset + (Math.sin(((index-1) * Math.PI) / 3) * 80)} 55 ${128 - xOffset + (Math.sin(((index-1) * Math.PI) / 3) * 80)} 0`} 
                    fill="none" 
                    stroke={isUnlocked ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255,255,255,0.1)'} 
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={isUnlocked ? 'none' : '10, 10'}
                  />
                </svg>
              )}

              {/* Node Button */}
              <button
                onClick={() => isUnlocked && setSelectedLessonId(lesson.id)}
                disabled={!isUnlocked}
                className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 transform 
                  ${!isUnlocked ? 'bg-gray-800 border-4 border-gray-700 opacity-60 cursor-not-allowed' : 
                    isCompleted ? 'bg-primary-dark border-4 border-primary-accent shadow-[0_0_20px_rgba(214,0,255,0.3)] hover:scale-105' : 
                    'bg-[#0c0e1a] text-secondary-accent border-4 border-secondary-accent shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-110 animate-pulse-slow'}
                `}
              >
                {isCompleted ? (
                  <Check size={40} className="text-primary-accent" />
                ) : !isUnlocked ? (
                  <Lock size={32} className="text-gray-500" />
                ) : (
                  <BookOpen size={36} className="text-secondary-accent" />
                )}

                {/* Big O Badge */}
                {isUnlocked && (
                  <div className="absolute -top-3 -right-3 badge-big-o text-xs font-bold px-2 py-1 rounded-lg shadow-lg transform rotate-12">
                    {lesson.bigO}
                  </div>
                )}
              </button>

              {/* Title Tooltip */}
              <div className="mt-4 text-center w-48">
                <h3 className={`font-bold ${!isUnlocked ? 'text-gray-500' : 'text-text-main'}`}>{lesson.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
