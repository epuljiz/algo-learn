import React, { useState, useEffect, useRef } from 'react';
import type { AlgorithmDef } from '../context/GameContext';

interface CodeEditorProps {
  algorithm: AlgorithmDef;
  onSuccess: () => void;
  onFail: () => void;
  mode: 'blanks' | 'editor';
  instantValidation: boolean;
}

const HighlightedBlankInput = ({ value, expected, onChange, instantValidation }: { value: string, expected: string, onChange: (e: any) => void, instantValidation: boolean }) => {
  const widthCh = Math.max(expected.length, 5);
  return (
    <div className="relative-container" style={{ width: `${widthCh}ch` }}>
      {/* Background Renderer */}
      <div className="highlight-bg">
        {value.split('').map((char, i) => {
          if (!instantValidation) {
            return <span key={i}>{char}</span>;
          }
          const normExpected = expected.replace(/\r/g, '');
          const isCorrect = i < normExpected.length && normExpected[i] === char;
          return (
            <span 
              key={i} 
              className={isCorrect ? 'char-correct' : 'char-incorrect'}
            >
              {char}
            </span>
          );
        })}
      </div>
      {/* Foreground Input */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="highlight-input"
        spellCheck="false"
        autoComplete="off"
        style={{ width: '100%' }}
      />
    </div>
  );
};

const HighlightedTextarea = ({ value, expected, onChange, instantValidation }: { value: string, expected: string, onChange: (e: any) => void, instantValidation: boolean }) => {
  const bgRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (bgRef.current) {
      bgRef.current.scrollTop = e.currentTarget.scrollTop;
      bgRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  const expectedLines = expected.replace(/\r/g, '').split('\n');
  const valueLines = value.split('\n');

  return (
    <div className="textarea-container">
      {/* Background Renderer */}
      <div 
        ref={bgRef}
        className="textarea-bg"
      >
        {valueLines.map((lineStr, lineIdx) => {
          const expLine = expectedLines[lineIdx] !== undefined ? expectedLines[lineIdx] : '';
          
          if (!instantValidation) {
            return (
              <React.Fragment key={lineIdx}>
                <span>{lineStr}</span>
                {lineIdx < valueLines.length - 1 ? '\n' : ''}
              </React.Fragment>
            );
          }

          const valMatch = lineStr.match(/^(\s*)(.*)$/);
          const valIndent = valMatch ? valMatch[1] : '';
          const valContent = valMatch ? valMatch[2] : '';
          
          const expMatch = expLine.match(/^(\s*)(.*)$/);
          const expContent = expMatch ? expMatch[2] : '';

          return (
            <React.Fragment key={lineIdx}>
              <span>{valIndent}</span>
              {valContent.split('').map((char, charIdx) => {
                const isCorrect = charIdx < expContent.length && expContent[charIdx] === char;
                return (
                  <span 
                    key={charIdx} 
                    style={{ backgroundColor: isCorrect ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.5)' }}
                  >
                    {char}
                  </span>
                );
              })}
              {lineIdx < valueLines.length - 1 ? '\n' : ''}
            </React.Fragment>
          );
        })}
      </div>
      {/* Foreground Textarea */}
      <textarea
        value={value}
        onChange={onChange}
        onScroll={handleScroll}
        className="textarea-input"
        spellCheck="false"
      />
    </div>
  );
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  algorithm, onSuccess, onFail, mode, instantValidation 
}) => {
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [editorText, setEditorText] = useState('');
  
  useEffect(() => {
    setInputs({});
    setEditorText('');
  }, [algorithm.id, mode]);

  const handleBlankChange = (index: number, val: string) => {
    setInputs(prev => ({ ...prev, [index]: val }));
  };

  const checkBlanks = () => {
    let allCorrect = true;
    algorithm.blanks.forEach((b, i) => {
      if ((inputs[i] || '').trim() !== b.expected.trim()) {
        allCorrect = false;
      }
    });
    return allCorrect;
  };

  const checkEditor = () => {
    const normalize = (s: string) => s.replace(/\s+/g, ' ').trim();
    return normalize(editorText) === normalize(algorithm.templateCode);
  };

  const handleSubmit = () => {
    const isCorrect = mode === 'blanks' ? checkBlanks() : checkEditor();
    
    setInputs({});
    setEditorText('');
    
    if (isCorrect) onSuccess();
    else onFail();
  };

  const renderBlanksMode = () => {
    const lines = algorithm.templateCode.split('\n');
    return (
      <div className="font-mono text-sm leading-8">
        {lines.map((line, lineIdx) => {
          const blankIdx = algorithm.blanks.findIndex(b => b.line === lineIdx);
          if (blankIdx !== -1) {
            const blank = algorithm.blanks[blankIdx];
            const currentVal = inputs[blankIdx] || '';
            const isCorrect = currentVal.trim() === blank.expected.trim();
            
            return (
              <div key={lineIdx} className="flex items-center gap-2 mb-2 code-line">
                <span className={`line-number select-none ${isCorrect ? 'correct-line-number' : 'pulse-line-number'}`}>
                  {lineIdx + 1}
                </span>
                <span className="whitespace-pre">{line.match(/^\s*/)?.[0]}</span>
                <HighlightedBlankInput
                  value={currentVal}
                  expected={blank.expected}
                  onChange={(e) => handleBlankChange(blankIdx, e.target.value)}
                  instantValidation={instantValidation}
                />
              </div>
            );
          }
          
          return (
            <div key={lineIdx} className="flex items-center gap-2 mb-2 code-line">
              <span className="line-number select-none text-gray-500">{lineIdx + 1}</span>
              <span className="whitespace-pre text-gray-300">{line}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderEditorMode = () => {
    return (
      <div className="flex flex-col h-full gap-2 relative">
        <HighlightedTextarea
          value={editorText}
          expected={algorithm.templateCode}
          onChange={(e) => setEditorText(e.target.value)}
          instantValidation={instantValidation}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex flex-col flex-1 h-full min-h-0">
        <div className="editor-container flex-1 overflow-y-auto m-0 mb-4 relative">
          {mode === 'blanks' ? renderBlanksMode() : renderEditorMode()}
        </div>
        <button
          onClick={handleSubmit}
          className="submit-btn shrink-0"
        >
          Predaj Rješenje
        </button>
      </div>
    </div>
  );
};
