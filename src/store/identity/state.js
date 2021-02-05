import { SUPPORTED_CHAINS } from '@/constants/supported-chains'

export const initialState = {
  address: '',
  chainId: null,
  error: null,
  isUnsupportedChainError: false,
  supportedChains: SUPPORTED_CHAINS,
}
