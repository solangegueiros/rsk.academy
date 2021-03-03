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
        isCompleted: false,
        result: {},
      },
      '03': {
        isCompleted: false,
        result: {},
      },
      '02': {
        isCompleted: false,
        result: {},
      },
    },
  },
}
