import {
  login,
  logout,
  changeAccount,
  changeChainId,
  checkChainError,
} from '@/store/identity/actions'
import { Web3ProviderContext } from 'context/Web3Provider'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useRLogin = () => {
  const { address, chainId, error, isChainError } = useSelector(
    state => state.identity,
  )
  const context = useContext(Web3ProviderContext)
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(!!context?.provider)

  useEffect(() => {
    dispatch(checkChainError())
  }, [chainId, dispatch])

  useEffect(() => {
    setIsLoggedIn(!!context?.provider)
  }, [context])

  useEffect(() => {
    window.ethereum.on('accountsChanged', accounts => {
      dispatch(changeAccount({ address: accounts[0] }))
    })
    window.ethereum.on('networkChanged', networkId => {
      dispatch(changeChainId({ chainId: networkId }))
    })
  }, [])

  const activate = () => dispatch(login(context))
  const deactivate = () => dispatch(logout(context))

  return {
    address,
    chainId,
    isChainError,
    activate,
    deactivate,
    isLoggedIn,
    error,
  }
}
