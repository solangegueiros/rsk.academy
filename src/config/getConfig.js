/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import Ethereum from './config.ethereum.json'
import Ropsten from './config.ropsten.json'
import Mainnet from './config.mainnet.json'
import Testnet from './config.testnet.json'
import Kovan from './config.kovan.json'
import Rinkeby from './config.rinkeby.json'
import Goerli from './config.goerli.json'
import Local from './config.local.json'

export const SETTINGS = {
  ETHR_DID_CONTRACT: 'ethrDid',
  RPC_URL: 'rpcUrl',
}

const getSetting = (chainId, setting) => {
  switch (chainId) {
    case 1:
      return Ethereum[setting]
    case 3:
      return Ropsten[setting]
    case 4:
      return Rinkeby[setting]
    case 5:
      return Goerli[setting]
    case 30:
      return Mainnet[setting]
    case 31:
      return Testnet[setting]
    case 42:
      return Kovan[setting]
    default:
      return Local[setting]
  }
}

export const getDIDRegistryAddress = chainId =>
  getSetting(chainId, SETTINGS.ETHR_DID_CONTRACT)
export const getRPCUrl = chainId => getSetting(chainId, SETTINGS.RPC_URL)
