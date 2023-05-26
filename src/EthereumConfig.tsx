import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { useMemo } from 'react';

import useDefaultWallets from './useDefaultWallets';

const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);

function EthereumConfig({ children }: { children: React.ReactNode }) {
  const { connectors, wallets } = useDefaultWallets({
    appName: 'RainbowKit Wallet Standard',
    chains,
  });

  const wagmiConfig = useMemo(() => {
    if (!wallets.length) return;

    return createConfig({
      autoConnect: true,
      connectors,
      publicClient,
    });
  }, [connectors]);

  if (!wagmiConfig) return null;

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}

export default EthereumConfig;
