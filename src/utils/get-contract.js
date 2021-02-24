export const getContract = (contractAbi, chainId, web3, dependedAddress) => {
  const abi = contractAbi
  // If contract address depends on an external address
  const address =
    dependedAddress?.toLowerCase() ||
    abi.networks[chainId]?.address.toLowerCase()

  if (address) {
    // Extend abi networks with depended address
    abi.networks[chainId] = { address }
  }

  const contract = new web3.eth.Contract(abi.abi, address)

  return { contract, address, abi }
}
