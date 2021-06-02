import { createContext, ReactNode, useCallback, useReducer } from 'react'

import { useAppSelector } from '@store'
import {
  AcademyClassListType as AcademyClassList,
  AcademyClassType as AcademyClass,
  AcademyProjectListType as AcademyProjectList,
  AcademyStudentQuizType as AcademyStudentQuiz,
  AcademyStudentsType as AcademyStudents,
  AcademyWalletType as AcademyWallet,
  MasterNameType as MasterName,
  StudentPortfolioType as StudentPortfolio,
  AcademyClassDevType as Developer,
  AcademyClassBusinessType as Business,
} from '@type_chain'

export type ContractFactoryType =
  | AcademyClassList
  | AcademyClass
  | AcademyProjectList
  | AcademyStudentQuiz
  | AcademyStudents
  | AcademyWallet
  | MasterName
  | StudentPortfolio
  | Developer
  | Business

export type ContractNameType =
  | 'AcademyClassList'
  | 'AcademyClass'
  | 'AcademyProjectList'
  | 'AcademyStudentQuiz'
  | 'AcademyStudents'
  | 'AcademyWallet'
  | 'MasterName'
  | 'StudentPortfolio'
  | 'Developer'
  | 'Business'

type AllContractsType = {
  AcademyClassList: {
    name: 'AcademyClassList'
    contract: AcademyClassList
  }
  AcademyClass: {
    name: 'AcademyClass'
    contract: AcademyClass
  }
  AcademyProjectList: {
    name: 'AcademyProjectList'
    contract: AcademyProjectList
  }
  AcademyStudentQuiz: {
    name: 'AcademyStudentQuiz'
    contract: AcademyStudentQuiz
  }
  AcademyStudents: {
    name: 'AcademyStudents'
    contract: AcademyStudents
  }
  AcademyWallet: {
    name: 'AcademyWallet'
    contract: AcademyWallet
  }
  MasterName: {
    name: 'MasterName'
    contract: MasterName
  }
  StudentPortfolio: {
    name: 'StudentPortfolio'
    contract: StudentPortfolio
  }
  Developer: {
    name: 'Developer'
    contract: Developer
  }
  Business: {
    name: 'Business'
    contract: Business
  }
}

export const INITIAL_CONTRACTS: AllContractsType = {
  AcademyClassList: {
    name: 'AcademyClassList',
    contract: null,
  },
  AcademyClass: {
    name: 'AcademyClass',
    contract: null,
  },
  AcademyProjectList: {
    name: 'AcademyProjectList',
    contract: null,
  },
  AcademyStudentQuiz: {
    name: 'AcademyStudentQuiz',
    contract: null,
  },
  AcademyStudents: {
    name: 'AcademyStudents',
    contract: null,
  },
  AcademyWallet: {
    name: 'AcademyWallet',
    contract: null,
  },
  MasterName: {
    name: 'MasterName',
    contract: null,
  },
  StudentPortfolio: {
    name: 'StudentPortfolio',
    contract: null,
  },
  Developer: {
    name: 'Developer',
    contract: null,
  },
  Business: {
    name: 'Business',
    contract: null,
  },
}

type ActionType = { type: ContractNameType | 'RESET'; payload: ContractFactoryType }
type LoadContractType = (name: ContractNameType | 'RESET', contract: ContractFactoryType) => void
export type ContractContextType = {
  allContracts: Array<{ name: ContractNameType; contract: ContractFactoryType }>
  loadContract: LoadContractType
  resetContracts: () => void
} & AllContractsType

const contractReducer = (state: AllContractsType, action: ActionType) => {
  switch (action.type) {
    case action.type:
      return {
        ...state,
        [action.type]: {
          name: action.type,
          contract: action.payload,
        },
      }
    case 'RESET':
      return { ...state }
    default:
      return state
  }
}

export const ContractContext = createContext<ContractContextType>(null)

export const ContractProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { chainId } = useAppSelector(state => state.identity)
  const [contractState, dispatch] = useReducer(contractReducer, INITIAL_CONTRACTS)

  const loadContract = useCallback<LoadContractType>(
    (name, contract) =>
      dispatch({
        type: name,
        payload: contract,
      }),
    [chainId],
  )

  const contractActions = {
    loadContract,
    resetContracts: () => dispatch({ type: 'RESET', payload: null }),
  }

  return (
    <ContractContext.Provider
      value={{
        allContracts: Object.values(contractState),
        ...contractState,
        ...contractActions,
      }}
    >
      {children}
    </ContractContext.Provider>
  )
}
