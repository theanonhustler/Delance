import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Outfit, Work_Sans } from "next/font/google";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// @ts-ignore
import { configureChains, createConfig, WagmiConfig } from "wagmi";
// @ts-ignore
import { polygon, polygonMumbai } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
// @ts-ignore
import { publicProvider } from "wagmi/providers/public";

// Import CELO chain information
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";

const { chains, publicClient } = configureChains(
  [Alfajores, Celo],
  // @ts-ignore
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  appName: "Delance",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const outfit = Outfit({
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

const workSans = Work_Sans({
  style: ["italic", "normal"],
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${outfit.variable} ${workSans.variable}`}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </main>
  );
}
