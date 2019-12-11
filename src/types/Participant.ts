export interface IParticipant {
  name: string;
  progress: CricketProgress[];
  missCount: number;
}

export interface CricketProgress {
  number: string;
  count: number;
}
