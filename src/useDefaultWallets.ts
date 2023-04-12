// This file is copied with modifications from:
// https://github.com/rainbow-me/rainbowkit/blob/0d5640929326d65673596a11cd018a9c6524ff8c/packages/rainbowkit/src/wallets/getDefaultWallets.ts.

import {
  Chain,
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

function useDefaultWallets({
  appName,
  chains,
}: {
  appName: string;
  chains: Chain[];
}): {
  connectors: ReturnType<typeof connectorsForWallets>;
  wallets: WalletList;
} {
  const wallets: WalletList = [
    {
      groupName: 'Popular',
      wallets: [
        injectedWallet({ chains }),
        safeWallet({ chains }),
        rainbowWallet({ chains }),
        coinbaseWallet({ appName, chains }),
        metaMaskWallet({ chains }),
        walletConnectWallet({ chains }),
        braveWallet({ chains }),
      ],
    },
  ];

  return {
    connectors: connectorsForWallets(wallets),
    wallets,
  };
}

export default useDefaultWallets;
