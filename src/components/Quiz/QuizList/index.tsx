import { useContext, useEffect } from 'react'

import {
  Box,
  Button,
  Th,
  Tr,
  Table,
  Td,
  Heading,
  Center,
  useColorModeValue,
  Text,
  Alert,
  AlertDescription,
  AlertIcon,
  Spinner,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { CONTRACT_ADDRESSES } from '@constants'
import { Web3Context } from '@context/Web3Provider'
import { useSubmitAnswers } from '@hooks/transactions/useSubmitAnswers'
import { useQuiz } from '@hooks/useQuiz'
import { useAppSelector } from '@store'
import { CourseType, ModuleType } from '@store/quiz/slice'

import { QuizItem } from '../QuizItem'

enum contractName {
  dev = 'Developer',
  business = 'Business',
}
interface QuizListProps {
  course: CourseType
  module: ModuleType
  numberOfQuestions: number
}

export const QuizList = ({ course, module, numberOfQuestions }: QuizListProps): JSX.Element => {
  const { questions, start, userAnswers = {} } = useQuiz(course, module, numberOfQuestions)
  const { studentClasses } = useAppSelector(state => state.profile)
  const { chainId } = useAppSelector(state => state.identity)
  const { quizResults } = useAppSelector(state => state.profile)

  const hasSubscribed = studentClasses?.includes(
    CONTRACT_ADDRESSES[chainId] && CONTRACT_ADDRESSES[chainId][contractName[course]],
  )

  const QUIZ_NAME = `${course}-${module}`
  const numberOfAnswers = Object.keys(userAnswers)?.length || 0
  const color = useColorModeValue('primary.500', 'light.500')

  const { submitAnswers, isLoading } = useSubmitAnswers(course, module, numberOfQuestions)

  const { isLoggedIn } = useContext(Web3Context)
  const { t } = useTranslation('common')

  useEffect(() => {
    start()
  }, [])

  const handleSubmit = async () => {
    await submitAnswers()
  }

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    )

  if (!isLoggedIn) {
    return (
      <Alert my={8} status='warning'>
        <AlertIcon />
        <AlertDescription>
          <Text>You must be logged in</Text>
        </AlertDescription>
      </Alert>
    )
  }

  if (!hasSubscribed) {
    return (
      <Alert my={8} status='warning'>
        <AlertIcon />
        <AlertDescription>
          <Text>{t`quiz.subscribers`}</Text>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Box my={4} p={4}>
      {quizResults && quizResults[QUIZ_NAME] && (
        <Box mx='auto' mb={8} p={8} boxShadow='lg' maxW='500px' borderWidth={1} borderColor={color}>
          <Heading textAlign='center' as='h4' size='md'>
            Quiz Results
          </Heading>
          <Table>
            <Tr>
              <Th>Attempt</Th>
              <Td>{quizResults[QUIZ_NAME].attempt}</Td>
            </Tr>
            <Tr>
              <Th>Grade</Th>
              <Td>
                {quizResults[QUIZ_NAME].grade} / {quizResults[QUIZ_NAME].total}
              </Td>
            </Tr>
          </Table>
        </Box>
      )}
      {questions?.map((question, index) => (
        <QuizItem
          userAnswers={userAnswers}
          key={index}
          course={course}
          module={module}
          question={question}
          order={index + 1}
        />
      ))}
      <Button isDisabled={numberOfAnswers !== numberOfQuestions} onClick={handleSubmit} isLoading={isLoading}>
        {numberOfAnswers}/{numberOfQuestions} Submit
      </Button>
    </Box>
  )
}

export default QuizList
