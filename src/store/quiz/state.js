import { questions } from '@/configs/questions'

export const initialState = {
  questions,
  questionIndex: {
    dev: {
      '01': 0,
    },
  },
  randomQuestions: {
    dev: {
      '01': {
        currentIndex: 0,
        questions: null,
      },
      '02': {
        currentIndex: 0,
        questions: null,
      },
      '03': {
        currentIndex: 0,
        questions: null,
      },
    },
  },
  answers: {
    dev: {
      '01': {
        isError: false,
        isLoading: false,
        result: {},
      },
      '03': {
        isError: false,
        isLoading: false,
        result: {},
      },
      '02': {
        isError: false,
        isLoading: false,
        result: {},
      },
    },
  },
}
