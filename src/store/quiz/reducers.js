export const reducers = {
  answerQuestion: (state, { payload: { course, module, id, answer } }) => {
    if (Object.keys(state.answers[course][module]).length - 1 >= 10)
      return state

    const question = state.questions[course][module].find(q => q.id === id)
    const isCorrect = answer === question.correct_answer

    state.answers[course][module].result[id] = {
      answer,
      isCorrect,
    }
  },
  pendingAnswers: (state, { payload: { course, module } }) => {
    state.answers[course][module].isLoading = true
  },
  finalizeAnswers: (state, { payload: { course, module } }) => {
    state.answers[course][module].isLoading = false
    state.answers[course][module].isError = false
    state.answers[course][module].result = {}
  },
  errorAnswers: (state, { payload: { course, module } }) => {
    state.answers[course][module].isLoading = false
    state.answers[course][module].isError = true
  },
  randomizeQuestions: (state, { payload: { course, module, questions } }) => {
    state.randomQuestions[course][module].questions = questions
  },
  setNextQuestion: (state, { payload: { course, module } }) => {
    if (state.randomQuestions[course][module].currentIndex < 9) {
      state.randomQuestions[course][module].currentIndex =
        state.randomQuestions[course][module].currentIndex + 1
    }
  },
  setPreviousQuestion: (state, { payload: { course, module } }) => {
    if (state.randomQuestions[course][module].currentIndex > 0) {
      state.randomQuestions[course][module].currentIndex =
        state.randomQuestions[course][module].currentIndex - 1
    }
  },
}
