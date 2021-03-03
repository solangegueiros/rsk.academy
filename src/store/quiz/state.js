import questions from '@/configs/questions.json'

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
    },
  },
  answers: {
    dev: {
      '01': {
        isCompleted: false,
        result: {},
      },
    },
  },
}
