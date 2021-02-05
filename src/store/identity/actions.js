import { clearRloginStorage, rLogin } from '@/connectors/rLogin'
import { getAccountAndNetwork } from '@/utils/web3-rpc'
import { identitySlice } from './slice'

export const {
  changeAccount,
  changeChainId,
  reset,
  setError,
  setChainError,
} = identitySlice.actions

export const login = context => async dispatch => {
  try {
    const provider = await rLogin.connect()
    context.setProvider(provider)

    const [account, chainId] = await getAccountAndNetwork(provider)

    dispatch(changeAccount({ account }))
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
