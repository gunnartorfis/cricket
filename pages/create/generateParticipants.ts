import { IParticipant } from '../../types/Participant';

interface IGenerateParticipants {
  numberOfParticipants: number;
  lowestBeforeBull: number;
}

const generateParticipants = ({ numberOfParticipants, lowestBeforeBull }: IGenerateParticipants) => {
  const initialParticipants: IParticipant[] = [];
  for (let i = 1; i <= numberOfParticipants; i++) {
    const progress = [];
    for (let j = 20; j >= lowestBeforeBull; j--) {
      progress.push({
        number: `${j}`,
        count: 0
      });
    }

    initialParticipants.push({
      _id: `${i}`,
      name: '',
      progress
    });
  }

  return initialParticipants;
};

export default generateParticipants;
