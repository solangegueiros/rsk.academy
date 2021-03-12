import { useContext } from 'react'
import { useDispatch } from 'react-redux'

import { useQuiz } from '@/hooks/useQuiz'
import { useWeb3 } from '@/hooks/useWeb3'
import { useRLogin } from '@/hooks/useRLogin'
import { ContractContext } from '@/context/ContractProvider'
import { loadQuizResult } from '../profile/actions'
import { addTransaction } from '../transaction/actions'
import { finalizeAnswers, pendingAnswers } from './actions'

export const useSubmitAnswers = (course, module, numberOfQuestions) => {
  const { AcademyClass, AcademyStudentQuiz } = useContext(ContractContext)
  const dispatch = useDispatch()
  const { userAnswers = {} } = useQuiz(course, module, numberOfQuestions)
  const { account } = useRLogin()
  const web3 = useWeb3()
  const quizName = `${course}-${module}`

  const submitAnswers = () => {
    const numberOfCorrectAnswers = Object.entries(userAnswers).filter(
      ([_, { isCorrect }]) => isCorrect,
    ).length

    const totalQuestions = web3.utils.toBN(numberOfQuestions)
    const correctAnswers = web3.utils.toBN(numberOfCorrectAnswers)
    dispatch(pendingAnswers({ course, module }))
    AcademyClass.contract.methods
      .addQuizAnswer(quizName, userAnswers, totalQuestions, correctAnswers)
      .send({ from: account })
      .on('transactionHash', hash =>
        dispatch(
          addTransaction({
            name: 'Send Answers',
            hash,
            type: 'pending',
          }),
        ),
      )
      .on('receipt', async receipt => {
        dispatch(
          addTransaction({
            name: 'Send Answers',
            hash: receipt.transactionHash,
            type: 'confirmed',
          }),
        )
        const result = await AcademyStudentQuiz.contract.methods
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
      })
      .on('error', error => {
        console.error('Send answer error', error)
        dispatch(addTransaction({ name: 'Send Answers', type: 'error' }))
      })
  }

  return { submitAnswers }
}
