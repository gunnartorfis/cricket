import './App.css';
import React from 'react';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import awsconfig from './aws-exports';

import Create from './pages/create';
import Play from './pages/play';
import configureStore from './reduxStore';

Amplify.configure(awsconfig);
function App() {
  const { persistor, store } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className='App'>
          <Router>
            <Create path='/' />
            <Play path='play' />
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default withAuthenticator(App);
