import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const STORE_KEY = 'transactions'

type TransactionType = {
  name: string
  hash: string
  type: 'pending' | 'confirmed' | 'failed'
  time?: number | Date
}

type TransactionStateType = {
  transactions: Record<string, TransactionType[]>
}

const storage: Record<string, TransactionType[]> =
  typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem(STORE_KEY)) ?? {} : {}
const now = () => new Date().getTime()

export const initialTransactionState: TransactionStateType = {
  transactions: storage,
}

const addTsx = (arr = [], args: TransactionType) => {
  if (arr.length === 0) {
    return [{ ...args, time: now() }]
  } else {
    return [{ ...args, time: now() }, ...arr]
  }
}

const removePending = (arr = [], hash: string) => arr.filter(item => !(item?.type === 'pending' && item?.hash === hash))

export const transactionReducers = {
  resetTransaction: (
    state: TransactionStateType,
    { payload: { account } }: PayloadAction<{ account: string }>,
  ): void => {
    const currentTsxStr = window.localStorage.getItem(STORE_KEY)
    const currentTsx = JSON.parse(currentTsxStr) || {}

    if (currentTsx) {
      delete currentTsx[account]
      window.localStorage.setItem(STORE_KEY, JSON.stringify(currentTsx))
    }

    state.transactions[account] = []
  },
  addTransaction: (
    state: TransactionStateType,
    { payload: { account, name, hash, type } }: PayloadAction<{ account: string } & TransactionType>,
  ): void => {
    const currentTsxStr = window.localStorage.getItem(STORE_KEY)
    const currentTsx = JSON.parse(currentTsxStr) || {}
    currentTsx[account] = addTsx(currentTsx[account], { name, hash, type })
    window.localStorage.setItem(STORE_KEY, JSON.stringify(currentTsx))

    state.transactions[account] = addTsx(state.transactions[account], {
      name,
      hash,
      type,
    })

    if (type === 'confirmed' || type === 'failed') {
      currentTsx[account] = removePending(currentTsx[account], hash)
      window.localStorage.setItem(STORE_KEY, JSON.stringify(currentTsx))

      state.transactions[account] = removePending(state.transactions[account], hash)
    }
  },
}

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: initialTransactionState,
  reducers: transactionReducers,
})

export const { resetTransaction, addTransaction } = transactionSlice.actions
