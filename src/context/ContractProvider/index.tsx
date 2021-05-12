import { createContext, ReactNode, useCallback, useReducer } from 'react'
import {
  AcademyClassListFactory,
  AcademyClassFactory,
  AcademyProjectListFactory,
  AcademyStudentQuizFactory,
  AcademyStudentsFactory,
  AcademyWalletFactory,
  MasterNameFactory,
  StudentPortfolioFactory,
  AcademyClassDevFactory,
  AcademyClassBusinessFactory,
} from '@type_chain'

import { useAppSelector } from '@store/store'

const initialContracts = {
  AcademyClassList: {
    name: 'AcademyClassList',
    contract: AcademyClassListFactory,
    isLoading: false,
    isError: false,
  },
  AcademyClass: {
    name: 'AcademyClass',
    contract: AcademyClassFactory,
    isLoading: false,
    isError: false,
  },
  AcademyProjectList: {
    name: 'AcademyProjectList',
    contract: AcademyProjectListFactory,
    isLoading: false,
    isError: false,
  },
  AcademyStudentQuiz: {
    name: 'AcademyStudentQuiz',
    contract: AcademyStudentQuizFactory,
    isLoading: false,
    isError: false,
  },
  AcademyStudents: {
    name: 'AcademyStudents',
    contract: AcademyStudentsFactory,
    isLoading: false,
    isError: false,
  },
  AcademyWallet: {
    name: 'AcademyWallet',
    contract: AcademyWalletFactory,
    isLoading: false,
    isError: false,
  },
  MasterName: {
    name: 'MasterName',
    contract: MasterNameFactory,
    isLoading: false,
    isError: false,
  },
  StudentPortfolio: {
    name: 'StudentPortfolio',
    contract: StudentPortfolioFactory,
    isLoading: false,
    isError: false,
  },
  Developer: {
    name: 'Developer',
    contract: AcademyClassDevFactory,
    isLoading: false,
    isError: false,
  },
  Business: {
    name: 'Business',
    contract: AcademyClassBusinessFactory,
    isLoading: false,
    isError: false,
  },
}

const contractReducer = (state: typeof initialContracts, { type, payload: contract }) => {
  switch (type) {
    case type:
      return {
        ...state,
        [type]: {
          name: type,
          contract,
          isLoading: false,
          isError: false,
        },
      }
    case 'RESET':
      return { ...state }
    default:
      return state
  }
}

export const ContractContext = createContext(null)

export const ContractProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { chainId } = useAppSelector(state => state.identity)
  const [contractState, dispatch] = useReducer(contractReducer, initialContracts)

  const loadContract = useCallback(
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
