/* eslint-disable no-negated-condition */
import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'

import { getRPCUrl } from '@/config/getConfig'
import { SUPPORTED_CHAINS } from '@/constants/supported-chains'

export const rLogin =
  typeof window !== 'undefined'
    ? new RLogin({
        cachedProvider: false,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: getRPCUrl(1),
                3: getRPCUrl(3),
                4: getRPCUrl(4),
                5: getRPCUrl(5),
                30: getRPCUrl(30),
                31: getRPCUrl(31),
                42: getRPCUrl(42),
                5777: getRPCUrl(5777),
              },
            },
          },
        },
        // supportedChains: [1, 3, 4, 5, 30, 31, 42, 5777],
        supportedChains: SUPPORTED_CHAINS,
      })
    : {}

export const clearRloginStorage = () => {
  localStorage.removeItem('RLOGIN_ACCESS_TOKEN')
  localStorage.removeItem('RLOGIN_REFRESH_TOKEN')
  localStorage.removeItem('walletconnect')

  Object.keys(localStorage).forEach(key => {
    if (
      key.startsWith('DV_ACCESS_TOKEN') ||
      key.startsWith('DV_REFRESH_TOKEN')
    ) {
      localStorage.removeItem(key)
    }
  })
}
