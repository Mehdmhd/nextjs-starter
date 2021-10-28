import * as React from 'react';
import Head from 'next/head';
import { SWRConfig } from "swr";
import { RecoilRoot } from "recoil";
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@utils/createEmotionCache';
import Backend from "@services/Backend";

// Global styles & theme
import '@styles/globals.scss';
import theme from "@styles/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta content="description" name="description" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SWRConfig
        value={{
          fetcher: Backend.fetcher,
        }}
      >
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </RecoilRoot>
      </SWRConfig>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
