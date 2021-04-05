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

export const DEPLOYED_NETWORKS = { ganache: 1337, testnet: 31 }

export const ADMIN_ACCOUNTS = {
  1337: process.env.NEXT_PUBLIC_LOCAL_ADMIN_ACCOUNT,
  31: process.env.NEXT_PUBLIC_ADMIN_ACCOUNT,
}

export const COURSE_ADDRESSES = {
  1337: {
    Developer: process.env.NEXT_PUBLIC_LOCAL_DEV_CLASS_01,
    Business: process.env.NEXT_PUBLIC_LOCAL_BUSINESS_CLASS_01,
  },
  31: {
    Developer: process.env.NEXT_PUBLIC_DEV_CLASS_01,
    Business: process.env.NEXT_PUBLIC_BUSINESS_CLASS_01,
  },
}

export const CONTRACT_ADDRESSES = {
  31: {
    AcademyClassList: process.env.NEXT_PUBLIC_ACADEMY_CLASS_LIST,
    AcademyProjectList: process.env.NEXT_PUBLIC_ACADEMY_PROJECT_LIST,
    AcademyStudentQuiz: process.env.NEXT_PUBLIC_ACADEMY_STUDENT_QUIZ,
    AcademyStudents: process.env.NEXT_PUBLIC_ACADEMY_STUDENTS,
    AcademyWallet: process.env.NEXT_PUBLIC_ACADEMY_WALLET,
    MasterName: process.env.NEXT_PUBLIC_MASTER_NAME,
    ...COURSE_ADDRESSES[31],
  },
  1337: {
    ...COURSE_ADDRESSES[1337],
  },
}
