import React from 'react';

import 'nprogress/nprogress.css';
import '~/scss/styles.scss';

import Layout from '~/components/Layout';

const App: any = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;

