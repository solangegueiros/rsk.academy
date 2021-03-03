import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button } from '@chakra-ui/react'

import { useQuiz } from '@/hooks/useQuiz'
import { submitQuestions } from '@/store/quiz/actions'
import { QuizItem } from '../QuizItem'
import { QuizResult } from '../QuizResult'

export const QuizList = ({ course, module, numberOfQuestions }) => {
  const { questions, start, isCompleted, userAnswers = {} } = useQuiz(
    course,
    module,
    numberOfQuestions,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    start()
  }, [])

  const handleSubmit = () => dispatch(submitQuestions({ course, module }))

  if (isCompleted)
    return <QuizResult course={course} module={module} title='Result' />

  const numberOfAnswers = Object.keys(userAnswers)?.length || 0

  return (
    <Box>
      {questions?.map((question, index) => (
        <QuizItem
          userAnswers={userAnswers}
          isCompleted={isCompleted}
          key={index}
          course={course}
          module={module}
          question={question}
          order={index + 1}
        />
      ))}
      <Button
        variant='normal'
        leftIcon={`${numberOfAnswers}/${numberOfQuestions}`}
        isDisabled={numberOfAnswers !== numberOfQuestions}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  )
}

QuizList.propTypes = {
  course: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
  numberOfQuestions: PropTypes.number,
}

export default QuizList
