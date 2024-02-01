"use client";

import * as React from "react";

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";

import "@rainbow-me/rainbowkit/styles.css";

import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { configureChains, createConfig, WagmiConfig } from "wagmi";

import { publicProvider } from "wagmi/providers/public";

import {
  arbitrum,
  sepolia,
  polygonMumbai,
  mainnet,
  polygon,
  optimism,
  base,
  zora,
  filecoinCalibration,
} from "viem/chains";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    arbitrum,
    sepolia,
    polygonMumbai,
    mainnet,
    polygon,
    optimism,
    base,
    zora,
    filecoinCalibration,
  ],
  [publicProvider()]
);

const projectId = "DappHack_123";

const { wallets } = getDefaultWallets({
  appName: "DappHack",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "DappHack",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
