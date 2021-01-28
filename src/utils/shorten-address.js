import { isValidChecksumAddress } from '@rsksmart/rsk-utils/dist/addresses'

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export const shortenAddress = (address, chars = 2) => {
  if (!isValidChecksumAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}
