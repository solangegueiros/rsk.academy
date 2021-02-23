import { initialState } from './state'

export const reducers = {
  loadProfile: (
    state,
    {
      payload: {
        index,
        ownerAddress,
        portfolioAddress,
        activeClassAddress,
        studentClasses,
        portfolioList,
        studentActiveClassName,
        classStudentInfo,
        name,
      },
    },
  ) => {
    state.index = index
    state.ownerAddress = ownerAddress
    state.portfolioAddress = portfolioAddress
    state.activeClassAddress = activeClassAddress
    state.studentClasses = studentClasses
    state.portfolioList = portfolioList
    state.studentActiveClassName = studentActiveClassName
    state.classStudentInfo = classStudentInfo
    state.name = name
    state.isLoading = false
  },
  resetProfile: () => initialState,
}
