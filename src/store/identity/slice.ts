import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ADMIN_ACCOUNTS } from '@constants'

export type IdentityStateType = {
  account: string
  isAdmin: boolean
  chainId: number
  error: Error
}

export const initialIdentityState: IdentityStateType = {
  account: null,
  isAdmin: false,
  chainId: null,
  error: null,
}

export const identityReducers = {
  login: (
    state: IdentityStateType,
    { payload: { account, chainId } }: PayloadAction<{ account: string; chainId: number }>,
  ): void => {
    state.account = account.toLowerCase()
    state.chainId = chainId
  },
  changeAccount: (state: IdentityStateType, { payload: { account } }: PayloadAction<{ account: string }>): void => {
    state.account = account.toLowerCase()
    state.isAdmin = account.toLowerCase() === ADMIN_ACCOUNTS[state.chainId]?.toLowerCase()
    state.error = null
  },
  changeChainId: (state: IdentityStateType, { payload: { chainId } }: PayloadAction<{ chainId: number }>): void => {
    state.chainId = chainId
    state.error = null
  },
  reset: (): IdentityStateType => ({ ...initialIdentityState }),
  logout: (): IdentityStateType => ({ ...initialIdentityState }),
  setError: (state: IdentityStateType, { payload: { error } }: PayloadAction<{ error: Error }>): void => {
    state.error = error
  },
}

export const identitySlice = createSlice({
  name: 'identity',
  initialState: initialIdentityState,
  reducers: identityReducers,
})

export const { changeAccount, changeChainId, reset, setError, login, logout } = identitySlice.actions
