import { isValidChecksumAddress } from '@rsksmart/rsk-utils/dist/addresses'

export function isAddress(value) {
  try {
    return isValidChecksumAddress(value) //return getAddress(value)
  } catch {
    return false
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address, chars = 2) {
  if (!isAddress) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}
