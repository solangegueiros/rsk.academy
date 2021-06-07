import { useContext, useEffect } from 'react'

import { ContractContext } from '@context/ContractProvider'
import { useQuiz } from '@hooks/useQuiz'
import { useAppDispatch, useAppSelector } from '@store'
import { saveQuizResult } from '@store/profile/slice'
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
  const { AcademyClass, AcademyStudentQuiz } = useContext(ContractContext)
  const dispatch = useAppDispatch()
  const { account } = useAppSelector(state => state.identity)
  const { userAnswers = {} } = useQuiz(course, module, numberOfQuestions)
  const quizName = `${course}-${module}`

  const numberOfCorrectAnswers = Object.entries(userAnswers).filter(answers => answers[1].isCorrect).length

  const totalQuestions = numberOfQuestions
  const correctAnswers = numberOfCorrectAnswers

  const { execute, isError, isLoading, receipt } = useTransactionCallback(`Submit ${quizName} Quiz`)

  useEffect(() => {
    if (receipt) {
      AcademyStudentQuiz.contract['getStudentQuiz(address,string)'](account, quizName).then(result => {
        const { total, grade, attempt, quiz, answer } = result

        dispatch(
          saveQuizResult({
            quizName,
            result: { total, grade, attempt, quiz, answer },
          }),
        )
        dispatch(resetQuizAnswers({ course, module }))
      })
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
