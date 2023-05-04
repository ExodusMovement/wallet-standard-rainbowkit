# Wallet Standard Connector Demo

This project is a PoC demonstrating how the [Wallet Standard](https://github.com/wallet-standard/wallet-standard) connector should fit into the
Wagmi and Rainbowkit ecosystem to improve UX for Ethereum users.

Points of interest:

- [A preliminary implementation of the Wallet Standard Wagmi connector](src/tmp/wagmi/connectors/walletStandard.ts)
- [A preliminary implementation of the Wallet Standard "wallet" for Rainbowkit](./src/tmp/rainbowkit/wallets/standardWallet)

## Testing

Please note that the PoC has a [temporary workaround](src/useDefaultWallets.ts#L88) requiring at least
one wallet to be registered in the Standard compatible way
(otherwise the Wagmi Client will be not instantiated and the connection button will not appear).
In order to inject a wallet in the Standard compatible way you should either:

1. Download Exodus wallet from the Chrome store: [link](https://chrome.google.com/webstore/detail/exodus-web3-wallet/aholpfdialjgjfhomihkjbmgjidlcdno).
   No additional action required as Exodus already registers itself as a Standard Ethereum Wallet.
2. If you have any EIP-1193 compatible wallet installed, you can register it as a Standard Wallet with the following code: [Github gist](https://gist.github.com/bulgakovk/653b6dc94e5523621b41d53687e7122d).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
