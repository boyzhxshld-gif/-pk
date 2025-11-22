
import React from 'react';
import { GameSettings } from '../types';

interface WelcomeScreenProps {
  settings: GameSettings;
  onStartGame: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ settings, onStartGame }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-900 flex items-center justify-center overflow-hidden font-sans">
       
       {/* Diagonal Backgrounds - Fixed z-index */}
       <div className="absolute inset-0 flex z-0">
           <div className="w-1/2 h-full bg-gradient-to-br from-red-600 to-red-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           </div>
           <div className="w-1/2 h-full bg-gradient-to-bl from-blue-600 to-blue-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           </div>
       </div>

       {/* Central VS Slash */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-[150%] h-48 bg-black transform -rotate-12 border-y-8 border-yellow-400 opacity-50"></div>
       </div>

       <div className="relative z-10 w-full max-w-[90vw] h-full max-h-screen flex flex-col items-center justify-center py-4">
            
            {/* Title Section */}
            <div className="flex-none text-center mb-4 md:mb-10 animate-pop-in">
                <h1 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] stroke-text" style={{ WebkitTextStroke: '2px black' }}>
                    WORD BATTLE
                </h1>
                <div className="inline-block bg-yellow-400 text-black text-lg md:text-2xl font-black px-6 py-2 transform -skew-x-12 mt-4 border-4 border-black shadow-xl">
                    单词PK大作战 • 决赛现场
                </div>
            </div>

            {/* Teams Area - Using Flex Grow/Shrink to fit */}
            <div className="flex-1 w-full flex justify-between items-center max-w-6xl mx-auto min-h-0">
                
                {/* Red Team */}
                <div className="flex-1 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                    <div className="relative mb-6 md:mb-10">
                        <div className="w-32 h-32 md:w-56 md:h-56 rounded-full bg-white border-8 border-red-500 shadow-2xl flex items-center justify-center overflow-hidden relative z-10">
                             <i className="fa fa-fire text-red-500 text-6xl md:text-8xl opacity-90"></i>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 md:px-8 md:py-2 rounded-lg font-black text-xl md:text-3xl whitespace-nowrap border-4 border-white shadow-lg z-20 min-w-[120px] text-center">
                            {settings.teamRedName}
                        </div>
                    </div>
                    <div className="space-y-2 md:space-y-4 text-center">
                        {settings.teamRedPlayers.map((p, i) => (
                            <div key={i} className="text-white text-3xl md:text-5xl font-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] animate-slide-in-left" style={{ animationDelay: `${i * 0.1}s` }}>
                                {p}
                            </div>
                        ))}
                    </div>
                </div>

                {/* VS Logo - Absolute Center */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <span className="text-[8rem] md:text-[16rem] font-black text-yellow-400 italic drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] animate-pulse-slow" style={{ WebkitTextStroke: '4px white' }}>
                        VS
                    </span>
                </div>

                {/* Blue Team */}
                <div className="flex-1 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                    <div className="relative mb-6 md:mb-10">
                        <div className="w-32 h-32 md:w-56 md:h-56 rounded-full bg-white border-8 border-blue-500 shadow-2xl flex items-center justify-center overflow-hidden relative z-10">
                             <i className="fa fa-bolt text-blue-500 text-6xl md:text-8xl opacity-90"></i>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 md:px-8 md:py-2 rounded-lg font-black text-xl md:text-3xl whitespace-nowrap border-4 border-white shadow-lg z-20 min-w-[120px] text-center">
                            {settings.teamBlueName}
                        </div>
                    </div>
                    <div className="space-y-2 md:space-y-4 text-center">
                        {settings.teamBluePlayers.map((p, i) => (
                            <div key={i} className="text-white text-3xl md:text-5xl font-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] animate-slide-in-right" style={{ animationDelay: `${i * 0.1}s` }}>
                                {p}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer / Start Button */}
            <div className="flex-none mt-8 md:mt-12 text-center z-30 pb-8">
                <button 
                    onClick={onStartGame}
                    className="group relative inline-flex items-center justify-center px-12 py-4 md:px-20 md:py-6 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-3xl md:text-6xl uppercase tracking-wide rounded-2xl border-b-8 border-yellow-600 active:border-b-0 active:translate-y-2 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                >
                    <span className="mr-4 group-hover:animate-spin"><i className="fa fa-play-circle"></i></span>
                    开始对战
                </button>
                
                <div className="mt-6 flex justify-center gap-6 text-white font-bold text-base md:text-xl opacity-90 bg-black/40 px-8 py-3 rounded-full backdrop-blur-md border border-white/20">
                    <span className="flex items-center"><i className="fa fa-clock-o mr-2 text-yellow-400"></i> {settings.timeLimit}秒</span>
                    <span className="w-px h-6 bg-white/30"></span>
                    <span className="flex items-center"><i className="fa fa-gamepad mr-2 text-yellow-400"></i> {settings.gameType === 'rush' ? '抢答模式' : '竞技模式'}</span>
                </div>
            </div>
       </div>

        <style>{`
            .stroke-text {
                -webkit-text-stroke: 2px black;
            }
            @keyframes slideInLeft {
                from { opacity: 0; transform: translateX(-50px); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(50px); }
                to { opacity: 1; transform: translateX(0); }
            }
            .animate-slide-in-left {
                animation: slideInLeft 0.5s ease-out forwards;
            }
            .animate-slide-in-right {
                animation: slideInRight 0.5s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default WelcomeScreen;
