type ContractNameType =
  | 'AcademyClassList'
  | 'AcademyProjectList'
  | 'AcademyStudentQuiz'
  | 'AcademyStudents'
  | 'AcademyWallet'
  | 'MasterName'
  | 'Developer'
  | 'Business'

export type DeployedNetworksType = 1337 | 31

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

export const NETWORK_LABELS: Record<number, string> = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GOERLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.RSK_MAINNET]: 'RSK',
  [ChainId.RSK_TESTNET]: 'RSK Testnet',
  [ChainId.TRUFFLE_DEVELOP]: 'Truffle Develop',
  [ChainId.GANACHE_CLI]: 'Ganache-Cli', // ganache-cli -i 1337 -m "your mnemonic"
}

export const COURSE_ADDRESSES: Record<DeployedNetworksType, Record<string, string>> = {
  31: {
    Developer: process.env.NEXT_PUBLIC_DEV_CLASS_01,
    Business: process.env.NEXT_PUBLIC_BUSINESS_CLASS_01,
  },
  1337: {
    Developer: process.env.NEXT_PUBLIC_LOCAL_DEV_CLASS_01,
    Business: process.env.NEXT_PUBLIC_LOCAL_BUSINESS_CLASS_01,
  },
}

export const CONTRACT_ADDRESSES: Record<DeployedNetworksType, Record<ContractNameType, string>> = {
  31: {
    AcademyClassList: process.env.NEXT_PUBLIC_ACADEMY_CLASS_LIST,
    AcademyProjectList: process.env.NEXT_PUBLIC_ACADEMY_PROJECT_LIST,
    AcademyStudentQuiz: process.env.NEXT_PUBLIC_ACADEMY_STUDENT_QUIZ,
    AcademyStudents: process.env.NEXT_PUBLIC_ACADEMY_STUDENTS,
    AcademyWallet: process.env.NEXT_PUBLIC_ACADEMY_WALLET,
    MasterName: process.env.NEXT_PUBLIC_MASTER_NAME,
    Developer: COURSE_ADDRESSES[31].Developer,
    Business: COURSE_ADDRESSES[31].Business,
  },
  1337: {
    AcademyWallet: process.env.NEXT_PUBLIC_LOCAL_ACADEMY_WALLET,
    AcademyProjectList: process.env.NEXT_PUBLIC_LOCAL_ACADEMY_PROJECT_LIST,
    AcademyStudents: process.env.NEXT_PUBLIC_LOCAL_ACADEMY_STUDENTS,
    AcademyClassList: process.env.NEXT_PUBLIC_LOCAL_ACADEMY_CLASS_LIST,
    AcademyStudentQuiz: process.env.NEXT_PUBLIC_LOCAL_ACADEMY_STUDENT_QUIZ,
    MasterName: process.env.NEXT_PUBLIC_LOCAL_MASTER_NAME,
    Developer: COURSE_ADDRESSES[1337].Developer,
    Business: COURSE_ADDRESSES[1337].Business,
  },
}

export const SUPPORTED_CHAINS = [30, 31, 1337]
export const DEPLOYED_CHAINS = [31, 1337]
export const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000'
