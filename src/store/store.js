import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { identitySlice } from './identity/slice'
import { profileSlice } from './profile/slice'
import { adminSlice } from './admin/slice'
import { quizSlice } from './quiz/slice'

export default configureStore({
  middleware: [thunk],
  devTools: true,
  reducer: {
    identity: identitySlice.reducer,
    profile: profileSlice.reducer,
    admin: adminSlice.reducer,
    quiz: quizSlice.reducer,
  },
})
