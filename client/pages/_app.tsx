import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps}>
        <Head>
            <title>Mt top app</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
            <meta name="description" content="The best top courses app!" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    </Component>;
}

export default MyApp;
