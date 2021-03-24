export const SUPPORTED_CHAINS = [1, 30, 31, 5777]

export const ChainId = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
  RSK_MAINNET: 30,
  RSK_TESTNET: 31,
}

export const NETWORK_LABELS = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GOERLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.RSK_MAINNET]: null,
  [ChainId.RSK_TESTNET]: 'Testnet',
}

export const adminAccount =
  process.env.NEXT_PUBLIC_ADMIN_ACCOUNT ||
  '0xC2725b31bc77146eDb07b34DaD734a38D2A68277'

export const COURSES = {
  Developer: '0x770a1B1eC8523F98Fe32229b3011cb7A520886bC',
  Business: '0xD2a26e354c3109FAF8F01542362ce5E25C778ad7',
}
