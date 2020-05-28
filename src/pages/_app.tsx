import React from 'react';
import { Provider } from 'react-redux';

import '../scss/styles.scss';

import store from '../store';
import MainLayout from '../components/MainLayout';

const App: any = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
};

export default App;

