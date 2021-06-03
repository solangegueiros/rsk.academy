import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DeployedNetworksType } from '@constants'

export type IdentityStateType = {
  account: string
  isAdmin: boolean
  chainId: DeployedNetworksType
  error: Error
  isLoading: boolean
}

export const initialIdentityState: IdentityStateType = {
  account: null,
  isAdmin: false,
  chainId: null,
  error: null,
  isLoading: false,
}

export const identityReducers = {
  login: (
    state: IdentityStateType,
    { payload: { account, chainId } }: PayloadAction<{ account: string; chainId: DeployedNetworksType }>,
  ): void => {
    state.account = account.toLowerCase()
    state.chainId = chainId
  },
  changeAccount: (state: IdentityStateType, { payload: { account } }: PayloadAction<{ account: string }>): void => {
    state.account = account.toLowerCase()
    state.error = null
  },
  changeChainId: (
    state: IdentityStateType,
    { payload: { chainId } }: PayloadAction<{ chainId: DeployedNetworksType }>,
  ): void => {
    state.chainId = chainId
    state.error = null
  },
  reset: (): IdentityStateType => ({ ...initialIdentityState }),
  logout: (): IdentityStateType => ({ ...initialIdentityState }),
  setError: (state: IdentityStateType, { payload: { error } }: PayloadAction<{ error: Error }>): void => {
    state.error = error
  },
  setLoading: (state: IdentityStateType, { payload }: PayloadAction<boolean>): void => {
    state.isLoading = payload
  },
  setAdmin: (state: IdentityStateType, { payload }: PayloadAction<boolean>): void => {
    state.isAdmin = payload
  },
}

export const identitySlice = createSlice({
  name: 'identity',
  initialState: initialIdentityState,
  reducers: identityReducers,
})

export const {
  changeAccount,
  changeChainId,
  reset,
  setError,
  login,
  logout,
  setLoading,
  setAdmin,
} = identitySlice.actions
