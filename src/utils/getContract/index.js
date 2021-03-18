import Contract from 'web3-eth-contract'

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
    abi.networks[chainId]?.address.toLowerCase()

  if (address) {
    // Extend abi networks with depended address
    abi.networks[chainId] = { address }
  }

  const contract = new Contract(abi.abi, address)

  return { contract, address, abi }
}
