import { SUPPORTED_CHAINS } from '@/constants/constants'

export const initialState = {
  account: '',
  chainId: null,
  error: null,
  isUnsupportedChainError: false,
  supportedChains: SUPPORTED_CHAINS,
}
