import { ADMIN_ACCOUNTS } from '@/constants/constants'
import { initialState } from './state'

export const reducers = {
  changeAccount: (state, { payload: { account } }) => {
    state.account = account.toLowerCase()
    state.isAdmin =
      account.toLowerCase() === ADMIN_ACCOUNTS[state.chainId]?.toLowerCase()
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
}
