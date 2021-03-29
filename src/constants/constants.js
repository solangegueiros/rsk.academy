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

/*
const adminAccount = {
  development: '0x2cf88b0D4b5C441941a743C5E8D184615b4DC075',
  production: '0xC2725b31bc77146eDb07b34DaD734a38D2A68277',
}
*/
const adminAccount = {
  development: '0xC2725b31bc77146eDb07b34DaD734a38D2A68277',
  production: '0xC2725b31bc77146eDb07b34DaD734a38D2A68277',
}

export const ADMIN = adminAccount[process.env.NODE_ENV]

/*  
  development: {
    Developer: '0xe9c79c9226e2cD36C09b1404825B7381240311bA',
    Business: '0x406657dC292E080f4c919b573f4A774773860adb',
  },
*/
const courses = {
  development: {
    Developer: '0x770a1B1eC8523F98Fe32229b3011cb7A520886bC',
    Business: '0xD2a26e354c3109FAF8F01542362ce5E25C778ad7',
  },
  production: {
    Developer: '0x770a1B1eC8523F98Fe32229b3011cb7A520886bC',
    Business: '0xD2a26e354c3109FAF8F01542362ce5E25C778ad7',
  },
}
export const COURSES = courses[process.env.NODE_ENV]

//Updated everything to production!
const contracts = {
  development: {
    AcademyClassList: '0x6800597b6fF5a423002Ff57e58727902BDDE13A6',
    AcademyProjectList: '0x0D3f8b4d2C659B6402F35cd1a73BB8a4B0864C20',
    AcademyStudentQuiz: '0x7eEA02aBFD8cFaF0c6386970A91936471211f5E0',
    AcademyStudents: '0xc24d44eD3CA8d75342f2135B4F1713b9B9589239',
    AcademyWallet: '0xDA3C24d714f008d0580AE280242381f87E981599',
    MasterName: '0x98A7BeE32B1532F8a8F1ECD72942375C60bc06FF',
  },
  production: {},
}
export const CONTRACTS = contracts[process.env.NODE_ENV]
