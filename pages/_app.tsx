import { AppProps, Container } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import smoothScroll from "smoothscroll-polyfill";
import { ThemeProvider } from "theme-ui";
import { ThemeGlobal } from "../components/ThemeGlobal";
import { ModalProvider } from "../contexts/modal";
import theme from "../utils/theme";

import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    smoothScroll.polyfill();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <ThemeGlobal />
        <Component {...pageProps} />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
