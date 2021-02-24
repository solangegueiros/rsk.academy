import { useContext, useEffect, useRef } from 'react'
import Web3 from 'web3'

import { Web3ProviderContext } from '@/context/Web3Provider'

export const useWeb3 = () => {
  const { provider } = useContext(Web3ProviderContext)
  const web3Ref = useRef(new Web3(provider))

  useEffect(() => {
    web3Ref.current = new Web3(provider)
  }, [provider])

  return web3Ref.current
}
