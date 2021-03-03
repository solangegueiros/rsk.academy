import { useDispatch, useSelector } from 'react-redux'
import {
  randomize,
  setNextQuestion,
  setPreviousQuestion,
} from '@/store/quiz/actions'

export const useQuiz = (course, module) => {
  const dispatch = useDispatch()
  const { randomQuestions, answers } = useSelector(state => state.quiz)
  const { questions, currentIndex } = randomQuestions[course][module]
  const { result, isCompleted } = answers[course][module]

  const setNext = () => dispatch(setNextQuestion({ course, module }))
  const setPrevious = () => dispatch(setPreviousQuestion({ course, module }))

  const start = () => {
    if (!questions) dispatch(randomize({ course, module }))
  }

  return {
    questions,
    currentIndex,
    setNext,
    setPrevious,
    start,
    userAnswers: result,
    isCompleted,
  }
}
