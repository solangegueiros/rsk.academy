import { initialState } from './state'

export const reducers = {
  loadAdmin: (state, { payload }) => {
    const { students, nameList } = payload

    state.students = students
    state.nameList = nameList
  },
  resetAdmin: () => initialState,
}
