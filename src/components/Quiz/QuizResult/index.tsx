import { Box, Heading, HStack, Icon, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { BiCheckCircle, BiXCircle } from 'react-icons/bi'

import { useQuiz } from '@hooks/useQuiz'
import { useMemo } from 'react'
import { CourseType, ModuleType } from '@store/quiz/slice'

interface QuizResultProps {
  course: CourseType
  module: ModuleType
  title: string
}

export const QuizResult = ({ course, module, title }: QuizResultProps): JSX.Element => {
  const { questions, userAnswers } = useQuiz(course, module)
  const { locale } = useRouter()
  const { t } = useTranslation('common')
  const tf = [t`quiz.yes`, t`quiz.no`]
  const color = useColorModeValue('primary.500', 'light.500')

  const numberOfCorrectAnswers = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Object.entries(userAnswers).filter(([_, { isCorrect }]) => isCorrect).length
  }, [userAnswers])

  return (
    <Box>
      <Heading>
        {title} : {numberOfCorrectAnswers} Correct
      </Heading>

      <VStack align='start' mt={16}>
        {questions.map(({ id, question, answers, type, correctAnswer }, i) => {
          const isCorrect = userAnswers[id].isCorrect

          return (
            <Box key={i} mb={8}>
              <Box flex='1'>
                <Text fontWeight='bold'>
                  {i + 1} - {question[locale]}
                </Text>
                <Box mt={2}>
                  <HStack color={isCorrect ? color : 'red.400'}>
                    <Icon as={isCorrect ? BiCheckCircle : BiXCircle} />
                    <Text color={!isCorrect && 'red.400'}>
                      {type === 'tf' ? tf[userAnswers[id].answer] : answers[userAnswers[id].answer][locale]}
                    </Text>
                  </HStack>
                  {!isCorrect && (
                    <HStack color={color}>
                      <Icon as={BiCheckCircle} />
                      <Text>{type === 'tf' ? tf[correctAnswer] : answers[correctAnswer][locale]}</Text>
                    </HStack>
                  )}
                </Box>
              </Box>
            </Box>
          )
        })}
      </VStack>
    </Box>
  )
}
