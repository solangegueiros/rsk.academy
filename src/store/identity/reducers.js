import { adminAccount } from '@/constants/constants'
import { initialState } from './state'

export const reducers = {
  changeAccount: (state, { payload: { account } }) => {
    state.account = account.toLowerCase()
    state.isAdmin = account === adminAccount
    state.error = null
  },
  changeChainId: (state, { payload: { chainId } }) => {
    state.chainId = parseInt(chainId)
    state.error = null
  },
  reset: () => ({ ...initialState }),
  setError: (state, { payload: { error } }) => {
    state.error = error
  },
  setChainError: (state, { payload }) => {
    state.isUnsupportedChainError = payload
  },
}
