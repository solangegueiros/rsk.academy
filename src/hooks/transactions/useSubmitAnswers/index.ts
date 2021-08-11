import { useContext, useEffect } from 'react'

import { ContractContext } from '@context/ContractProvider'
import { useLoadAllContracts } from '@hooks/useLoadAllContracts'
import { useQuiz } from '@hooks/useQuiz'
import { useAppDispatch } from '@store'
import { CourseType, ModuleType, resetQuizAnswers } from '@store/quiz/slice'

import { useTransactionCallback } from '../useTransactionCallback'

const stringifyAnswers = (answers: Record<string, { answer: number; isCorrect: boolean }>, quizName: string) => {
  return Object.entries(answers)
    .map(([id, { answer }]) => {
      const qId = id.replace(`${quizName}-`, '')
      return `${qId} ${answer}`
    })
    .join(';')
}

type UseSubmitAnswersReturnType = {
  submitAnswers: () => Promise<void>
  isLoading: boolean
  isError: boolean
}

export const useSubmitAnswers = (
  course: CourseType,
  module: ModuleType,
  numberOfQuestions: number,
): UseSubmitAnswersReturnType => {
  const { AcademyClass } = useContext(ContractContext)
  const dispatch = useAppDispatch()
  const { userAnswers = {} } = useQuiz(course, module, numberOfQuestions)
  const quizName = `${course}-${module}`
  const { loadAllContracts } = useLoadAllContracts()

  const numberOfCorrectAnswers = Object.entries(userAnswers).filter(answers => answers[1].isCorrect).length

  const totalQuestions = numberOfQuestions
  const correctAnswers = numberOfCorrectAnswers

  const { execute, isError, isLoading, receipt } = useTransactionCallback(`Submit ${quizName} Quiz`)

  useEffect(() => {
    if (receipt) {
      dispatch(resetQuizAnswers({ course, module }))
      loadAllContracts()
    }
  }, [receipt])

  const submitAnswers = async () => {
    execute(() =>
      AcademyClass.contract.addQuizAnswer(
        quizName,
        stringifyAnswers(userAnswers, quizName),
        totalQuestions,
        correctAnswers,
      ),
    )
  }

  return { submitAnswers, isLoading, isError }
}
