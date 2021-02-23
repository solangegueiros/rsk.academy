export const getContract = (abi, chainId, web3, _address) => {
  let address = _address?.toLowerCase()

  if (!_address) address = abi.networks[chainId]?.address.toLowerCase()

  const contract = new web3.eth.Contract(abi.abi, address)

  return { contract, address, abi }
}
