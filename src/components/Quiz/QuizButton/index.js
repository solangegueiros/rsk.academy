import PropTypes from 'prop-types'
import { MultipleChoice, TrueFalse, Container } from '@/components/all'
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'

import { useQuiz } from '@/hooks/useQuiz'
import { FaRandom } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { randomize, submitQuestions } from '@/store/quiz/actions'

export const QuizButton = ({ course, module, title, buttonText }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { questions, start, userAnswers, isCompleted } = useQuiz(course, module)
  const dispatch = useDispatch()

  const bg = useColorModeValue('white', 'dark.500')

  const randomQuiz = () => dispatch(randomize({ course, module }))
  const submitQuiz = () => dispatch(submitQuestions({ course, module }))

  return (
    <>
      <Button
        onClick={() => {
          start()
          onOpen()
        }}
        variant='normal'
      >
        {buttonText}
      </Button>
      <Modal
        scrollBehavior='inside'
        isCentered
        size='full'
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as={Container} mx={4} maxW='700px' bg={bg}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody h='full'>
            {questions?.map((question, index) => (
              <Box key={question.id} mb={16}>
                {question.type === 'true-false' ? (
                  <TrueFalse
                    course='dev'
                    module='01'
                    question={question}
                    key={index}
                    order={index + 1}
                  />
                ) : (
                  <MultipleChoice
                    course='dev'
                    module='01'
                    question={question}
                    key={index}
                    order={index + 1}
                  />
                )}
              </Box>
            ))}
          </ModalBody>

          <ModalFooter>
            {!isCompleted ? (
              <>
                <Button
                  mr={3}
                  variant='inversed'
                  leftIcon={<FaRandom />}
                  disabled={Object.keys(userAnswers).length !== 0}
                  onClick={randomQuiz}
                >
                  Random
                </Button>
                <Button
                  variant='normal'
                  leftIcon={`${Object.keys(userAnswers).length}/${10}`}
                  disabled={Object.keys(userAnswers).length !== 10}
                  onClick={submitQuiz}
                >
                  Submit
                </Button>
              </>
            ) : (
              <Box>
                {
                  Object.entries(userAnswers).filter(
                    ([_, { isCorrect }]) => isCorrect,
                  ).length
                }{' '}
                Correct
              </Box>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

QuizButton.propTypes = {
  course: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
}
