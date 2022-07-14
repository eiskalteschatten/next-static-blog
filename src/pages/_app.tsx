import React from 'react';

import 'bootstrap/scss/bootstrap-grid.scss';
import 'bootstrap/scss/bootstrap-reboot.scss';
import 'bootstrap/scss/bootstrap-utilities.scss';

import 'nprogress/nprogress.css';
import '~/scss/styles.scss';

import Layout from '~/components/layout/Layout';

const App: any = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;

