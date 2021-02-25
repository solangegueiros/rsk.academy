import { SUPPORTED_CHAINS } from '@/constants/constants'

export const initialState = {
  account: '',
  isAdmin: false,
  chainId: null,
  error: null,
  isUnsupportedChainError: false,
  supportedChains: SUPPORTED_CHAINS,
}
