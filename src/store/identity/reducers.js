import { initialState } from './state'

export const reducers = {
  changeAccount: (state, { payload: { address } }) => {
    state.address = address
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
