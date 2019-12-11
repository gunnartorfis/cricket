import React from 'react';
import withReduxStore from '../lib/withReduxStore';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import API from '@aws-amplify/api';
import awsconfig from './aws-exports';

// import Amplify from 'aws-amplify';
// Amplify.configure(awsconfig);

API.configure(awsconfig);

class CricketApp {
  constructor(props) {
    super(props);
    this.persistor = persistStore(props.reduxStore);
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <PersistGate loading={<Component {...pageProps} />} persistor={this.persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    );
  }
}

export default withReduxStore(CricketApp);
