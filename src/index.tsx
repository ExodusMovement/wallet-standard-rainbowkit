import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import './index.css';
import App from './App';
import { getDefaultWallets } from './tmp/rainbowkit/getDefaultWallets'

const { chains, provider } = configureChains(
  [mainnet],
  [
    alchemyProvider({
      apiKey: '4Ow2G3LYC6SXr_AOesCG8Fi0_bxTGf1x',
      priority: 0,
    }),
    publicProvider({
      priority: 1,
    }),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit Wallet Standard',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
