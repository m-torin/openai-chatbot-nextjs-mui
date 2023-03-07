import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../helpers/theme';
import createEmotionCache from '../helpers/createEmotionCache';

/**
 * Client-side cache, shared for the whole session of the user in the browser.
 */
const clientSideEmotionCache = createEmotionCache();

/**
 * Props passed to the custom `MyApp` component, which extends `NextApp`.
 * 
 * @typedef {Object} MyAppProps
 * @extends {AppProps}
 * @property {EmotionCache} [emotionCache] - The Emotion cache to use for styling.
 */
export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}


/**
 * Custom `MyApp` component that extends `NextApp`. It wraps the entire Next.js app with MUI's `ThemeProvider` 
 * and `CssBaseline`, and provides a custom Emotion cache to ensure consistent server and client rendering.
 * 
 * @param {MyAppProps} props - Props passed to the component.
 * @returns {React.ReactNode} - The rendered app.
 */
export default function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
