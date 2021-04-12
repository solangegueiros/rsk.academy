import { identitySlice } from './slice'

export const {
  changeAccount,
  changeChainId,
  reset,
  setError,
} = identitySlice.actions

export const login = (account, chainId) => dispatch => {
  try {
    dispatch(changeAccount({ account: account.toLowerCase() }))
    dispatch(changeChainId({ chainId: parseInt(chainId) }))
  } catch (err) {
    console.error('rLogin Error', err)
    dispatch(setError({ error: err }))
  }
}

export const logout = () => dispatch => {
  dispatch(reset())
}
