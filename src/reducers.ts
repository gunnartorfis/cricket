import { IParticipant } from './types/Participant';

const exampleInitialState = {
  participants: []
};

export const actionTypes = {
  UPDATE_PARTICIPANTS: 'UPDATE_PARTICIPANTS'
};

// REDUCERS
export const reducer = (state = exampleInitialState, action: any) => {
  switch (action.type) {
    case actionTypes.UPDATE_PARTICIPANTS:
      return Object.assign({}, state, {
        participants: action.participants
      });
    default:
      return state;
  }
};

// ACTIONS
export const updateParticipants = (participants: IParticipant[]) => {
  return { type: actionTypes.UPDATE_PARTICIPANTS, participants };
};
