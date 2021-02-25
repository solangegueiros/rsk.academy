import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { initialState } from './state'

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers,
})
