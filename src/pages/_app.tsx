import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../config/theme';
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import { CssBaseline } from '@mui/material';
import Layout from './layout';
import { SessionProvider } from 'next-auth/react';
import { useFirebaseAuth } from '../utils/firebase';

function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  useFirebaseAuth();
  return <>{children}</>;
}
export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <SessionProvider>
      <FirebaseAuthProvider>
        <AppCacheProvider {...props}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
          </ThemeProvider>
        </AppCacheProvider>
      </FirebaseAuthProvider>
    </SessionProvider>
  );
}
