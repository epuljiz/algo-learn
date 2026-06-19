import React, { useState } from 'react';
import type { Lesson } from '../data/lessonsData';
import { useGame } from '../context/GameContext';
import { X, CheckCircle, AlertTriangle, ArrowRight, BookOpen, HelpCircle } from 'lucide-react';

interface Props {
  lesson: Lesson;
  onClose: () => void;
}

export const LessonViewer: React.FC<Props> = ({ lesson, onClose }) => {
  const { completeLesson, completedLessons, addScore } = useGame();
  const [phase, setPhase] = useState<'theory' | 'quiz'>('theory');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shake, setShake] = useState(false);

  const isAlreadyCompleted = completedLessons.includes(lesson.id);
  const quizQuestions = lesson.quiz || [];
  const hasQuiz = quizQuestions.length > 0;

  const handleStartQuiz = () => {
    if (hasQuiz) {
      setPhase('quiz');
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(null);
    } else {
      handleCompleteLesson();
    }
  };

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer || isAnswered) return;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.correctAnswer;

    setIsCorrect(correct);
    setIsAnswered(true);

    if (!correct) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleContinue = () => {
    if (!isCorrect) {
      // Let them try again
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(null);
      return;
    }

    // If correct, move to next question or complete
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(null);
    } else {
      handleCompleteLesson();
    }
  };

  const handleCompleteLesson = () => {
    if (!isAlreadyCompleted) {
      completeLesson(lesson.id);
      addScore(50); // Give 50 points
    }
    onClose();
  };

  // Render the quiz question body
  const renderQuizQuestion = () => {
    const question = quizQuestions[currentQuestionIndex];
    if (!question) return null;

    if (question.type === 'fill-in-the-blank') {
      const parts = (question.codeContext || '').split('___');
      return (
        <div className="flex flex-col gap-6 w-full">
          <div className="bg-[#020306] rounded-2xl border border-border-color overflow-hidden flex flex-col">
            <div className="bg-[#0c0e1a] px-6 py-3 text-sm font-mono text-secondary-accent border-b border-border-color flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary-accent animate-pulse"></span>
              nadopuni_kod.py
            </div>
            <div className="p-6 overflow-y-auto max-h-[300px] custom-scrollbar bg-black bg-opacity-40">
              <pre className="font-mono text-base leading-relaxed text-blue-300 whitespace-pre-wrap">
                <code>
                  {parts[0]}
                  <span className={`inline-block px-3 py-1 mx-1 rounded border font-bold text-center min-w-[70px] transition-all
                    ${isAnswered ? (isCorrect ? 'char-correct' : 'char-incorrect') : 
                      selectedAnswer ? 'border-secondary-accent text-secondary-accent bg-secondary-accent bg-opacity-10 animate-pulse' : 'border-dashed border-gray-500 text-gray-500 bg-black bg-opacity-30'}
                  `}>
                    {selectedAnswer || '?'}
                  </span>
                  {parts[1]}
                </code>
              </pre>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            {question.options.map((option) => {
              const isSelected = selectedAnswer === option;
              let btnClass = 'border-purple-900 border-opacity-50 bg-[#0e0b16] hover:border-secondary-accent hover:bg-[#150f22] text-text-main';
              
              if (isSelected) {
                btnClass = 'border-secondary-accent bg-secondary-accent bg-opacity-10 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]';
              }
              if (isAnswered && isSelected) {
                btnClass = isCorrect 
                  ? 'border-success bg-success bg-opacity-10 text-success shadow-[0_0_15px_rgba(57,255,20,0.2)]'
                  : 'border-error bg-error bg-opacity-10 text-error shadow-[0_0_15px_rgba(255,0,85,0.2)]';
              }

              return (
                <button
                  key={option}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`px-5 py-4 text-center font-mono font-bold rounded-xl border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${btnClass}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // default: multiple-choice
    return (
      <div className="flex flex-col gap-4 w-full">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;
          let btnClass = 'border-purple-900 border-opacity-50 bg-[#0e0b16] hover:border-secondary-accent hover:bg-[#150f22] text-text-main';
          
          if (isSelected) {
            btnClass = 'border-secondary-accent bg-secondary-accent bg-opacity-10 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]';
          }
          if (isAnswered && isSelected) {
            btnClass = isCorrect 
              ? 'border-success bg-success bg-opacity-10 text-success shadow-[0_0_15px_rgba(57,255,20,0.2)]'
              : 'border-error bg-error bg-opacity-10 text-error shadow-[0_0_15px_rgba(255,0,85,0.2)]';
          }

          return (
            <button
              key={option}
              onClick={() => handleSelectOption(option)}
              disabled={isAnswered}
              className={`w-full px-6 py-4 text-left font-semibold rounded-xl border transition-all duration-200 flex items-center justify-between hover:scale-[1.01] active:scale-[0.99] ${btnClass}`}
            >
              <span>{option}</span>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs
                ${isSelected ? 'border-secondary-accent bg-secondary-accent bg-opacity-25' : 'border-gray-600'}
              `}>
                {isSelected && <div className="w-3 h-3 rounded-full bg-secondary-accent" />}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background bg-opacity-95 backdrop-blur-md animate-fade-in">
      <div className={`glass-panel w-full max-w-4xl max-h-[92vh] overflow-y-auto relative p-8 shadow-2xl flex flex-col transition-all duration-300
        ${shake ? 'animate-shake' : ''}
        ${isAnswered && isCorrect ? 'shadow-[0_0_40px_rgba(57,255,20,0.15)]' : ''}
        ${isAnswered && isCorrect === false ? 'shadow-[0_0_40px_rgba(255,0,85,0.15)]' : ''}
      `}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-5"
        >
          <X size={24} />
        </button>

        {phase === 'theory' ? (
          <>
            <div className="mb-8 pr-12">
              <div className="inline-block badge-big-o px-3 py-1 rounded-full font-bold text-sm mb-4">
                Vremenska složenost: {lesson.bigO}
              </div>
              <h2 className="text-4xl font-bold mb-2 text-gradient">{lesson.title}</h2>
              <p className="text-xl text-text-muted">{lesson.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
              {/* Theory side */}
              <div className="flex flex-col gap-6">
                <div className="bg-white bg-opacity-5 p-6 rounded-2xl border border-white border-opacity-10">
                  <h3 className="text-2xl font-bold mb-4 text-secondary-accent flex items-center gap-2">
                    <BookOpen size={24} />
                    Teorija
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-200">{lesson.content}</p>
                </div>
              </div>

              {/* Code side */}
              <div className="flex flex-col h-full min-h-[300px]">
                <div className="bg-[#020306] rounded-2xl border border-white border-opacity-10 overflow-hidden flex-1 flex flex-col">
                  <div className="bg-[#0c0e1a] px-4 py-2 text-sm font-mono text-gray-400 border-b border-gray-800 flex items-center justify-between">
                    <span>implementation.py</span>
                    <span className="text-xs text-purple-400 uppercase font-semibold">Python</span>
                  </div>
                  <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
                    <pre className="font-mono text-sm leading-relaxed text-blue-300">
                      <code>{lesson.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                onClick={handleStartQuiz}
                className="btn px-12 py-4 text-xl font-bold flex items-center gap-3 transition-all duration-300 start rounded-xl"
              >
                {hasQuiz ? 'Započni kviz' : 'Završi lekciju'}
              </button>
            </div>
          </>
        ) : (
          // Quiz phase
          <div className="flex flex-col flex-1">
            
            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex justify-between items-center text-sm font-bold text-text-muted mb-2 uppercase tracking-wider">
                <span>Kviz: {lesson.title}</span>
                <span>Pitanje {currentQuestionIndex + 1} od {quizQuestions.length}</span>
              </div>
              <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                <div 
                  className="h-full bg-progress-gradient transition-all duration-300 shadow-[0_0_10px_var(--secondary-accent)]"
                  style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-6 flex items-start gap-4">
              <div className="p-3 bg-secondary-accent bg-opacity-10 border border-secondary-accent rounded-xl text-secondary-accent">
                <HelpCircle size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {quizQuestions[currentQuestionIndex].question}
                </h3>
                <p className="text-text-muted">Odaberi točan odgovor kako bi nastavio.</p>
              </div>
            </div>

            {/* Interactive Question Body */}
            <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full my-4">
              {renderQuizQuestion()}
            </div>

            {/* Feedback Panel */}
            <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col gap-4">
              {isAnswered ? (
                <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4
                  ${isCorrect 
                    ? 'bg-success bg-opacity-10 border-success text-success shadow-[0_0_20px_rgba(57,255,20,0.1)]' 
                    : 'bg-error bg-opacity-10 border-error text-error shadow-[0_0_20px_rgba(255,0,85,0.1)]'
                  }
                `}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle size={32} className="shrink-0 mt-1" />
                    ) : (
                      <AlertTriangle size={32} className="shrink-0 mt-1" />
                    )}
                    <div>
                      <h4 className="text-xl font-bold mb-1">
                        {isCorrect ? 'Točno! Odličan posao!' : 'Netočno. Pokušaj ponovo!'}
                      </h4>
                      {isCorrect && quizQuestions[currentQuestionIndex].explanation && (
                        <p className="text-sm opacity-90 text-gray-200 mt-1">
                          {quizQuestions[currentQuestionIndex].explanation}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleContinue}
                    className={`btn px-8 py-3 text-lg font-bold rounded-xl flex items-center gap-2 self-end md:self-auto
                      ${isCorrect ? 'bg-success hover:bg-opacity-90 text-black font-extrabold shadow-[0_0_15px_rgba(57,255,20,0.3)]' : 'bg-error hover:bg-opacity-90 text-white shadow-[0_0_15px_rgba(255,0,85,0.3)]'}
                    `}
                  >
                    <span>Nastavi</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-text-muted text-sm font-semibold">
                    {selectedAnswer ? 'Odgovor odabran. Provjeri točnost.' : 'Odaberi jedan od ponuđenih odgovora.'}
                  </span>
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!selectedAnswer}
                    className={`btn px-8 py-3 text-lg font-bold rounded-xl flex items-center gap-2 transition-all duration-300
                      ${selectedAnswer 
                        ? 'start' 
                        : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed opacity-55'
                      }
                    `}
                  >
                    Provjeri
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
