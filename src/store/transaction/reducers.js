import { initialState } from './state'

const now = () => new Date().getTime()

export const reducers = {
  resetTransactions: () => initialState,
  addTransaction: (state, { payload: { name, hash, type } }) => {
    state.transactions.unshift({ name, hash, type, time: now() })
    if (type === 'confirmed') {
      state.transactions = state.transactions.filter(
        tsx => !(tsx.type === 'pending' && tsx.hash === hash),
      )
    }
  },
}
