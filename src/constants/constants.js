export const SUPPORTED_CHAINS = [30, 31, 5777, 1337]

const ChainId = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
  RSK_MAINNET: 30,
  RSK_TESTNET: 31,
  TRUFFLE_DEVELOP: 5777,
  GANACHE_CLI: 1337,
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
  [ChainId.GANACHE_CLI]: 'Ganache-Cli', //ganache-cli -i 1337 -m "your mnemonic"
}

const adminAccount = {
  development: '0x2cf88b0D4b5C441941a743C5E8D184615b4DC075',
  production: '0xC2725b31bc77146eDb07b34DaD734a38D2A68277',
}
export const ADMIN = adminAccount[process.env.NODE_ENV]

const courses = {
  development: {
    Developer: '0xe9c79c9226e2cD36C09b1404825B7381240311bA',
    Business: '0x406657dC292E080f4c919b573f4A774773860adb',
  },
  production: {
    Developer: '0x770a1B1eC8523F98Fe32229b3011cb7A520886bC',
    Business: '0xD2a26e354c3109FAF8F01542362ce5E25C778ad7',
  },
}
export const COURSES = courses[process.env.NODE_ENV]

const contracts = {
  development: {
    AcademyClassList: '0xB2510CC85f359BAA45B4af24442E339B80450B64',
    AcademyProjectList: '0x93B6D036e593f3c31C4c8b123c581F776524233b',
    AcademyStudentQuiz: '0x9C092457403Ce334cCDd14dC136A046F434f7EaC',
    AcademyStudents: '0x8B61659F5166B7E290cEbB1c9ae61b8C81D4850E',
    AcademyWallet: '0x9DADdE7DDF79BF2e69A7Ed35DBC74141144d6B1C',
    MasterName: '0x794247ADa39C572f6756118B9c1Df88860b96cFE',
  },
  production: {},
}
export const CONTRACTS = contracts[process.env.NODE_ENV]
