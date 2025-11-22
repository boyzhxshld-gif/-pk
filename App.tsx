import React, { useState } from 'react';
import WordSelection from './components/WordSelection';
import SetupModal from './components/SetupModal';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import ResultModal from './components/ResultModal';
import { Word, GameSettings, ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('selection');
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  const [finalScores, setFinalScores] = useState<{red: number, blue: number}>({red: 0, blue: 0});

  const handleStartSetup = () => {
    setIsSetupOpen(true);
  };

  const handleSetupComplete = (settings: GameSettings) => {
    setGameSettings(settings);
    setIsSetupOpen(false);
    setView('welcome');
  };

  const handleStartGame = () => {
    setView('game');
  };

  const handleEndGame = (red: number, blue: number) => {
    setFinalScores({ red, blue });
    setIsResultOpen(true);
  };

  const handleRestart = () => {
    setIsResultOpen(false);
    setView('welcome'); // Go back to VS screen then start
    setTimeout(() => setView('game'), 100); // Immediate restart trigger
  };

  const handleBackToSetup = () => {
    setIsResultOpen(false);
    setView('selection');
    setIsSetupOpen(true);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-50 text-gray-800 font-sans">
      
      {/* Header - Always visible in Selection mode */}
      {view === 'selection' && (
          <header className="flex-none p-4 bg-white/50 backdrop-blur-sm z-10 border-b border-gray-100/50 shadow-sm">
            <div className="text-center relative">
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 animate-pulse-slow inline-flex items-center drop-shadow-sm transform hover:scale-105 transition-transform duration-300 cursor-default py-2">
                <span className="text-yellow-400 text-4xl mr-3 filter drop-shadow-md">
                    <i className="fa fa-trophy"></i>
                </span>
                单词PK大作战
                <span className="text-yellow-400 text-4xl ml-3 filter drop-shadow-md">
                    <i className="fa fa-bolt"></i>
                </span>
              </h1>
              <p className="text-gray-400 text-sm font-bold tracking-widest uppercase mt-1">Word Battle Arena</p>
            </div>
          </header>
      )}

      {/* Main Content Area - Flex 1 to fill remaining space */}
      <main className="flex-1 overflow-hidden relative w-full">
        {view === 'selection' && (
            <div className="h-full w-full px-4 pb-4">
                <WordSelection 
                    selectedWords={selectedWords}
                    onSelectionChange={setSelectedWords}
                    onOpenSetup={handleStartSetup}
                />
            </div>
        )}

        {view === 'welcome' && gameSettings && (
            <WelcomeScreen 
                settings={gameSettings}
                onStartGame={handleStartGame}
            />
        )}

        {view === 'game' && gameSettings && (
            <GameScreen 
                settings={gameSettings}
                wordPool={selectedWords}
                onEndGame={handleEndGame}
            />
        )}
      </main>

      {/* Modals */}
      <SetupModal 
        isOpen={isSetupOpen} 
        selectedWords={selectedWords}
        onClose={() => setIsSetupOpen(false)}
        onStart={handleSetupComplete}
      />

      {gameSettings && (
          <ResultModal 
            isOpen={isResultOpen}
            redScore={finalScores.red}
            blueScore={finalScores.blue}
            settings={gameSettings}
            onRestart={handleRestart}
            onBackToSetup={handleBackToSetup}
          />
      )}
    </div>
  );
};

export default App;