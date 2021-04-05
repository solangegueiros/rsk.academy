import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toBN } from 'web3-utils'

import { useQuiz } from '@/hooks/useQuiz'
import { ContractContext } from '@/context/ContractProvider'
import { loadQuizResult } from '@/store/profile/actions'
import { finalizeAnswers, pendingAnswers } from '@/store/quiz/actions'
import { useTransactionCallback } from '../useTransactionCallback'

export const useSubmitAnswers = (course, module, numberOfQuestions) => {
  const { AcademyClass, AcademyStudentQuiz } = useContext(ContractContext)
  const dispatch = useDispatch()
  const { userAnswers = {} } = useQuiz(course, module, numberOfQuestions)
  const { account } = useSelector(state => state.identity)
  const quizName = `${course}-${module}`

  const numberOfCorrectAnswers = Object.entries(userAnswers).filter(
    ([_, { isCorrect }]) => isCorrect,
  ).length

  const totalQuestions = toBN(numberOfQuestions)
  const correctAnswers = toBN(numberOfCorrectAnswers)

  const { exec, isError, isLoading } = useTransactionCallback({
    name: `Submit Answers ${quizName}`,
    from: account,
    method: AcademyClass.contract?.methods.addQuizAnswer,
    args: [quizName, userAnswers, totalQuestions, correctAnswers],
  })

  const submitAnswers = async () => {
    dispatch(pendingAnswers({ course, module }))
    await exec()

    const result = await AcademyStudentQuiz.contract?.methods
      .getStudentQuiz(account, quizName)
      .call()

    const { total, grade, attempt, quiz, answer } = result

    dispatch(
      loadQuizResult({
        quizName,
        result: { total, grade, attempt, quiz, answer },
      }),
    )
    dispatch(finalizeAnswers({ course, module }))
  }

  return { submitAnswers, isLoading, isError }
}
