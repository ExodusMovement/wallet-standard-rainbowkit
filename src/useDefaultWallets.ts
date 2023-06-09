// This file is copied with modifications from:
// - https://github.com/rainbow-me/rainbowkit/blob/0d5640929326d65673596a11cd018a9c6524ff8c/packages/rainbowkit/src/wallets/getDefaultWallets.ts.
// - https://github.com/wallet-standard/wallet-standard/blob/8ac98a8ac6001a34906d01eac2ae0825f7208b32/packages/react/core/src/WalletsProvider.tsx.

import {
  Chain,
  Wallet,
  WalletList,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { getWallets } from '@wallet-standard/app';
import type { Wallet as StandardWallet } from '@wallet-standard/base';
import { useEffect, useMemo, useState } from 'react';

import { standardWallet } from './tmp/rainbowkit/wallets/standardWallet';

function useNonStandardWallets({
  appName,
  chains,
}: {
  appName: string;
  chains: Chain[];
}): Wallet[] {
  return [
    injectedWallet({ chains }),
    safeWallet({ chains }),
    rainbowWallet({ chains }),
    coinbaseWallet({ appName, chains }),
    metaMaskWallet({ chains }),
    walletConnectWallet({ chains }),
    braveWallet({ chains }),
  ];
}

function isWagmiCompatibleWallet(wallet: StandardWallet) {
  return 'ethereum:provider' in wallet.features;
}

function useStandardWallets({ chains }: { chains: Chain[] }): Wallet[] {
  const { get, on } = useMemo(() => getWallets(), []);

  const [wallets, setWallets] = useState(() => get());

  useEffect(() => {
    const destructors: (() => void)[] = [];

    // FIXME: This can definitely happen, refactor similar to @solana/wallet-standard-wallet-adapter-react.
    // Get and set the wallets that have been registered already, in case they changed since the state initializer.
    setWallets(get());

    destructors.push(on('register', () => setWallets(get())));

    destructors.push(on('unregister', () => setWallets(get())));

    return () => {
      destructors.forEach((destroy) => destroy());
    };
  }, [get, on]);

  return wallets
    .filter(isWagmiCompatibleWallet)
    .map((wallet) => standardWallet({ chains, wallet }));
}

function useDefaultWallets({
  appName,
  chains,
}: {
  appName: string;
  chains: Chain[];
}): {
  connectors: [] | ReturnType<typeof connectorsForWallets>;
  wallets: WalletList;
} {
  const nonStandardWallets = useNonStandardWallets({ appName, chains });

  const standardWallets = useStandardWallets({ chains });

  // Wait for the `standardWallets` to be defined to pass all connectors to `createClient` just once.
  if (!standardWallets.length)
    return {
      connectors: [],
      wallets: [],
    };

  const wallets: WalletList = [
    {
      groupName: 'Popular',
      // TODO: Dedup.
      wallets: [...nonStandardWallets, ...standardWallets],
    },
  ];

  return {
    connectors: connectorsForWallets(wallets),
    wallets,
  };
}

export default useDefaultWallets;
