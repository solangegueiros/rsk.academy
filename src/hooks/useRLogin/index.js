/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { login, logout, setChainError } from '@/store/identity/actions'
import { Web3ProviderContext } from '@/context/Web3Provider'
import { resetProfile } from '@/store/profile/actions'
import { resetAdmin } from '@/store/admin/actions'
import { useLoadSmartContracts } from '../useLoadContracts'

export const useRLogin = () => {
  const {
    account,
    chainId,
    isAdmin,
    error,
    isUnsupportedChainError,
    supportedChains,
  } = useSelector(state => state.identity)
  const web3Context = useContext(Web3ProviderContext)
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(!!web3Context?.provider)
  const { loadContracts } = useLoadSmartContracts()

  useEffect(() => {
    setIsLoggedIn(!!web3Context?.provider)
  }, [web3Context])

  useEffect(() => {
    if (account && chainId) {
      const isSupportedChain = !supportedChains.includes(chainId)
      dispatch(setChainError(isSupportedChain))
    }

    loadContracts()
  }, [account, chainId, isLoggedIn])

  const activate = () => dispatch(login(web3Context))

  const deactivate = () => {
    dispatch(logout(web3Context))
    dispatch(resetProfile())
    dispatch(resetAdmin())
  }

  return {
    account,
    chainId,
    isAdmin,
    isUnsupportedChainError,
    activate,
    deactivate,
    isLoggedIn,
    error,
  }
}
