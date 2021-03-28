export const SUPPORTED_CHAINS = [30, 31]

export const ChainId = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
  RSK_MAINNET: 30,
  RSK_TESTNET: 31,
  TRUFFLE_DEVELOP: 5777,
}

export const NETWORK_LABELS = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GOERLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.RSK_MAINNET]: 'RSK',
  [ChainId.RSK_TESTNET]: 'RSK Testnet',
  [ChainId.TRUFFLE_DEVELOP]: 'Truffle Develop',
}

export const adminAccount =
  process.env.NEXT_PUBLIC_ADMIN_ACCOUNT ||
  '0x2cf88b0D4b5C441941a743C5E8D184615b4DC075'

export const COURSES = {
  Developer: '0xe9c79c9226e2cD36C09b1404825B7381240311bA',
  Business: '0x406657dC292E080f4c919b573f4A774773860adb',
}
