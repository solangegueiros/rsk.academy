let storage = {}

if (typeof window !== 'undefined') {
  const transactionStr = window.localStorage.getItem('transactions')
  storage = JSON.parse(transactionStr) || {}
}

export const initialState = {
  transactions: storage,
}
