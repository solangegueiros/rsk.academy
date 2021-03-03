import PropTypes from 'prop-types'
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { answerQuestion } from '@/store/quiz/actions'
import { useRouter } from 'next/router'
import { useQuiz } from '@/hooks/useQuiz'

export const MultipleChoice = ({
  course,
  module,
  order,
  question: { id, question, answers, correct_answer },
}) => {
  const dispatch = useDispatch()
  const { locale } = useRouter()

  const { userAnswers, isCompleted } = useQuiz(course, module)
  const color = useColorModeValue('primary.500', 'light.500')

  const setAnswer = val => {
    if (!isCompleted) {
      const answer = parseInt(val)
      dispatch(answerQuestion({ course, module, id, answer }))
    }
  }

  return (
    <Box>
      <Text fontWeight='bold'>
        {order} - {question[locale]}
      </Text>
      <Flex direction='column' align='start'>
        {answers.map((answer, i) => {
          return (
            <Box
              p={2}
              key={i}
              onClick={() => setAnswer(i)}
              variant='ghost'
              borderWidth={2}
              cursor={isCompleted ? 'not-allowed' : 'pointer'}
              borderRadius='lg'
              borderColor={
                userAnswers[id]?.answer === i ? color : 'transparent'
              }
              color={isCompleted && correct_answer === i && color}
              fontWeight={isCompleted && correct_answer === i && 'bold'}
            >
              {answer[locale]}
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}

MultipleChoice.propTypes = {
  course: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  question: PropTypes.shape({
    correct_answer: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    question: PropTypes.shape({
      en: PropTypes.string.isRequired,
      es: PropTypes.string.isRequired,
      pt: PropTypes.string.isRequired,
    }).isRequired,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        en: PropTypes.string.isRequired,
        es: PropTypes.string.isRequired,
        pt: PropTypes.string.isRequired,
      }).isRequired,
    ),
  }).isRequired,
}
