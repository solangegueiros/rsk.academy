import { initialState } from './state'

export const reducers = {
  loadProfile: (state, { payload }) => {
    const {
      index,
      ownerAddress,
      portfolioAddress,
      activeClassAddress,
      studentClasses,
      portfolioList,
      studentActiveClassName,
      classStudentInfo,
      studentName,
      quizResults,
    } = payload

    state.index = index
    state.ownerAddress = ownerAddress
    state.portfolioAddress = portfolioAddress
    state.activeClassAddress = activeClassAddress
    state.studentClasses = studentClasses
    state.portfolioList = portfolioList
    state.studentActiveClassName = studentActiveClassName
    state.classStudentInfo = classStudentInfo
    state.studentName = studentName
    state.isLoading = false
    state.quizResults = quizResults
  },
  loadQuizResult: (state, { payload: { quizName, result } }) => {
    state.quizResults[quizName] = result
  },
  resetProfile: () => initialState,
  setStudentName: (state, { payload }) => {
    state.studentName = payload
  },
}
