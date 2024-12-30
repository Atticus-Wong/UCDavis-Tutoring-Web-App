import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../config/theme';
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import { CssBaseline } from '@mui/material';
import Layout from './layout';
import { SessionProvider } from 'next-auth/react';
import { useFirebaseAuth } from '@/src/utils/firebase';
import { CacheProvider, EmotionCache } from '@emotion/react';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  useFirebaseAuth();
  return <>{children}</>;
}

export default function App({
  Component,
  emotionCache,
  pageProps
}: MyAppProps) {
  return (
    <SessionProvider>
      <FirebaseAuthProvider>
        <AppCacheProvider emotionCache={emotionCache}>
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
