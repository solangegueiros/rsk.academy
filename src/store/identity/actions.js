import { clearRloginStorage, rLogin } from '@/connectors/rLogin'
import { getAccountAndNetwork } from '@/utils/ethrpc'
import { identitySlice } from './slice'

export const {
  changeAccount,
  changeChainId,
  reset,
  setError,
  checkChainError,
} = identitySlice.actions

export const login = context => async dispatch => {
  try {
    const provider = await rLogin.connect()
    context.setProvider(provider)

    const [address, chainId] = await getAccountAndNetwork(provider)

    dispatch(changeAccount({ address }))
    dispatch(changeChainId({ chainId: parseInt(chainId) }))
  } catch (err) {
    console.error('rLogin Error', err)
    dispatch(setError({ error: err || null }))
  }
}

export const logout = context => dispatch => {
  clearRloginStorage()
  context?.reset()
  dispatch(reset())
}
