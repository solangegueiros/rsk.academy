import Contract from 'web3-eth-contract'
import { CONTRACTS } from '@/constants/constants'

export const getContract = (
  contractAbi,
  chainId,
  provider,
  dependedAddress,
) => {
  Contract.setProvider(provider)
  const abi = contractAbi
  // If contract address depends on an external address
  const address =
    dependedAddress?.toLowerCase() ||
    CONTRACTS[abi.contractName]?.toLowerCase() ||
    abi.networks[chainId]?.address.toLowerCase()

  if (address) {
    // Extend abi networks with depended address
    abi.networks[chainId] = { address }
  }

  const contract = new Contract(abi.abi, address)

  return { contract, address, abi }
}
