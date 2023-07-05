import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Head from "next/head";
import { ConnectButton, NotificationProvider } from "web3uikit";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider
        initializeOnMount={false}
        //  appId={process.env.NEXT_PUBLIC_APP_ID} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
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
