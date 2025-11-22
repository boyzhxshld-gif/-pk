
import React, { useState, useEffect, useRef } from 'react';
import { GameSettings, MatchType, Word } from '../types';
import { STUDENT_POOL } from '../constants';

interface SetupModalProps {
  selectedWords: Word[];
  isOpen: boolean;
  onClose: () => void;
  onStart: (settings: GameSettings) => void;
}

declare global {
  interface Window {
    XLSX: any;
  }
}

const SetupModal: React.FC<SetupModalProps> = ({ selectedWords, isOpen, onClose, onStart }) => {
  const [studentPool, setStudentPool] = useState<string[]>([...STUDENT_POOL]);
  const [settings, setSettings] = useState<GameSettings>({
    gameType: 'timed',
    timeLimit: 60,
    matchType: '1v1',
    questionType: 'english-to-chinese',
    teamRedName: '天天队',
    teamBlueName: '向上队',
    teamRedPlayers: ['林宇晴'],
    teamBluePlayers: ['胡明远'],
    penalty: false,
  });

  const [isCustomTime, setIsCustomTime] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const rollingInterval = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
        updatePlayers(settings.matchType);
    }
    return () => {
        if (rollingInterval.current) clearInterval(rollingInterval.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const updatePlayers = (type: MatchType) => {
    const count = parseInt(type.charAt(0));
    const shuffled = [...studentPool].sort(() => 0.5 - Math.random());
    setSettings(prev => ({
      ...prev,
      teamRedPlayers: shuffled.slice(0, count),
      teamBluePlayers: shuffled.slice(count, count * 2)
    }));
  };

  const handleRandomizeTeams = () => {
    if (isRolling) return;
    setIsRolling(true);
    
    const count = parseInt(settings.matchType.charAt(0));
    let ticks = 0;
    const maxTicks = 15; 

    if (rollingInterval.current) clearInterval(rollingInterval.current);

    rollingInterval.current = window.setInterval(() => {
        const shuffled = [...studentPool].sort(() => 0.5 - Math.random());
        setSettings(prev => ({
            ...prev,
            teamRedPlayers: shuffled.slice(0, count),
            teamBluePlayers: shuffled.slice(count, count * 2)
        }));
        ticks++;
        if (ticks >= maxTicks) {
             if (rollingInterval.current) clearInterval(rollingInterval.current);
             setIsRolling(false);
        }
    }, 100);
  };

  const handleMatchTypeChange = (type: MatchType) => {
    if (isRolling) return;
    setSettings(prev => ({ ...prev, matchType: type }));
    const count = parseInt(type.charAt(0));
    const shuffled = [...studentPool].sort(() => 0.5 - Math.random());
    setSettings(prev => ({
        ...prev,
        teamRedPlayers: shuffled.slice(0, count),
        teamBluePlayers: shuffled.slice(count, count * 2)
    }));
  };

  const handleDownloadTemplate = () => {
    if (!window.XLSX) return;
    const templateData = [['学生姓名'], ['张三'], ['李四'], ['王五'], ['赵六']];
    const wb = window.XLSX.utils.book_new();
    const ws = window.XLSX.utils.aoa_to_sheet(templateData);
    window.XLSX.utils.book_append_sheet(wb, ws, '学生名单');
    window.XLSX.writeFile(wb, '学生名单模板.xlsx');
  };

  const handleExcelImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !window.XLSX) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = window.XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = window.XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        
        if (jsonData.length < 2) {
          alert('Excel文件中没有找到有效的学生数据');
          return;
        }
        
        const students: string[] = [];
        for (let i = 1; i < jsonData.length; i++) {
          const name = jsonData[i][0];
          if (name && typeof name === 'string' && name.trim()) {
            students.push(name.trim());
          }
        }
        
        if (students.length === 0) {
          alert('没有从Excel文件中提取到学生姓名');
          return;
        }
        
        setStudentPool(students);
        alert(`成功导入 ${students.length} 名学生`);
        
        const count = parseInt(settings.matchType.charAt(0));
        const shuffled = [...students].sort(() => 0.5 - Math.random());
        setSettings(prev => ({
            ...prev,
            teamRedPlayers: shuffled.slice(0, count),
            teamBluePlayers: shuffled.slice(count, count * 2)
        }));

      } catch (error) {
        console.error('Error processing Excel:', error);
        alert('处理Excel文件时出错，请确保文件格式正确');
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={!isRolling ? onClose : undefined}></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-[98vw] max-w-[98vw] h-[96vh] max-h-[98vh] flex flex-col animate-fade-in overflow-hidden">
        {/* Header - More Compact */}
        <div className="flex justify-between items-center p-3 border-b border-gray-100 bg-white z-10 flex-none shadow-sm">
            <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-xl mr-3">
                    <i className="fa fa-cogs text-2xl text-primary"></i>
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">赛事配置</h2>
                    <p className="text-gray-400 text-xs font-bold">Setup Battle</p>
                </div>
            </div>
            {!isRolling && (
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
                    <i className="fa fa-times text-2xl"></i>
                </button>
            )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden bg-gray-50 p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                
                {/* Left Column: Settings (4/12 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-4 h-full overflow-y-auto pr-2 custom-scrollbar">
                    {/* Game Settings Card */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <i className="fa fa-gamepad text-primary mr-2"></i> 规则设置
                        </h3>
                        
                        {/* Game Type */}
                        <div className="mb-6">
                            <label className="text-gray-400 text-xs font-bold uppercase mb-2 block">模式</label>
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                {['timed', 'rush', 'points'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setSettings({...settings, gameType: type as any})}
                                        disabled={isRolling}
                                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                                            settings.gameType === type 
                                            ? 'bg-white text-primary shadow-sm' 
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        {type === 'timed' ? '限时' : type === 'rush' ? '抢答' : '计分'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Limit */}
                        <div className="mb-6">
                            <label className="text-gray-400 text-xs font-bold uppercase mb-2 block">时长</label>
                            <div className="grid grid-cols-3 gap-2">
                                {[60, 120, 180].map(time => (
                                    <button
                                        key={time}
                                        onClick={() => {
                                            setSettings({...settings, timeLimit: time});
                                            setIsCustomTime(false);
                                        }}
                                        disabled={isRolling}
                                        className={`py-2 rounded-lg text-sm font-bold border transition-all ${
                                            settings.timeLimit === time && !isCustomTime 
                                            ? 'border-primary bg-primary/5 text-primary' 
                                            : 'border-gray-100 text-gray-600 hover:border-gray-300'
                                        }`}
                                    >
                                        {time}s
                                    </button>
                                ))}
                            </div>
                            <div className="mt-2 relative">
                                <input 
                                    type="number" 
                                    placeholder="自定义秒数"
                                    value={isCustomTime ? settings.timeLimit : ''}
                                    onChange={(e) => {
                                        setIsCustomTime(true);
                                        setSettings({...settings, timeLimit: parseInt(e.target.value) || 60})
                                    }}
                                    className="w-full py-2 pl-3 pr-8 border rounded-lg text-sm font-bold focus:border-primary outline-none"
                                    disabled={isRolling}
                                />
                                <span className="absolute right-3 top-2 text-xs text-gray-400 font-bold">秒</span>
                            </div>
                        </div>
                        
                        {/* Question Type */}
                        <div className="mb-4">
                             <label className="text-gray-400 text-xs font-bold uppercase mb-2 block">题型</label>
                             <div className="flex flex-col gap-2">
                                {[
                                    { id: 'english-to-chinese', label: '英 ➜ 中' },
                                    { id: 'chinese-to-english', label: '中 ➜ 英' },
                                    { id: 'random', label: '混合模式' }
                                ].map((option) => (
                                    <button 
                                        key={option.id} 
                                        onClick={() => !isRolling && setSettings({...settings, questionType: option.id as any})}
                                        className={`
                                            px-4 py-3 rounded-xl border text-left transition-all flex items-center justify-between
                                            ${settings.questionType === option.id 
                                                ? 'border-primary bg-primary text-white shadow-md' 
                                                : 'border-gray-100 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}
                                        `}
                                    >
                                        <span className="font-bold text-sm">{option.label}</span>
                                        {settings.questionType === option.id && <i className="fa fa-check-circle"></i>}
                                    </button>
                                ))}
                            </div>
                        </div>
                         <label className="flex items-center p-3 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                            <input 
                                type="checkbox" 
                                checked={settings.penalty}
                                onChange={(e) => setSettings({...settings, penalty: e.target.checked})}
                                className="text-primary rounded border-gray-300 focus:ring-primary" 
                            />
                            <span className="ml-2 font-bold text-sm text-gray-700">答错扣分 (Hard Mode)</span>
                        </label>
                    </div>
                </div>

                {/* Right Column: Players (8/12 cols) */}
                <div className="lg:col-span-8 h-full flex flex-col min-h-0">
                    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 border border-gray-100 h-full flex flex-col relative overflow-hidden">
                        
                        {/* Top Bar: Mode & Actions */}
                        <div className="flex flex-wrap justify-between items-center mb-4 gap-4 z-10">
                            <div className="bg-gray-100 p-1 rounded-lg flex shadow-inner">
                                {(['1v1', '2v2', '3v3'] as MatchType[]).map(mode => (
                                    <button
                                        key={mode}
                                        onClick={() => handleMatchTypeChange(mode)}
                                        disabled={isRolling}
                                        className={`
                                            px-4 py-1.5 rounded-md font-black text-sm transition-all
                                            ${settings.matchType === mode 
                                                ? 'bg-white text-primary shadow-sm' 
                                                : 'text-gray-400 hover:text-gray-600'}
                                        `}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <label className="cursor-pointer bg-green-50 text-green-600 hover:bg-green-100 font-bold py-2 px-4 rounded-lg text-sm transition-colors flex items-center border border-green-100">
                                    <i className="fa fa-file-excel-o mr-2"></i> 导入
                                    <input type="file" accept=".xlsx, .xls" className="hidden" onChange={handleExcelImport} />
                                </label>
                                <button onClick={handleDownloadTemplate} className="bg-gray-50 text-gray-500 hover:bg-gray-100 font-bold py-2 px-4 rounded-lg text-sm transition-colors flex items-center border border-gray-100">
                                    <i className="fa fa-download mr-2"></i> 模板
                                </button>
                            </div>
                        </div>
                        
                        {/* Teams Display Area */}
                        <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0 overflow-hidden z-10">
                            
                            {/* Red Team */}
                            <div className="flex-1 rounded-2xl bg-red-50/50 border-2 border-red-100 flex flex-col overflow-hidden">
                                <div className="p-4 bg-red-100/50 border-b border-red-100 flex justify-between items-center">
                                    <input 
                                        value={settings.teamRedName}
                                        onChange={(e) => setSettings({...settings, teamRedName: e.target.value})}
                                        className="bg-transparent font-black text-xl text-red-600 outline-none placeholder-red-300 w-full"
                                        placeholder="队伍名称"
                                    />
                                    <i className="fa fa-fire text-red-400 text-xl"></i>
                                </div>
                                <div className="flex-1 p-3 overflow-y-auto custom-scrollbar">
                                    <div className="flex flex-col gap-2">
                                        {settings.teamRedPlayers.map((player, idx) => (
                                            <div key={idx} className={`bg-white p-3 rounded-xl shadow-sm border border-red-100 flex items-center gap-3 transition-all ${isRolling ? 'opacity-70 scale-95' : ''}`}>
                                                <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-none text-lg">
                                                    <i className="fa fa-user"></i>
                                                </div>
                                                <span className="font-bold text-gray-700 truncate text-lg">{player}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* VS Divider */}
                            <div className="hidden md:flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-black italic text-sm border-4 border-white shadow-lg z-20">
                                    VS
                                </div>
                            </div>

                            {/* Blue Team */}
                            <div className="flex-1 rounded-2xl bg-blue-50/50 border-2 border-blue-100 flex flex-col overflow-hidden">
                                <div className="p-4 bg-blue-100/50 border-b border-blue-100 flex justify-between items-center">
                                    <input 
                                        value={settings.teamBlueName}
                                        onChange={(e) => setSettings({...settings, teamBlueName: e.target.value})}
                                        className="bg-transparent font-black text-xl text-blue-600 outline-none placeholder-blue-300 w-full"
                                        placeholder="队伍名称"
                                    />
                                    <i className="fa fa-bolt text-blue-400 text-xl"></i>
                                </div>
                                <div className="flex-1 p-3 overflow-y-auto custom-scrollbar">
                                    <div className="flex flex-col gap-2">
                                        {settings.teamBluePlayers.map((player, idx) => (
                                            <div key={idx} className={`bg-white p-3 rounded-xl shadow-sm border border-blue-100 flex items-center gap-3 transition-all ${isRolling ? 'opacity-70 scale-95' : ''}`}>
                                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center flex-none text-lg">
                                                    <i className="fa fa-user"></i>
                                                </div>
                                                <span className="font-bold text-gray-700 truncate text-lg">{player}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Randomize Button */}
                        <div className="mt-4 flex justify-center z-10">
                            <button 
                                onClick={handleRandomizeTeams}
                                disabled={isRolling}
                                className={`
                                    bg-white border-2 border-gray-200 text-gray-600 font-bold py-2 px-8 rounded-full shadow-sm transition-all hover:border-primary hover:text-primary hover:shadow-md flex items-center text-lg
                                    ${isRolling ? 'opacity-50' : 'hover:-translate-y-0.5'}
                                `}
                            >
                                <i className={`fa fa-random mr-2 ${isRolling ? 'fa-spin' : ''}`}></i> 
                                随机分配
                            </button>
                        </div>
                        
                        {/* Background Blobs */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="flex-none p-4 bg-white border-t border-gray-100 flex justify-center z-20 shadow-lg">
            <button 
                onClick={() => onStart(settings)}
                disabled={isRolling}
                className={`
                    bg-gradient-to-r from-primary to-blue-600 text-white font-black py-3 px-20 rounded-full text-xl shadow-lg shadow-blue-200 transition-all transform hover:scale-105
                    ${isRolling ? 'opacity-50 cursor-not-allowed' : 'animate-pulse-slow'}
                `}
            >
                <i className="fa fa-play mr-2"></i> 开始
            </button>
        </div>
      </div>
    </div>
  );
};

export default SetupModal;
