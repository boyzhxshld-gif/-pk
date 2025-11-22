
import React, { useState, useEffect, useRef } from 'react';
import { GameSettings, Word } from '../types';
import { AudioService } from '../services/audioService';

interface GameScreenProps {
  settings: GameSettings;
  wordPool: Word[];
  onEndGame: (redScore: number, blueScore: number) => void;
}

interface Option extends Word {
  id: string;
  style: React.CSSProperties;
}

const GameScreen: React.FC<GameScreenProps> = ({ settings, wordPool, onEndGame }) => {
  const [timeLeft, setTimeLeft] = useState(settings.timeLimit);
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);

  const [redCurrentWord, setRedCurrentWord] = useState<Word | null>(null);
  const [blueCurrentWord, setBlueCurrentWord] = useState<Word | null>(null);
  
  const [redOptions, setRedOptions] = useState<Option[]>([]);
  const [blueOptions, setBlueOptions] = useState<Option[]>([]);

  const timerRef = useRef<number | null>(null);

  // Initialize Game
  useEffect(() => {
    if (settings.gameType === 'rush') {
        generateCommonRound();
    } else {
        generateNewRound('red');
        generateNewRound('blue');
    }
    startTimer();
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      AudioService.stopBGM();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle Game End
  useEffect(() => {
      if (timeLeft === 0) {
          AudioService.stopBGM();
          onEndGame(redScore, blueScore);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const getRandomWords = (correct: Word, count: number = 4): Word[] => {
    const others = wordPool.filter(w => w.english !== correct.english);
    const shuffled = [...others].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count - 1);
    return [...selected, correct].sort(() => 0.5 - Math.random());
  };

  // Helper to determine the mode for the current round
  const getRoundMode = (masterWord: Word): 'en-to-cn' | 'cn-to-en' => {
      // 1. Explicit Mode Check
      if (settings.questionType === 'chinese-to-english') {
          return 'cn-to-en';
      }
      if (settings.questionType === 'english-to-chinese') {
          return 'en-to-cn';
      }
      
      // 2. Random Mode: Deterministic decision based on word property
      // This ensures that for a specific word, the direction is consistent during a render
      return masterWord.english.length % 2 === 0 ? 'en-to-cn' : 'cn-to-en';
  };

  // Strictly determine display text
  const getDisplayText = (targetWord: Word, type: 'question' | 'answer', masterWord: Word) => {
      const mode = getRoundMode(masterWord);

      if (mode === 'cn-to-en') {
          // Mode: Chinese -> English
          // Question: Chinese
          // Answer: English
          return type === 'question' ? targetWord.chinese : targetWord.english;
      } else {
          // Mode: English -> Chinese
          // Question: English
          // Answer: Chinese
          return type === 'question' ? targetWord.english : targetWord.chinese;
      }
  };

  const generateOptionsWithLayout = (words: Word[], team: 'red' | 'blue', correctWord: Word): Option[] => {
    const placedOptions: { x: number, y: number, width: number, height: number }[] = [];
    const options: Option[] = [];
    const maxAttempts = 2000;

    const shuffledWords = [...words];
    const correctIndex = shuffledWords.findIndex(w => w.english === correctWord.english);
    if (correctIndex > -1) {
        shuffledWords.splice(correctIndex, 1);
        shuffledWords.unshift(correctWord); 
    }

    shuffledWords.forEach((word, index) => {
       let attempt = 0;
       let placed = false;
       
       // Calculate dynamic width based on content length
       const answerText = getDisplayText(word, 'answer', correctWord);
       
       // Estimate visual length: Chinese chars = 2 units, English = 1 unit
       const visualLength = answerText.split('').reduce((acc, char) => acc + (char.charCodeAt(0) > 255 ? 2 : 1), 0);
       
       // Base calculation: Min 18% + chars * factor
       const scale = 0.95 + Math.random() * 0.2; 
       
       let calculatedWidth = (16 + (visualLength * 2.2)) * scale;
       
       // Clamping width
       if (calculatedWidth < 18) calculatedWidth = 18;
       if (calculatedWidth > 48) calculatedWidth = 48; // Max width
       
       const optionWidth = calculatedWidth;
       const optionHeight = 14 + Math.random() * 4; // Variable height slightly

       
       // Define safe area (exclude header and edges)
       const safeMarginX = 3; // % from left/right edges
       const headerHeight = 22; // % from top to avoid header
       const bottomMargin = 5; // % from bottom

       while (!placed && attempt < maxAttempts) {
           // Generate random position within safe area
           const maxX = 100 - optionWidth - safeMarginX;
           const minX = safeMarginX;
           const maxY = 100 - optionHeight - bottomMargin;
           const minY = headerHeight;

           const x = minX + Math.random() * (maxX - minX);
           const y = minY + Math.random() * (maxY - minY);
           
           let overlap = false;
           
           // Check against already placed options with padding
           const padding = 2; // % extra spacing between bubbles
           
           for (const p of placedOptions) {
               // Simple rectangle intersection check
               if (
                   x < p.x + p.width + padding &&
                   x + optionWidth + padding > p.x &&
                   y < p.y + p.height + padding &&
                   y + optionHeight + padding > p.y
               ) {
                   overlap = true;
                   break;
               }
           }

           if (!overlap) {
               // Larger rotation range for messy look (-12 to +12 degrees)
               const rotation = Math.floor(Math.random() * 24) - 12;
               
               // Transparent Glass effect
               const bgColor = 'rgba(255, 255, 255, 0.6)'; 
               const textColor = team === 'red' ? '#7f1d1d' : '#172554'; // Darker text for contrast on transparent bg

               placedOptions.push({ x, y, width: optionWidth, height: optionHeight });
               options.push({
                   ...word,
                   id: Math.random().toString(36).substr(2, 9),
                   style: {
                       left: `${x}%`,
                       top: `${y}%`,
                       width: `${optionWidth}%`,
                       height: `${optionHeight}%`,
                       transform: `rotate(${rotation}deg)`,
                       color: textColor,
                       backgroundColor: bgColor,
                       backdropFilter: 'blur(8px)',
                       border: '2px solid rgba(255,255,255,0.5)',
                       zIndex: 30,
                   }
               });
               placed = true;
           }
           attempt++;
       }
       
       if (!placed) {
           // Fallback grid
           const fallbackX = 10 + (index % 2) * 45;
           const fallbackY = 30 + Math.floor(index / 2) * 18;
           options.push({
               ...word,
               id: Math.random().toString(36).substr(2, 9),
               style: {
                   left: `${fallbackX}%`,
                   top: `${fallbackY}%`,
                   width: `40%`,
                   height: `15%`,
                   color: team === 'red' ? '#7f1d1d' : '#172554',
                   backgroundColor: 'rgba(255, 255, 255, 0.6)',
                   backdropFilter: 'blur(8px)',
                   border: '2px solid rgba(255,255,255,0.5)',
               }
           });
       }
    });
    
    return options;
  };

  const generateCommonRound = () => {
      const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
      const optionCount = Math.floor(Math.random() * 2) + 4;
      const rawOptions = getRandomWords(randomWord, optionCount);
      
      const redLayout = generateOptionsWithLayout(rawOptions, 'red', randomWord);
      const blueLayout = generateOptionsWithLayout(rawOptions, 'blue', randomWord);
      
      setRedCurrentWord(randomWord);
      setRedOptions(redLayout);
      setBlueCurrentWord(randomWord);
      setBlueOptions(blueLayout);
  };

  const generateNewRound = (team: 'red' | 'blue') => {
     const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
     const optionCount = Math.floor(Math.random() * 2) + 4;
     const rawOptions = getRandomWords(randomWord, optionCount);
     const layoutOptions = generateOptionsWithLayout(rawOptions, team, randomWord);
     
     if (team === 'red') {
        setRedCurrentWord(randomWord);
        setRedOptions(layoutOptions);
     } else {
        setBlueCurrentWord(randomWord);
        setBlueOptions(layoutOptions);
     }
  };

  const handleOptionClick = (team: 'red' | 'blue', selectedWord: Word, event: React.MouseEvent<HTMLButtonElement>) => {
      const correctWord = team === 'red' ? redCurrentWord : blueCurrentWord;
      if (!correctWord) return;

      const isCorrect = selectedWord.english === correctWord.english;
      const btn = event.currentTarget;

      if (isCorrect) {
          // Visual Feedback
          btn.style.backgroundColor = '#22c55e'; // bright green
          btn.style.color = 'white';
          btn.style.transform = `${btn.style.transform} scale(1.1)`;
          btn.style.zIndex = '50';
          btn.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.8)';
          btn.style.border = '4px solid #ffffff';
          btn.style.opacity = '1';
          
          AudioService.playSuccessSound();
          if (team === 'red') setRedScore(s => s + 1);
          else setBlueScore(s => s + 1);

          if (settings.gameType === 'rush') {
              setTimeout(() => generateCommonRound(), 400);
              return; 
          }

      } else {
          // Error
          btn.style.backgroundColor = '#ef4444'; // bright red
          btn.style.color = 'white';
          btn.style.transform = `${btn.style.transform} scale(0.9)`;
          btn.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6)';
          btn.style.opacity = '1';
          
          AudioService.playErrorSound();
          if (settings.penalty) {
             if (team === 'red') setRedScore(s => Math.max(0, s - 1));
             else setBlueScore(s => Math.max(0, s - 1));
          }
          if (settings.gameType === 'rush') {
              btn.style.pointerEvents = 'none';
              return; 
          }
      }
      
      setTimeout(() => generateNewRound(team), 400);
  };


  const renderTeamSection = (team: 'red' | 'blue', currentWord: Word | null, options: Option[]) => {
      if (!currentWord) return null;

      const isRed = team === 'red';
      // Improved Gradients
      const bgClass = isRed 
        ? 'bg-gradient-to-br from-[#8B0000] via-[#DC143C] to-[#FF4500]' 
        : 'bg-gradient-to-bl from-[#00008B] via-[#1E90FF] to-[#00BFFF]';
      
      const textColor = isRed ? 'text-red-900' : 'text-blue-900';
      const score = isRed ? redScore : blueScore;
      const teamName = isRed ? settings.teamRedName : settings.teamBlueName;
      const borderColor = isRed ? 'border-red-200' : 'border-blue-200';

      return (
          <div className={`relative flex-1 h-full flex flex-col overflow-hidden ${bgClass}`}>
              {/* Fancy Background Patterns */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" 
                   style={{
                       backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                       backgroundSize: '40px 40px'
                   }}>
              </div>
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              
              {/* Light Beams */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

              {/* Top Header: Avatar & Score */}
              <div className={`relative z-20 flex items-center p-4 mt-2 ${isRed ? 'flex-row' : 'flex-row-reverse'}`}>
                   {/* Team Logo */}
                   <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-[6px] border-white/80 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center z-10 bg-gradient-to-b from-white to-gray-100 transform ${isRed ? '-rotate-6' : 'rotate-6'} overflow-hidden`}>
                        {isRed ? (
                             <i className="fa fa-fire text-5xl md:text-6xl text-red-600 drop-shadow-lg"></i>
                        ) : (
                             <i className="fa fa-bolt text-5xl md:text-6xl text-blue-600 drop-shadow-lg"></i>
                        )}
                   </div>

                   {/* Score Board */}
                   <div className={`flex-1 flex flex-col justify-center ${isRed ? 'pl-6 items-start' : 'pr-6 items-end'}`}>
                        <div className={`text-white/90 text-base font-black uppercase tracking-widest mb-1 drop-shadow-md bg-black/20 px-3 py-1 rounded-full`}>
                            {teamName}
                        </div>
                       {/* Animated Score */}
                       <div className={`relative`}>
                            <div key={score} className="animate-pop-score text-white text-6xl md:text-7xl font-black leading-none tracking-wider drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tabular-nums">
                                {score}
                            </div>
                       </div>
                   </div>
              </div>

              {/* Question Box - Clean and distinct */}
              <div className="relative z-20 px-6 mt-1 flex justify-center">
                   <div className={`
                      w-full max-w-lg bg-white
                      rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,0.2)] 
                      border-4 ${borderColor}
                      px-8 py-6 min-h-[110px] flex items-center justify-center
                      transform transition-transform hover:scale-[1.01]
                      relative overflow-hidden
                   `}>
                      <div className="flex flex-col items-center relative z-10">
                        <h4 className={`text-3xl md:text-4xl font-black ${textColor} text-center leading-tight drop-shadow-sm break-words max-w-full`}>
                            {getDisplayText(currentWord, 'question', currentWord)}
                        </h4>
                      </div>
                   </div>
              </div>

              {/* Floating Answers Area */}
              <div className="relative flex-1 w-full h-full z-10">
                  {options.map((opt, index) => {
                      return (
                      <button 
                        key={opt.id}
                        onClick={(e) => handleOptionClick(team, opt, e)}
                        style={{
                            left: opt.style.left,
                            top: opt.style.top,
                            width: opt.style.width,
                            height: opt.style.height,
                            transform: opt.style.transform,
                            color: opt.style.color,
                            backgroundColor: opt.style.backgroundColor,
                            backdropFilter: opt.style.backdropFilter,
                            zIndex: opt.style.zIndex,
                            border: opt.style.border,
                            position: 'absolute',
                        }}
                        className={`
                            font-bold rounded-full
                            shadow-lg 
                            active:scale-95 transition-all duration-200 
                            flex items-center justify-center text-center leading-tight
                            px-4 md:px-6 text-xl md:text-3xl
                            cursor-pointer select-none
                            hover:bg-white/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]
                            whitespace-nowrap
                        `}
                      >
                          <span className="pointer-events-none">{getDisplayText(opt, 'answer', currentWord)}</span>
                      </button>
                  )})}
              </div>
          </div>
      );
  };

  // Timer Calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = ((settings.timeLimit - timeLeft) / settings.timeLimit) * circumference;
  const isWarning = timeLeft <= 10;

  const getQuestionModeLabel = () => {
      if (settings.questionType === 'chinese-to-english') return '看中文 ➜ 选英文';
      if (settings.questionType === 'english-to-chinese') return '看英文 ➜ 选中文';
      return '混合模式';
  }

  return (
    <div className="fixed inset-0 z-30 bg-gray-900 flex flex-col h-full w-full overflow-hidden font-sans select-none">
        
        {/* Center Floating Elements */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center">
            
            {/* Better Timer Circle */}
            <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center bg-white rounded-full shadow-[0_0_40px_rgba(0,0,0,0.4)]">
                 {/* SVG Progress Ring */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50" cy="50" r={radius}
                        stroke="#e5e7eb" strokeWidth="8" fill="none"
                    />
                    <circle
                        cx="50" cy="50" r={radius}
                        stroke={isWarning ? '#ef4444' : '#facc15'}
                        strokeWidth="8" fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={progress}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>

                <div className={`text-center z-10 ${isWarning ? 'animate-pulse' : ''}`}>
                    <span className={`text-4xl md:text-5xl font-black tabular-nums block ${isWarning ? 'text-red-600' : 'text-gray-800'}`}>
                        {timeLeft}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider block -mt-1">SECONDS</span>
                </div>
            </div>
            
            {/* Game Mode Badges */}
            <div className="mt-2 flex flex-col gap-1 items-center">
                <div className="bg-black/60 backdrop-blur-md text-white px-4 py-1 rounded-full border border-white/20 shadow-sm">
                    <span className="font-bold text-xs tracking-widest">
                        {settings.gameType === 'rush' ? 'RUSH MODE' : 'BATTLE MODE'}
                    </span>
                </div>
                <div className="bg-white/80 backdrop-blur-md text-gray-800 px-4 py-1 rounded-full border border-white/50 shadow-sm">
                    <span className="font-black text-xs tracking-widest whitespace-nowrap">
                        {getQuestionModeLabel()}
                    </span>
                </div>
            </div>
        </div>

        {/* VS Logo Center Screen (Subtle) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none opacity-80">
            <div className="relative">
                <span className="text-6xl md:text-8xl font-black text-white italic drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] opacity-20">
                    VS
                </span>
            </div>
        </div>

        {/* Split Screen Game Area */}
        <div className="flex-1 flex flex-col md:flex-row relative h-full w-full">
             {renderTeamSection('red', redCurrentWord, redOptions)}
             
             {/* Center Divider Line */}
             <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/50 to-transparent z-20 hidden md:block"></div> 
             
             {renderTeamSection('blue', blueCurrentWord, blueOptions)}
        </div>

        <style>{`
            @keyframes popScore {
                0% { transform: scale(1); }
                50% { transform: scale(1.5); text-shadow: 0 0 20px rgba(255,255,255,0.8); }
                100% { transform: scale(1); }
            }
            .animate-pop-score {
                animation: popScore 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
        `}</style>
    </div>
  );
};

export default GameScreen;
