import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { initialState } from './state'

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers,
})
