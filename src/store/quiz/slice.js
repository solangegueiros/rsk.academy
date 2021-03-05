import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { initialState } from './state'

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers,
})
