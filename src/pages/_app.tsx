import React from 'react';
import { Provider } from 'react-redux';

import '../scss/styles.scss';

import store from '../store';
import Layout from '../components/Layout';

const App: any = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;

