import {
  login,
  logout,
  changeAccount,
  changeChainId,
  setChainError,
} from '@/store/identity/actions'
import { Web3ProviderContext } from 'context/Web3Provider'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useRLogin = () => {
  const {
    address,
    chainId,
    error,
    isUnsupportedChainError,
    supportedChains,
  } = useSelector(state => state.identity)
  const context = useContext(Web3ProviderContext)
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(!!context?.provider)

  useEffect(() => {
    if (isLoggedIn && chainId) {
      const isSupportedChain = !supportedChains.includes(chainId)
      dispatch(setChainError(isSupportedChain))
    }
  }, [chainId, supportedChains, isLoggedIn])

  useEffect(() => {
    setIsLoggedIn(!!context?.provider)
  }, [context])

  useEffect(() => {
    window.ethereum.on('accountsChanged', accounts => {
      if (isLoggedIn) {
        dispatch(changeAccount({ address: accounts[0] }))
      }
    })
    window.ethereum.on('chainChanged', networkId => {
      dispatch(changeChainId({ chainId: networkId }))
    })
  }, [])

  const activate = () => dispatch(login(context))
  const deactivate = () => dispatch(logout(context))

  return {
    address,
    chainId,
    isUnsupportedChainError,
    activate,
    deactivate,
    isLoggedIn,
    error,
  }
}
