import { getRandom } from '@/utils/getRandom'
import { initialState } from './state'
import { quizSlice } from './slice'

export const {
  answerQuestion,
  randomizeQuestions,
  setNextQuestion,
  setPreviousQuestion,
  pendingAnswers,
  finalizeAnswers,
  errorAnswers,
} = quizSlice.actions

export const randomize = ({
  course,
  module,
  numberOfQuestions = 10,
}) => dispatch => {
  const { questions } = initialState
  const randomQuestions = getRandom(
    questions[course][module],
    numberOfQuestions,
  )
  dispatch(randomizeQuestions({ course, module, questions: randomQuestions }))
}
