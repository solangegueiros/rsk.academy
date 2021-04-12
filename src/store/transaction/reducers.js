import { initialState } from './state'

const now = () => new Date().getTime()

const isClient = typeof window !== 'undefined'

const addTsx = (arr = [], args) => {
  if (arr.length === 0) {
    return [{ ...args, time: now() }]
  } else {
    return [{ ...args, time: now() }, ...arr]
  }
}

const removePending = (arr = [], hash) =>
  arr.filter(item => !(item?.type === 'pending' && item?.hash === hash))

export const reducers = {
  resetTransaction: (state, { payload: { account } }) => {
    const currentTsxStr = window.localStorage.getItem('transactions')
    const currentTsx = JSON.parse(currentTsxStr) || {}

    if (currentTsx) {
      delete currentTsx[account]
      window.localStorage.setItem('transactions', JSON.stringify(currentTsx))
    }

    state = initialState
  },
  addTransaction: (state, { payload: { account, name, hash, type } }) => {
    let currentTsx = {}
    if (isClient) {
      const currentTsxStr = window.localStorage.getItem('transactions')
      currentTsx = JSON.parse(currentTsxStr) || {}
      currentTsx[account] = addTsx(currentTsx[account], { name, hash, type })
      window.localStorage.setItem('transactions', JSON.stringify(currentTsx))
    }

    state.transactions[account] = addTsx(state.transactions[account], {
      name,
      hash,
      type,
    })

    if (type === 'confirmed' || type === 'failed') {
      if (isClient) {
        currentTsx[account] = removePending(currentTsx[account], hash)
        window.localStorage.setItem('transactions', JSON.stringify(currentTsx))
      }

      state.transactions[account] = removePending(
        state.transactions[account],
        hash,
      )
    }
  },
}
