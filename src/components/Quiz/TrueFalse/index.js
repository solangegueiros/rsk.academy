import PropTypes from 'prop-types'
import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { answerQuestion } from '@/store/quiz/actions'
import { useRouter } from 'next/router'
import { useQuiz } from '@/hooks/useQuiz'

export const TrueFalse = ({
  course,
  module,
  question: { question, id, correct_answer },
  order,
}) => {
  const dispatch = useDispatch()
  const { locale } = useRouter()
  const { userAnswers, isCompleted } = useQuiz(course, module)
  const color = useColorModeValue('primary.500', 'light.500')

  const setAnswer = answer =>
    !isCompleted && dispatch(answerQuestion({ course, module, id, answer }))

  return (
    <Box h='full'>
      <Text fontWeight='bold' color={isCompleted}>
        {order} - {question[locale]}
      </Text>
      <HStack>
        <Box
          p={2}
          variant='ghost'
          borderWidth={2}
          cursor={isCompleted ? 'not-allowed' : 'pointer'}
          borderRadius='lg'
          borderColor={
            userAnswers[id]?.answer === 'yes' ? color : 'transparent'
          }
          onClick={() => setAnswer('yes')}
          color={isCompleted && correct_answer === 'yes' && color}
          fontWeight={isCompleted && correct_answer === 'yes' && 'bold'}
        >
          Yes
        </Box>
        <Box
          p={2}
          variant='ghost'
          borderWidth={2}
          cursor={isCompleted ? 'not-allowed' : 'pointer'}
          borderRadius='lg'
          borderColor={userAnswers[id]?.answer === 'no' ? color : 'transparent'}
          onClick={() => setAnswer('no')}
          color={isCompleted && correct_answer === 'no' && color}
          fontWeight={isCompleted && correct_answer === 'no' && 'bold'}
        >
          No
        </Box>
      </HStack>
    </Box>
  )
}

TrueFalse.propTypes = {
  order: PropTypes.number.isRequired,
  course: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    correct_answer: PropTypes.oneOf(['yes', 'no']),
    question: PropTypes.shape({
      en: PropTypes.string.isRequired,
      es: PropTypes.string.isRequired,
      pt: PropTypes.string.isRequired,
    }).isRequired,
  }),
}
