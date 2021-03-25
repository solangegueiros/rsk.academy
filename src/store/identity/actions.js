import { clearRloginStorage, rLogin } from '@/connectors/rLogin'
import { getAccountAndNetwork } from '@/utils/web3Rpc'
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

    provider.on('accountsChanged', accounts => {
      dispatch(changeAccount({ account: accounts[0] }))
    })
    provider.on('chainChanged', id => {
      dispatch(changeChainId({ chainId: id }))
    })
    provider.on('disconnect', () => console.warn(`disconnect`))

    const [account, chainId] = await getAccountAndNetwork(provider)

    dispatch(changeAccount({ account: account.toLowerCase() }))
    dispatch(changeChainId({ chainId: parseInt(chainId) }))
  } catch (err) {
    console.error('rLogin Error', err)
    dispatch(setError({ error: err }))
  }
}

export const logout = context => dispatch => {
  clearRloginStorage()
  context?.reset()
  dispatch(reset())
}
