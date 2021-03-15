import PropTypes from 'prop-types'
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useI18n } from 'next-localization'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { answerQuestion } from '@/store/quiz/actions'

export const QuizItem = ({
  userAnswers,
  course,
  module,
  question: { id, question, type, answers },
  order,
}) => {
  const { locale } = useRouter()
  const color = useColorModeValue('primary.500', 'light.500')
  const { t } = useI18n()

  const questionAnswers = type === 'tf' ? [0, 1] : answers
  const tf = [t('quiz.yes'), t('quiz.no')]
  const dispatch = useDispatch()

  const setAnswer = val => {
    const answer = parseInt(val)
    dispatch(answerQuestion({ course, module, id, answer }))
  }

  return (
    <Box mb={16}>
      <Text fontWeight='bold'>
        {order} - {question[locale]}
      </Text>
      <Flex direction={type !== 'tf' && 'column'} align='start'>
        {questionAnswers.map((answer, i) => {
          return (
            <Box
              p={2}
              key={i}
              onClick={() => setAnswer(i)}
              variant='ghost'
              borderWidth={2}
              cursor='pointer'
              borderRadius='lg'
              borderColor={
                userAnswers[id]?.answer === i ? color : 'transparent'
              }
            >
              {type === 'tf' ? tf[i] : answer[locale]}
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}

QuizItem.propTypes = {
  userAnswers: PropTypes.object,
  course: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    question: PropTypes.shape({
      en: PropTypes.string,
      es: PropTypes.string,
      pt: PropTypes.string,
    }),
    type: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        en: PropTypes.string,
        es: PropTypes.string,
        pt: PropTypes.string,
      }),
    ),
    correct_answer: PropTypes.number.isRequired,
  }).isRequired,
}
