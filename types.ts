
export interface Word {
  english: string;
  chinese: string;
  textbook?: string;
  unit?: string;
}

export interface UnitData {
  title: string;
  words: Word[];
}

export interface TextbookData {
  [unitKey: string]: UnitData;
}

export interface WordDatabase {
  [textbookKey: string]: TextbookData;
}

export type GameType = 'timed' | 'rush' | 'points';
export type MatchType = '1v1' | '2v2' | '3v3';
export type QuestionType = 'chinese-to-english' | 'english-to-chinese' | 'random';

export interface GameSettings {
  gameType: GameType;
  timeLimit: number;
  matchType: MatchType;
  questionType: QuestionType;
  teamRedName: string;
  teamBlueName: string;
  teamRedPlayers: string[];
  teamBluePlayers: string[];
  penalty: boolean;
}

export type ViewState = 'selection' | 'welcome' | 'game';
