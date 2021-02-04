/* eslint-disable no-unused-vars */
import Eth from 'ethjs-query'

export const getNetwork = provider => new Eth(provider).net_version()
export const getAccounts = provider => new Eth(provider).accounts()

export const getAccountAndNetwork = provider =>
  Promise.all([
    getAccounts(provider).then(accounts => accounts[0]),
    getNetwork(provider).then(chainId => parseInt(chainId)),
  ])

export const transactionListener = (provider, tx, userCallback) => {
  const eth = new Eth(provider)

  const checkInterval = setInterval(
    () =>
      eth
        .getTransactionReceipt(tx)
        .then(response => {
          if (response) {
            clearInterval(checkInterval)
            return userCallback({
              result: response.transactionHash,
              error:
                parseInt(response.status) !== 1
                  ? 'Transaction Recepit Failed'
                  : null,
            })
          }
        })
        .catch(err => userCallback({ error: err.message })),
    2000,
  )
}

export const PROVIDERS = {
  METAMASK: 'METAMASK',
  NIFTY: 'NIFTY',
  WALLET_CONNECT: 'WALLET_CONNECT',
}

/**
 * Return the Provider Name. Used to detect DataVault features
 * @param provider web3Provider
 */
export const getProviderName = provider => {
  if (provider.isNiftyWallet) {
    return PROVIDERS.NIFTY
  }
  if (provider.isMetaMask) {
    return PROVIDERS.METAMASK
  }
  if (provider.wc) {
    return PROVIDERS.WALLET_CONNECT
  }
}
