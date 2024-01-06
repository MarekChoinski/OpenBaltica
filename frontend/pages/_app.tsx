import "../styles/globals.css";
import { MoralisProvider, useMoralis } from "react-moralis";
import Head from "next/head";
import { ConnectButton, NotificationProvider } from "web3uikit";
import { useEffect } from "react";
import Moralis from "moralis";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider
        initializeOnMount={true}
        appId={process.env.NEXT_PUBLIC_APP_ID}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      >
        <NotificationProvider>
          {/* <Header /> */}
          <ConnectButton moralisAuth={false} />
          <Component {...pageProps} />
        </NotificationProvider>
      </MoralisProvider>
    </div>
  );
}

export default MyApp;
