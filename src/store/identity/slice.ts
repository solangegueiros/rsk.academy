import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type IdentityStateType = {
  account: string
  domain: string
  isAdmin: boolean
  chainId: number
  error: Error
  isIdentityLoading: boolean
}

export const initialIdentityState: IdentityStateType = {
  account: null,
  domain: null,
  isAdmin: false,
  chainId: null,
  error: null,
  isIdentityLoading: false,
}

export const identityReducers = {
  loginWallet: (
    state: IdentityStateType,
    { payload: { account, chainId } }: PayloadAction<{ account: string; chainId: number }>,
  ): void => {
    state.account = account.toLowerCase()
    state.chainId = chainId
  },
  changeAccount: (state: IdentityStateType, { payload: { account } }: PayloadAction<{ account: string }>): void => {
    state.account = account.toLowerCase()
    state.error = null
  },
  changeChainId: (state: IdentityStateType, { payload: { chainId } }: PayloadAction<{ chainId: number }>): void => {
    state.chainId = chainId
    state.error = null
  },
  changeDomain: (state: IdentityStateType, { payload: { domain } }: PayloadAction<{ domain: string }>): void => {
    state.domain = domain
    state.error = null
  },
  reset: (): IdentityStateType => ({ ...initialIdentityState }),
  logout: (): IdentityStateType => ({ ...initialIdentityState }),
  setError: (state: IdentityStateType, { payload: { error } }: PayloadAction<{ error: Error }>): void => {
    state.error = error
  },
  setIdentityLoading: (state: IdentityStateType, { payload }: PayloadAction<boolean>): void => {
    state.isIdentityLoading = payload
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
  changeDomain,
  reset,
  setError,
  loginWallet,
  logout,
  setIdentityLoading,
  setAdmin,
} = identitySlice.actions
