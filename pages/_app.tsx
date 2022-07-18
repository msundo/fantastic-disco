import { AppStateProvider } from '../context/state';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/react-datepicker.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppStateProvider>
  );
}

export default MyApp;
