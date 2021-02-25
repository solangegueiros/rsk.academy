import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { initialState } from './state'

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers,
})
