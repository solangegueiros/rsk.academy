import { getRandom } from '@/utils/getRandom'
import { initialState } from './state'
import { quizSlice } from './slice'

export const {
  answerQuestion,
  randomizeQuestions,
  setNextQuestion,
  setPreviousQuestion,
  submitQuestions,
} = quizSlice.actions

export const randomize = ({ course, module }) => dispatch => {
  const { questions } = initialState
  const randomQuestions = getRandom(questions[course][module], 10)
  dispatch(randomizeQuestions({ course, module, questions: randomQuestions }))
}
