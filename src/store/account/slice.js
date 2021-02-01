import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { initialState } from './state'

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers,
})
