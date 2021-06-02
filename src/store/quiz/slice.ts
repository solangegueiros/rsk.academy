import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { questions } from '@configs/questions'
import { getRandom } from '@utils/getRandom'

export type ModuleType = '01' | '02' | '03'
export type CourseType = 'dev' | 'business'

export type QuestionType = {
  id: string
  type: string
  question: { en: string; es: string; pt: string }
  answers?: { en: string; es: string; pt: string }[]
  correctAnswer?: number
}

export type RandomQuestionType = {
  currentIndex: number
  questions: QuestionType[]
}

export type AnswerType = {
  isError: boolean
  isLoading: boolean
  result: Record<string, { answer: number; isCorrect: boolean }>
}

type QuizStateType = {
  questions: Record<CourseType, Record<ModuleType, QuestionType[]>>
  questionIndex: { dev: { '01': number } }
  randomQuestions: Record<CourseType, Record<ModuleType, RandomQuestionType>>
  answers: Record<CourseType, Record<ModuleType, AnswerType>>
}

const initialQuizState: QuizStateType = {
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
    business: {
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
    business: {
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

const quizReducers = {
  answerQuestion: (
    state: QuizStateType,
    {
      payload: { course, module, id, answer },
    }: PayloadAction<{
      course: CourseType
      module: ModuleType
      id: string
      answer: number
    }>,
  ) => {
    if (Object.keys(state.answers[course][module]).length - 1 >= 10) return

    const question = state.questions[course][module].find(q => q.id === id)
    const isCorrect = answer === question.correctAnswer

    state.answers[course][module].result[id] = {
      answer,
      isCorrect,
    }
  },
  resetQuizAnswers: (
    state: QuizStateType,
    { payload: { course, module } }: PayloadAction<{ course: CourseType; module: ModuleType }>,
  ) => {
    state.answers[course][module].result = {}
  },
  errorAnswers: (
    state: QuizStateType,
    { payload: { course, module } }: PayloadAction<{ course: CourseType; module: ModuleType }>,
  ) => {
    state.answers[course][module].isLoading = false
    state.answers[course][module].isError = true
  },
  randomizeQuestions: (
    state: QuizStateType,
    {
      payload: { course, module, numberOfQuestions },
    }: PayloadAction<{
      course: CourseType
      module: ModuleType
      numberOfQuestions: number
    }>,
  ) => {
    const randomQuestions = getRandom(questions[course][module], numberOfQuestions)
    state.randomQuestions[course][module].questions = randomQuestions
  },
  setNextQuestion: (state: QuizStateType, { payload: { course, module } }) => {
    if (state.randomQuestions[course][module].currentIndex < 9) {
      state.randomQuestions[course][module].currentIndex = state.randomQuestions[course][module].currentIndex + 1
    }
  },
  setPreviousQuestion: (
    state: QuizStateType,
    { payload: { course, module } }: PayloadAction<{ course: CourseType; module: ModuleType }>,
  ) => {
    if (state.randomQuestions[course][module].currentIndex > 0) {
      state.randomQuestions[course][module].currentIndex = state.randomQuestions[course][module].currentIndex - 1
    }
  },
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: initialQuizState,
  reducers: quizReducers,
})

export const {
  answerQuestion,
  randomizeQuestions,
  setNextQuestion,
  setPreviousQuestion,
  errorAnswers,
  resetQuizAnswers,
} = quizSlice.actions
