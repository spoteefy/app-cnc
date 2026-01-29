
export enum AppView {
  HOME = 'HOME',
  SPINNING = 'SPINNING',
  RESULT = 'RESULT'
}

export interface PredictionResult {
  word1: string;
  word2: string;
  word3: string;
  wish: string;
}
