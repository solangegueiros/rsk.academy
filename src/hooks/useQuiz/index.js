import { useDispatch, useSelector } from 'react-redux'
import {
  randomize,
  setNextQuestion,
  setPreviousQuestion,
} from '@/store/quiz/actions'

export const useQuiz = (course, module, numberOfQuestions) => {
  const dispatch = useDispatch()
  const { randomQuestions, answers } = useSelector(state => state.quiz)
  const { questions, currentIndex } = randomQuestions[course][module]
  const userAnswers = answers[course][module]

  const setNext = () => dispatch(setNextQuestion({ course, module }))
  const setPrevious = () => dispatch(setPreviousQuestion({ course, module }))

  const start = () => {
    if (!questions) dispatch(randomize({ course, module, numberOfQuestions }))
  }

  return {
    questions,
    currentIndex,
    setNext,
    setPrevious,
    start,
    userAnswers: userAnswers?.result,
    isCompleted: userAnswers?.isCompleted,
  }
}
