import React from 'react';
import { Provider } from 'react-redux';

import '../scss/styles.scss';

import store from '../store';

const App: any = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;

