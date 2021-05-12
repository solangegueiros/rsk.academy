import { AnyAction, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { identitySlice } from './identity/slice'
import { profileSlice } from './profile/slice'
import { adminSlice } from './admin/slice'
import { quizSlice } from './quiz/slice'
import { transactionSlice } from './transaction/slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'react'

const store = configureStore({
  middleware: [thunk],
  devTools: process.env.NODE_ENV === 'development',
  reducer: {
    identity: identitySlice.reducer,
    profile: profileSlice.reducer,
    admin: adminSlice.reducer,
    quiz: quizSlice.reducer,
    transaction: transactionSlice.reducer,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): Dispatch<AnyAction> => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
