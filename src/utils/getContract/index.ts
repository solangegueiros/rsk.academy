import { Signer } from '@ethersproject/abstract-signer'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { getChecksumAddress } from '@thinkanddev/rskswap-sdk'

// account is not optional
export function getSigner(library: Web3Provider, account: string): Signer {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Signer | Web3Provider {
  return account ? getSigner(library, account) : library
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: string): string | false {
  try {
    return getChecksumAddress(value) // return getAddress(value)
  } catch {
    return false
  }
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account))
}
