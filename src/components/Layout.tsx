import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

import NavBar from './NavBar';

NProgress.configure({
  showSpinner: false
});

interface Props {
  children?: any;
}

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (): void => NProgress.start();
    const handleComplete = (): void => NProgress.done();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return (): void => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <>
      <NavBar />

      {children}
    </>
  );
};

export default Layout;
