import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'

import { CONTRACT_ADDRESSES } from '@constants/constants'

export type ContractAbiType = {
  contractName: string
  networks: Record<number, { address: string }>
  abi?: AbiItem[]
}

export type LoadedContractType<T> = {
  contract: T
  address: string
  abi: ContractAbiType
}

export const getContract = (
  contractAbi: ContractAbiType,
  chainId: number,
  provider: any,
  dependedAddress?: string,
): LoadedContractType<Contract> => {
  const { contractName, networks, abi } = contractAbi
  const web3 = new Web3(provider)

  // If contract address depends on an external address
  const address =
    dependedAddress?.toLowerCase() ||
    (CONTRACT_ADDRESSES[chainId] && CONTRACT_ADDRESSES[chainId][contractName]?.toLowerCase()) ||
    networks[chainId]?.address.toLowerCase()

  if (address) {
    // Extend abi networks with depended address
    networks[chainId] = { address }
  }

  const contract = new web3.eth.Contract(abi, address)

  return { contract, address, abi: contractAbi }
}
