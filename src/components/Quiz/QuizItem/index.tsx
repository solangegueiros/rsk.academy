import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { answerQuestion, CourseType, ModuleType, QuestionType } from '@store/quiz/slice'
import { useAppDispatch } from '@store/store'

interface QuizItemProps {
  userAnswers: Record<string, { answer: number; isCorrect: boolean }>
  course: CourseType
  module: ModuleType
  question: QuestionType
  order: number
}

export const QuizItem = ({
  userAnswers,
  course,
  module,
  question: { id, question, type, answers },
  order,
}: QuizItemProps): JSX.Element => {
  const { locale } = useRouter()
  const color = useColorModeValue('primary.500', 'light.500')
  const { t } = useTranslation('common')

  const questionAnswers = type === 'tf' ? [0, 1] : answers
  const tf = [t`quiz.yes`, t`quiz.no`]
  const dispatch = useAppDispatch()

  const setAnswer = (val: string | number) => {
    const answer = typeof val === 'number' ? val : parseInt(val)
    dispatch(answerQuestion({ course, module, id, answer }))
  }

  return (
    <Box mb={16}>
      <Text fontWeight='bold'>
        {order} - {question[locale]}
      </Text>
      <Flex direction={type !== 'tf' ? 'column' : 'row'} align='start'>
        {questionAnswers.map((answer, i: number) => {
          const currentItem = answer as { en: string; es: string; pt: string }
          return (
            <Box
              p={2}
              key={i}
              onClick={() => setAnswer(i)}
              variant='ghost'
              borderWidth={2}
              cursor='pointer'
              borderRadius='lg'
              borderColor={userAnswers[id]?.answer === i ? color : 'transparent'}
            >
              {type === 'tf' ? tf[i] : currentItem[locale]}
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}
