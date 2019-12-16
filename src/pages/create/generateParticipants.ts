import { IParticipant } from '../../types/Participant';

interface IGenerateParticipants {
  numberOfParticipants: number;
  lowestBeforeBull: number;
  names?: string[];
}

const generateParticipants = ({
  numberOfParticipants,
  lowestBeforeBull,
  names
}: IGenerateParticipants) => {
  const initialParticipants: IParticipant[] = [];

  for (let i = 1; i <= numberOfParticipants; i++) {
    const progress = [];
    for (let j = 20; j >= lowestBeforeBull; j--) {
      progress.push({
        number: `${j}`,
        count: 0
      });
    }
    progress.push({
      number: 'Bull',
      count: 0
    });

    initialParticipants.push({
      name: names && names?.length >= i ? names[i - 1] : '',
      progress,
      missCount: 0
    });
  }

  return initialParticipants;
};

interface IResetParticipantsScore {
  participants: IParticipant[];
}

export const resetParticipantsScore = ({ participants }: IResetParticipantsScore) => {
  return participants.map(p => ({
    ...p,
    progress: p.progress.map(progress => ({
      number: progress.number,
      count: 0
    }))
  }));
};

export default generateParticipants;
