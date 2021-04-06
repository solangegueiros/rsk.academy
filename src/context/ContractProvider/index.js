import PropTypes from 'prop-types'
import { createContext, useCallback, useReducer } from 'react'
import {
  AcademyClassAbi,
  AcademyClassListAbi,
  AcademyProjectListAbi,
  AcademyStudentsAbi,
  AcademyWalletAbi,
  MasterNameAbi,
  MasterQuoteAbi,
  StudentPortfolioAbi,
} from '@/contracts/index'
import { useSelector } from 'react-redux'

const ABIS = [
  AcademyClassAbi,
  AcademyClassListAbi,
  AcademyProjectListAbi,
  AcademyStudentsAbi,
  AcademyWalletAbi,
  MasterNameAbi,
  MasterQuoteAbi,
  StudentPortfolioAbi,
]

const initialContracts = ABIS.reduce((obj, { abi, contractName, networks }) => {
  obj[contractName] = {
    abi,
    name: contractName,
    deployedNetworks: Object.keys(networks),
    isDeployedOnCurrentNetwork: null,
    address: null,
    contract: null,
    isLoading: false,
    isError: false,
  }
  return obj
}, {})

const contractReducer = (
  state,
  { type, payload: { abi, contract, address, chainId } },
) => {
  switch (type) {
    case abi.contractName:
      return {
        ...state,
        [abi.contractName]: {
          abi: abi.abi,
          name: abi.contractName,
          deployedNetworks: Object.keys(abi.networks),
          isDeployedOnCurrentNetwork: Object.keys(abi.networks).includes(
            chainId?.toString(),
          ),
          address,
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

export const ContractContext = createContext()

export const ContractProvider = ({ children }) => {
  const { chainId } = useSelector(state => state.identity)
  const [contractState, dispatch] = useReducer(
    contractReducer,
    initialContracts,
  )

  const loadContract = useCallback(
    ({ abi, contract, address }) =>
      dispatch({
        type: abi.contractName,
        payload: { abi, contract, address, chainId },
      }),
    [chainId],
  )

  const contractActions = {
    loadContract,
    resetContracts: () => dispatch({ type: 'RESET' }),
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
