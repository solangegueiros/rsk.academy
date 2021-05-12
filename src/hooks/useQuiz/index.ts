import { useState } from 'react'
import {
  setNextQuestion,
  setPreviousQuestion,
  CourseType,
  ModuleType,
  QuestionType,
  randomizeQuestions,
} from '@store/quiz/slice'
import { useAppDispatch, useAppSelector } from '@store/store'

type UseQuizReturnType = {
  questions: QuestionType[]
  currentIndex: number
  setNext: () => void
  setPrevious: () => void
  start: () => void
  userAnswers: Record<string, { answer: number; isCorrect: boolean }>
}

export const useQuiz = (course: CourseType, module: ModuleType, numberOfQuestions = 10): UseQuizReturnType => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { randomQuestions, answers } = useAppSelector(state => state.quiz)
  const questions = randomQuestions[course][module].questions
  const currentIndex = randomQuestions[course][module].currentIndex
  const userAnswers = answers[course][module]

  const setNext = () => dispatch(setNextQuestion({ course, module }))
  const setPrevious = () => dispatch(setPreviousQuestion({ course, module }))

  const start = () => {
    if (!initialized) setInitialized(true)

    if (!questions && !initialized) dispatch(randomizeQuestions({ course, module, numberOfQuestions }))
  }

  return {
    questions,
    currentIndex,
    setNext,
    setPrevious,
    start,
    userAnswers: userAnswers?.result,
  }
}
