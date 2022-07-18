import { AppStateProvider } from '../context/state';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/react-datepicker.scss';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   window.onbeforeunload = function () {
  //     return 'Are you sure you want to leave?';
  //   };
  //   if (window.confirm('Do you really want to leave?')) {
  //     window.open('exit.html', 'Thanks for Visiting!');
  //   }
  // }, []);
  return (
    <AppStateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppStateProvider>
  );
}

export default MyApp;
