/* eslint-disable no-unused-vars */
import Web3 from 'web3'

export const getNetwork = async provider => {
  const web3 = new Web3(provider)
  const chainId = await web3.eth.getChainId()
  return chainId
}

export const getAccounts = async provider => {
  const web3 = new Web3(provider)
  const accounts = await web3.eth.getAccounts()
  return accounts
}

export const getAccountAndNetwork = async provider => {
  const accounts = await getAccounts(provider)
  const chainId = await getNetwork(provider)

  return [accounts[0], chainId]
}

export const transactionListener = (provider, tx, userCallback) => {
  const web3 = new Web3(provider)

  const checkInterval = setInterval(async () => {
    try {
      const response = await web3.eth.getTransactionReceipt(tx)

      if (!response) return

      clearInterval(checkInterval)
      userCallback({
        result: response.transactionHash,
        error:
          (parseInt(response.status) !== 1 && 'Transaction Receipt Failed') ||
          null,
      })
    } catch (error) {
      userCallback({ error: error.message })
    }
  }, 2000)
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
