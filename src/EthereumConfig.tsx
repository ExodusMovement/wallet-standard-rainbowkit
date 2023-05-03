import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { useMemo } from 'react';

import useDefaultWallets from './useDefaultWallets';

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

function EthereumConfig({ children }: { children: React.ReactNode }) {
  const { connectors, wallets } = useDefaultWallets({
    appName: 'RainbowKit Wallet Standard',
    chains,
  });

  const wagmiClient = useMemo(() => {
    if (!wallets.length) return;

    return createClient({
      autoConnect: true,
      connectors,
      provider,
    });
  }, [connectors]);

  if (!wagmiClient) return null;

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}

export default EthereumConfig;
