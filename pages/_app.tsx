import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const privyConfig = {
    supportedChains: [
      {
        id: 5264468217, // yominet chainid
        name: 'Yominet',
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
        },
        blockExplorers: {
          default: {
            name: 'Yominet Explorer',
            url: 'https://yominet.explorer.caldera.xyz',
          },
        },
        rpcUrls: {
          default: {
            http: ['https://yominet.rpc.caldera.xyz/http'],
          },
        },
      },
    ],
    embeddedWallets: {
      noPromptOnSignature: true, // Added configuration
    },
  };
  return (
    <>
      <Head>
        <link rel="preload" href="/fonts/AdelleSans-Regular.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/AdelleSans-Semibold.woff2" as="font" crossOrigin="" />

        <link rel="icon" href="/favicons/kami-caretaker.svg" type="image/svg+xml" />

        <title>Kami Caretaker</title>
        <meta name="description" content="Kami Caretaker" />
      </Head>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        clientId={process.env.NEXT_PUBLIC_PRIVY_KAMICARETAKER_CLIENT_ID}
        onSuccess={() => router.push('/dashboard')}
        config={privyConfig}
      >
        <Component {...pageProps} />
        <ToastContainer />
      </PrivyProvider>
    </>
  );
}

export default MyApp;