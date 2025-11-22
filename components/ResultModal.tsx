
import React, { useEffect } from 'react';
import { GameSettings } from '../types';
import { AudioService } from '../services/audioService';

interface ResultModalProps {
  isOpen: boolean;
  redScore: number;
  blueScore: number;
  settings: GameSettings;
  onRestart: () => void;
  onBackToSetup: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, redScore, blueScore, settings, onRestart, onBackToSetup }) => {
  
  useEffect(() => {
      if (isOpen) {
          AudioService.playVictoryBGM();
      }
      return () => {
          AudioService.stopBGM(); 
      };
  }, [isOpen]);

  if (!isOpen) return null;

  const winner = redScore > blueScore ? 'red' : blueScore > redScore ? 'blue' : 'draw';
  const winnerName = winner === 'red' ? settings.teamRedName : winner === 'blue' ? settings.teamBlueName : '平局';
  
  const getEncouragement = () => {
      if (winner === 'draw') return "旗鼓相当，难分伯仲！";
      const diff = Math.abs(redScore - blueScore);
      if (diff > 10) return "大获全胜，太厉害了！";
      if (diff > 5) return "精彩绝伦的胜利！";
      return "险胜对手，真是惊心动魄！";
  };

  // Generate random confetti pieces
  const confettiPieces = Array.from({ length: 40 }).map((_, i) => (
      <div 
        key={i} 
        className="confetti-piece" 
        style={{ 
            left: `${Math.random() * 100}%`, 
            animation: `fall ${Math.random() * 2 + 2}s linear infinite`, 
            animationDelay: `${Math.random()}s` 
        }} 
      />
  ));

  return (
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in overflow-hidden p-4">
       
       {/* Confetti Background */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
           {confettiPieces}
       </div>

       <div className="bg-white rounded-[3rem] p-6 md:p-12 max-w-5xl w-full shadow-2xl transform transition-all scale-100 relative z-10 border-8 border-white/20 bg-clip-padding flex flex-col max-h-[95vh] overflow-y-auto custom-scrollbar">
           <div className="text-center pb-4">
                {/* Header Badge */}
                <div className="-mt-20 mb-8 flex justify-center">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 md:px-12 py-3 md:py-5 rounded-full shadow-xl text-2xl md:text-4xl font-black tracking-wider animate-bounce-slow border-8 border-gray-900">
                        <i className="fa fa-trophy mr-3"></i> 战报出炉
                    </div>
                </div>

                <h2 className="text-4xl md:text-7xl font-black mb-4 text-gray-800 drop-shadow-sm animate-pop-in">
                    {winner === 'draw' ? (
                        <span className="text-gray-600">🤝 比赛平局!</span>
                    ) : (
                        <>
                            <span className={winner === 'red' ? 'text-red-600' : 'text-blue-600'}>{winnerName}</span> 
                            <span className="text-yellow-500 ml-4">获胜!</span>
                        </>
                    )}
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-500 font-bold mb-8 md:mb-12 animate-pulse-slow">
                    {getEncouragement()}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
                    {/* Red Team Result Card */}
                    <div className={`
                        rounded-3xl p-6 md:p-8 border-4 transform transition-all relative overflow-hidden flex flex-col
                        ${winner === 'red' ? 'bg-red-50 border-red-500 shadow-xl scale-105 z-10' : 'bg-gray-50 border-gray-200 opacity-90'}
                    `}>
                         {winner === 'red' && <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rounded-bl-xl font-bold"><i className="fa fa-star"></i> WINNER</div>}
                         <h3 className="text-red-600 font-black text-2xl md:text-3xl mb-2">{settings.teamRedName}</h3>
                         <p className="text-6xl md:text-8xl font-black text-red-600 mb-6">{redScore}</p>
                         
                         {/* Player Names List */}
                         <div className="bg-white/60 rounded-xl p-4 mt-auto">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-2">参赛选手</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {settings.teamRedPlayers.map((player, idx) => (
                                    <span key={idx} className="bg-white border border-red-200 text-red-800 px-4 py-2 rounded-full font-black text-lg md:text-xl shadow-sm">
                                        {player}
                                    </span>
                                ))}
                            </div>
                         </div>
                    </div>

                    {/* Blue Team Result Card */}
                    <div className={`
                        rounded-3xl p-6 md:p-8 border-4 transform transition-all relative overflow-hidden flex flex-col
                        ${winner === 'blue' ? 'bg-blue-50 border-blue-500 shadow-xl scale-105 z-10' : 'bg-gray-50 border-gray-200 opacity-90'}
                    `}>
                         {winner === 'blue' && <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-xl font-bold"><i className="fa fa-star"></i> WINNER</div>}
                         <h3 className="text-blue-600 font-black text-2xl md:text-3xl mb-2">{settings.teamBlueName}</h3>
                         <p className="text-6xl md:text-8xl font-black text-blue-600 mb-6">{blueScore}</p>
                         
                         {/* Player Names List */}
                         <div className="bg-white/60 rounded-xl p-4 mt-auto">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-2">参赛选手</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {settings.teamBluePlayers.map((player, idx) => (
                                    <span key={idx} className="bg-white border border-blue-200 text-blue-800 px-4 py-2 rounded-full font-black text-lg md:text-xl shadow-sm">
                                        {player}
                                    </span>
                                ))}
                            </div>
                         </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button 
                        onClick={onRestart} 
                        className="bg-gray-800 text-white font-black py-4 px-10 md:py-5 md:px-12 rounded-full text-xl md:text-2xl shadow-xl hover:bg-black hover:shadow-2xl transform hover:-translate-y-1 transition-all w-full sm:w-auto"
                    >
                        <i className="fa fa-refresh mr-3"></i> 再来一局
                    </button>
                    <button 
                        onClick={onBackToSetup} 
                        className="bg-gray-100 text-gray-600 font-bold py-4 px-10 md:py-5 md:px-12 rounded-full text-xl md:text-2xl shadow-md hover:bg-gray-200 hover:shadow-lg transform hover:-translate-y-1 transition-all w-full sm:w-auto border-2 border-gray-200"
                    >
                        <i className="fa fa-cog mr-3"></i> 重新设置
                    </button>
                </div>
           </div>
       </div>
    </div>
  );
};

export default ResultModal;
