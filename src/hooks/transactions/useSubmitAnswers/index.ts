import { useContext } from 'react'

import { toBN } from 'web3-utils'

import { ContractContext } from '@context/ContractProvider'
import { useQuiz } from '@hooks/useQuiz'
import { useAppDispatch, useAppSelector } from '@store'
import { saveQuizResult } from '@store/profile/slice'
import { CourseType, finalizeAnswers, ModuleType, pendingAnswers } from '@store/quiz/slice'

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
  const { userAnswers = {} } = useQuiz(course, module, numberOfQuestions)
  const { account } = useAppSelector(state => state.identity)
  const quizName = `${course}-${module}`

  const numberOfCorrectAnswers = Object.entries(userAnswers).filter(answers => answers[1].isCorrect).length

  const totalQuestions = toBN(numberOfQuestions)
  const correctAnswers = toBN(numberOfCorrectAnswers)

  const { exec, isError, isLoading } = useTransactionCallback({
    name: `Submit Answers ${quizName}`,
    from: account,
    method: AcademyClass.contract?.methods.addQuizAnswer,
    args: [quizName, stringifyAnswers(userAnswers, quizName), totalQuestions, correctAnswers],
  })

  const submitAnswers = async () => {
    dispatch(pendingAnswers({ course, module }))
    await exec()

    const result = await AcademyStudentQuiz.contract?.methods.getStudentQuiz(account, quizName).call()

    const { total, grade, attempt, quiz, answer } = result

    dispatch(
      saveQuizResult({
        quizName,
        result: { total, grade, attempt, quiz, answer },
      }),
    )
    dispatch(finalizeAnswers({ course, module }))
  }

  return { submitAnswers, isLoading, isError }
}
