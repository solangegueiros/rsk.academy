import { initialState } from './state'

export const reducers = {
  changeAccount: (state, { payload: { address } }) => {
    state.address = address
    state.error = null
  },
  changeChainId: (state, { payload: { chainId } }) => {
    state.chainId = chainId
    state.error = null
  },
  reset: _state => initialState,
  setError: (state, { payload: { error } }) => {
    state.error = error
  },
  setChainError: (state, { payload }) => {
    state.isChainError = payload
  },
  checkChainError: state => {
    const isChainError =
      state.chainId && !state.supportedChains.includes(parseInt(state.chainId))
    state.isChainError = isChainError
  },
}
