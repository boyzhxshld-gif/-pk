import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { TEXTBOOK_OPTIONS, WORD_DATABASE } from '../constants';
import { AudioService } from '../services/audioService';

interface WordSelectionProps {
  selectedWords: Word[];
  onSelectionChange: (words: Word[]) => void;
  onOpenSetup: () => void;
}

const WordSelection: React.FC<WordSelectionProps> = ({ selectedWords, onSelectionChange, onOpenSetup }) => {
  const [currentTextbook, setCurrentTextbook] = useState<string>('sevens');
  const [currentUnit, setCurrentUnit] = useState<string>('all');
  const [displayWords, setDisplayWords] = useState<Word[]>([]);

  useEffect(() => {
    const textbookData = WORD_DATABASE[currentTextbook];
    if (!textbookData) {
        setDisplayWords([]);
        return;
    }

    if (currentUnit === 'all') {
      const allWords = Object.values(textbookData).flatMap(unit => unit.words);
      setDisplayWords(allWords);
    } else {
      setDisplayWords(textbookData[currentUnit]?.words || []);
    }
  }, [currentTextbook, currentUnit]);

  const toggleWord = (word: Word) => {
    AudioService.playClickSound();
    const exists = selectedWords.find(w => w.english === word.english);
    if (exists) {
      onSelectionChange(selectedWords.filter(w => w.english !== word.english));
    } else {
      onSelectionChange([...selectedWords, word]);
    }
  };

  const handlePlayAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    AudioService.playTTS(text);
  };

  const handleQuickSelect = () => {
    if (displayWords.length === 0) return;
    
    // Randomly select 50% of the current display words
    const countToSelect = Math.max(1, Math.ceil(displayWords.length / 2));
    const shuffled = [...displayWords].sort(() => 0.5 - Math.random());
    const selectedSubset = shuffled.slice(0, countToSelect);
    
    // Remove current view words from selection first to avoid duplicates or stale state, then add subset
    const otherWords = selectedWords.filter(sw => !displayWords.some(dw => dw.english === sw.english));
    onSelectionChange([...otherWords, ...selectedSubset]);
    AudioService.playSuccessSound();
  };

  const handleReset = () => {
     if(window.confirm('确定要重置所有选择吗？')) {
        onSelectionChange([]);
     }
  };

  const getUnitOptions = () => {
    const data = WORD_DATABASE[currentTextbook];
    if(!data) return [];
    return Object.keys(data).map(key => ({ value: key, label: data[key].title }));
  };

  return (
    <section className="flex flex-col h-full w-full">
      {/* Top Control Bar */}
      <div className="flex-none bg-gradient-to-r from-textbook to-textbook/90 p-4 md:p-5 rounded-t-2xl shadow-lg mb-3 transition-all hover:shadow-xl z-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-white text-xl md:text-2xl font-extrabold flex items-center tracking-tight drop-shadow-md">
            <i className="fa fa-book mr-3 opacity-90"></i> 选择单词
          </h2>
          <div className="flex flex-wrap gap-3">
            <div className="relative group">
              <select 
                value={currentTextbook}
                onChange={(e) => { setCurrentTextbook(e.target.value); setCurrentUnit('all'); }}
                className="appearance-none bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 pr-10 focus:ring-2 focus:ring-white/50 focus:bg-white/20 shadow-md cursor-pointer font-bold transition-all hover:bg-white/30 backdrop-blur-md text-base"
              >
                {TEXTBOOK_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value} className="text-gray-800">{opt.label}</option>
                ))}
              </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/80 group-hover:text-white">
                  <i className="fa fa-chevron-down text-xs"></i>
                </div>
            </div>
            <div className="relative group">
              <select 
                value={currentUnit}
                onChange={(e) => setCurrentUnit(e.target.value)}
                className="appearance-none bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 pr-10 focus:ring-2 focus:ring-white/50 focus:bg-white/20 shadow-md cursor-pointer font-bold transition-all hover:bg-white/30 backdrop-blur-md text-base"
              >
                <option value="all" className="text-gray-800">全部单元</option>
                {getUnitOptions().map(opt => (
                    <option key={opt.value} value={opt.value} className="text-gray-800">{opt.label}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/80 group-hover:text-white">
                  <i className="fa fa-chevron-down text-xs"></i>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-2xl shadow-xl mx-0 flex flex-col overflow-hidden border border-gray-100 relative">
         {/* Toolbar */}
         <div className="flex-none bg-white p-3 md:p-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-3 z-10">
             <div className="flex items-center gap-4">
                <div className="text-lg md:text-xl font-bold text-gray-800 truncate max-w-md border-l-4 border-primary pl-3" title={currentUnit === 'all' ? '全部单元' : WORD_DATABASE[currentTextbook]?.[currentUnit]?.title}>
                    {currentUnit === 'all' ? '全部单元' : WORD_DATABASE[currentTextbook]?.[currentUnit]?.title || 'Loading...'}
                </div>
                <div className="text-primary text-sm font-bold bg-blue-50 px-4 py-1 rounded-full border border-blue-100">
                    共 {displayWords.length} 词
                </div>
             </div>
             
             <div className="flex gap-3 items-center">
                 <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                     <button 
                        onClick={handleQuickSelect} 
                        className="flex items-center px-5 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md hover:shadow-lg hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:-translate-y-0.5"
                     >
                        <i className="fa fa-bolt mr-2"></i> 快速选择
                     </button>
                 </div>
             </div>
         </div>

         <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
             {/* Left: Word Grid */}
             <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-gray-50/50">
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8 gap-4 pb-20">
                    {displayWords.map((word, idx) => {
                        const isSelected = selectedWords.some(w => w.english === word.english);
                        return (
                            <div 
                                key={`${word.english}-${idx}`}
                                onClick={() => toggleWord(word)}
                                className={`
                                    group cursor-pointer rounded-2xl p-4 border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden
                                    ${isSelected ? 'border-primary bg-blue-50/80 shadow-md scale-[1.02]' : 'border-transparent bg-white shadow-sm hover:border-blue-200'}
                                `}
                            >
                                {isSelected && (
                                    <div className="absolute top-2 right-2 text-primary">
                                        <i className="fa fa-check-circle text-2xl drop-shadow-sm"></i>
                                    </div>
                                )}
                                <div className="flex flex-col h-full justify-between">
                                    <div className="mb-2">
                                        <span className={`font-extrabold text-lg md:text-xl block break-words leading-tight ${isSelected ? 'text-primary' : 'text-gray-800'}`} title={word.english}>{word.english}</span>
                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2" title={word.chinese}>{word.chinese}</p>
                                    </div>
                                    
                                    <div className="flex justify-start mt-2">
                                         <button
                                            onClick={(e) => handlePlayAudio(e, word.english)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-primary hover:text-white transition-all"
                                         >
                                            <i className="fa fa-volume-up"></i>
                                         </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                 </div>
             </div>

             {/* Right: Selected List Sidebar */}
             <div className="md:w-80 lg:w-96 xl:w-[400px] border-l border-gray-100 flex flex-col bg-white shadow-[-4px_0_15px_rgba(0,0,0,0.02)] z-10">
                <div className="flex-none p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 backdrop-blur-sm">
                    <h3 className="font-bold text-gray-800 flex items-center text-lg">
                        <i className="fa fa-list-ul text-primary mr-2"></i>
                        已选单词 
                        <span className="ml-3 bg-primary text-white px-3 py-0.5 rounded-full text-sm font-bold shadow-sm animate-bounce-slow">{selectedWords.length}</span>
                    </h3>
                    <button 
                        onClick={handleReset} 
                        className="text-xs font-bold bg-white border border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 text-gray-500 px-4 py-2 rounded-full transition-all shadow-sm"
                    >
                        <i className="fa fa-trash-o mr-1"></i> 清空
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-gray-50/30 pb-24">
                    {selectedWords.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400 opacity-60">
                            <i className="fa fa-inbox text-5xl mb-3"></i>
                            <p className="text-base font-medium">尚未选择单词</p>
                        </div>
                    )}
                    {selectedWords.map((word, idx) => (
                        <div key={`${word.english}-selected-${idx}`} className="bg-white p-4 rounded-xl border-l-4 border-primary flex justify-between items-center shadow-sm hover:shadow-md hover:translate-x-1 transition-all group">
                            <div className="flex-1 min-w-0 mr-3">
                                <div className="font-bold text-gray-800 text-lg truncate">{word.english}</div>
                                <div className="text-gray-500 text-sm truncate">{word.chinese}</div>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); toggleWord(word); }} className="text-gray-300 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-all">
                                <i className="fa fa-times text-lg"></i>
                            </button>
                        </div>
                    ))}
                </div>
             </div>
         </div>
         
         {/* Floating Footer Button */}
         <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none z-20">
            <button 
                onClick={onOpenSetup}
                disabled={selectedWords.length < 4}
                className={`
                    pointer-events-auto
                    w-full max-w-xl py-4 px-10 rounded-full font-black shadow-2xl transition-all transform hover:-translate-y-2 flex items-center justify-center text-xl tracking-widest border-4 border-white
                    ${selectedWords.length < 4 
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500 shadow-none border-gray-200' 
                        : 'bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-blue-500/40 animate-pulse-slow'}
                `}
            >
                <i className="fa fa-rocket mr-3 text-2xl"></i> 准备开始
            </button>
        </div>
      </div>
    </section>
  );
};

export default WordSelection;