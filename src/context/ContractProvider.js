import PropTypes from 'prop-types'
import { createContext, useReducer } from 'react'
import {
  AcademyClassAbi,
  AcademyClassListAbi,
  AcademyProjectListAbi,
  AcademyStudentsAbi,
  AcademyWalletAbi,
  MasterNameAbi,
  MasterQuoteAbi,
  NameAbi,
  QuoteAbi,
  StudentPortfolioAbi,
} from '@/contracts/index'

const ABIS = [
  AcademyClassAbi,
  AcademyClassListAbi,
  AcademyProjectListAbi,
  AcademyStudentsAbi,
  AcademyWalletAbi,
  MasterNameAbi,
  MasterQuoteAbi,
  NameAbi,
  QuoteAbi,
  StudentPortfolioAbi,
]

const initialContracts = ABIS.reduce((obj, { abi, contractName, networks }) => {
  obj[contractName] = {
    abi,
    name: contractName,
    deployedNetworks: Object.keys(networks),
    address: null,
    contract: null,
    isLoading: false,
    isError: false,
  }
  return obj
}, {})

const contractReducer = (
  state,
  { type, payload: { abi, contract, address } },
) => {
  switch (type) {
    case abi.contractName:
      return {
        ...state,
        [abi.contractName]: {
          abi: abi.abi,
          name: abi.contractName,
          deployedNetworks: Object.keys(abi.networks),
          address,
          contract,
          isLoading: false,
          isError: false,
        },
      }
    default:
      return state
  }
}

export const ContractContext = createContext()

export const ContractProvider = ({ children }) => {
  const [contractState, dispatch] = useReducer(
    contractReducer,
    initialContracts,
  )

  const contractActions = {
    loadContract: ({ abi, contract, address }) =>
      dispatch({ type: abi.contractName, payload: { abi, contract, address } }),
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

ContractProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
