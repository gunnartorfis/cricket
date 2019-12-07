export interface IParticipant {
  _id: string;
  name: string;
  progress: CricketProgress[];
}

export interface CricketProgress {
  number: string;
  count: number;
}
