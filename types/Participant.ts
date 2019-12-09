export interface IParticipant {
  _id: string;
  name: string;
  progress: CricketProgress[];
  missCount: number;
}

export interface CricketProgress {
  number: string;
  count: number;
}
