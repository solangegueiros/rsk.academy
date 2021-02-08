import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { identitySlice } from './identity/slice'

export default configureStore({
  middleware: [thunk],
  devTools: true,
  reducer: {
    identity: identitySlice.reducer,
  },
})
