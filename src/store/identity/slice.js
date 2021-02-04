import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { initialState } from './state'

export const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers,
})
