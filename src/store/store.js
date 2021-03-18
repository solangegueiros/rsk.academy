import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { identitySlice } from './identity/slice'
import { profileSlice } from './profile/slice'
import { adminSlice } from './admin/slice'
import { quizSlice } from './quiz/slice'
import { transactionSlice } from './transaction/slice'

export default configureStore({
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
