import { useContext, useEffect, useRef } from 'react'
import Eth from 'web3-eth'

import { Web3ProviderContext } from '@/context/Web3Provider'

export const useWeb3 = () => {
  const { provider } = useContext(Web3ProviderContext)
  const web3Ref = useRef(new Eth(provider))

  useEffect(() => {
    web3Ref.current = new Eth(provider)
  }, [provider])

  return web3Ref.current
}
