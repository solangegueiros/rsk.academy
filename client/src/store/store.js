import { configureStore } from '@reduxjs/toolkit'
import { walletSlice } from './account/slice'

export default configureStore({
  reducer: {
    wallet: walletSlice.reducer,
  },
})
