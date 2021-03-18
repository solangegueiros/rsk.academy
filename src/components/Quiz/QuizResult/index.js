import PropTypes from 'prop-types'
import {
  Box,
  Heading,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'
import { useRouter } from 'next/router'
import { BiCheckCircle, BiXCircle } from 'react-icons/bi'

import { useQuiz } from '@/hooks/useQuiz'
import { useMemo } from 'react'

export const QuizResult = ({ course, module, title }) => {
  const { questions, userAnswers } = useQuiz(course, module)
  const { locale } = useRouter()
  const { t } = useI18n()
  const tf = [t('quiz.yes'), t('quiz.no')]
  const color = useColorModeValue('primary.500', 'light.500')

  const numberOfCorrectAnswers = useMemo(() => {
    return Object.entries(userAnswers).filter(([_, { isCorrect }]) => isCorrect)
      .length
  }, [userAnswers])

  return (
    <Box>
      <Heading>
        {title} : {numberOfCorrectAnswers} Correct
      </Heading>

      <VStack align='start' mt={16}>
        {questions.map(({ id, question, answers, type, correct_answer }, i) => {
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
                      {type === 'tf'
                        ? tf[userAnswers[id].answer]
                        : answers[userAnswers[id].answer][locale]}
                    </Text>
                  </HStack>
                  {!isCorrect && (
                    <HStack color={color}>
                      <Icon as={BiCheckCircle} />
                      <Text>
                        {type === 'tf'
                          ? tf[correct_answer]
                          : answers[correct_answer][locale]}
                      </Text>
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

QuizResult.propTypes = {
  course: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
