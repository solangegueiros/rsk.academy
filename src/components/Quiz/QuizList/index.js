import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Th, Tr, Table, Td, Heading } from '@chakra-ui/react'

import { useQuiz } from '@/hooks/useQuiz'
import { submitQuestions } from '@/store/quiz/actions'
import { QuizItem } from '../QuizItem'
// import { QuizResult } from '../QuizResult'

export const QuizList = ({ course, module, numberOfQuestions, quizName }) => {
  const { questions, start, isCompleted, userAnswers = {} } = useQuiz(
    course,
    module,
    numberOfQuestions,
  )

  const { quizResults } = useSelector(state => state.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    start()
  }, [])

  const handleSubmit = () => dispatch(submitQuestions({ course, module }))

  const numberOfAnswers = Object.keys(userAnswers)?.length || 0

  return (
    <Box>
      {quizResults && quizResults[quizName] && (
        <Box mx='auto' mb={8} p={8} boxShadow='lg' maxW='500px'>
          <Heading textAlign='center' as='h4' size='md'>
            Quiz Results
          </Heading>
          <Table>
            <Tr>
              <Th>Attempt</Th>
              <Td>{quizResults[quizName].attempt}</Td>
            </Tr>
            <Tr>
              <Th>Grade</Th>
              <Td>{quizResults[quizName].grade}</Td>
            </Tr>
            <Tr>
              <Th>Correct Answers</Th>
              <Td>
                {quizResults[quizName].total} / {numberOfQuestions}
              </Td>
            </Tr>
          </Table>
        </Box>
      )}
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
  quizName: PropTypes.string.isRequired,
}

export default QuizList
