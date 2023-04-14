// TODO: Migrate to https://github.com/rainbow-me/rainbowkit/tree/main/packages/rainbowkit/src/wallets/walletConnectors.
// @ts-nocheck

import { Chain, Wallet } from '@rainbow-me/rainbowkit';
import type { Wallet as StandardWallet } from '@wallet-standard/base';

import { WalletStandardConnector } from '../../wagmi/connectors/walletStandard';
import type { WalletStandardConnectorOptions } from '../../wagmi/connectors/walletStandard';

export interface StandardWalletOptions {
  wallet: StandardWallet;
  chains: Chain[];
}

export const standardWallet = ({
  wallet,
  chains,
  ...options
}: StandardWalletOptions & WalletStandardConnectorOptions): Wallet => ({
  id: `standard:${wallet.name}`,
  name: wallet.name,
  iconUrl: wallet.icon,
  iconBackground: '#fff',
  installed: true,
  // TODO: Use to dedup.
  hidden: ({ wallets }) => false,
  createConnector: () => {
    const connector = new WalletStandardConnector({
      wallet,
      chains,
      options,
    });

    return {
      connector,
    };
  },
});
