import { SUPPORTED_CHAINS } from '@/constants/supported-chains'

export const initialState = {
  address: '',
  chainId: null,
  error: null,
  isChainError: false,
  supportedChains: SUPPORTED_CHAINS,
}
