import { Chain, getDefaultWallets } from '@rainbow-me/rainbowkit';

function useDefaultWallets({
  appName,
  chains,
}: {
  appName: string;
  chains: Chain[];
}): ReturnType<typeof getDefaultWallets> {
  return getDefaultWallets({ appName, chains });
};

export default useDefaultWallets;
