import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const exampleInitialState = {
  participants: []
};

export const actionTypes = {
  UPDATE_PARTICIPANTS: 'UPDATE_PARTICIPANTS'
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  console.log({
    action
  });
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
export const updateParticipants = participants => {
  console.log('AAAAAAA', participants);
  return { type: actionTypes.UPDATE_PARTICIPANTS, participants };
};

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['participants'] // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducer);

export function initializeStore(initialState = exampleInitialState) {
  return createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware()));
}
