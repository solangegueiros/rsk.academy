import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ethers } from 'ethers'

type ProfileStateType = {
  index: ethers.BigNumber
  ownerAddress: string
  portfolioAddress: string
  activeClassAddress: string
  studentClasses: string[]
  portfolioList: [string, string][]
  studentActiveClassName: string
  classStudentInfo: any
  studentName: string
  quizResults: any
}

export const initialProfileState: ProfileStateType = {
  index: null,
  ownerAddress: null,
  portfolioAddress: null,
  activeClassAddress: null,
  studentClasses: null,
  portfolioList: null,
  studentActiveClassName: null,
  classStudentInfo: null,
  studentName: null,
  quizResults: null,
}

export const profileReducers = {
  saveProfile: (state: ProfileStateType, { payload }: PayloadAction<ProfileStateType>): void => {
    const {
      index,
      ownerAddress,
      portfolioAddress,
      activeClassAddress,
      studentClasses,
      portfolioList,
      studentActiveClassName,
      classStudentInfo,
      studentName,
      quizResults,
    } = payload

    state.index = index
    state.ownerAddress = ownerAddress
    state.portfolioAddress = portfolioAddress
    state.activeClassAddress = activeClassAddress
    state.studentClasses = studentClasses
    state.portfolioList = portfolioList
    state.studentActiveClassName = studentActiveClassName
    state.classStudentInfo = classStudentInfo
    state.studentName = studentName
    state.quizResults = quizResults
  },
  saveQuizResult: (
    state: ProfileStateType,
    { payload: { quizName, result } }: PayloadAction<{ quizName: string; result: any }>,
  ): void => {
    if (state.quizResults) state.quizResults[quizName] = result
  },
  resetProfile: (): ProfileStateType => initialProfileState,
  setStudentName: (state: ProfileStateType, { payload }: PayloadAction<string>): void => {
    state.studentName = payload
  },
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: profileReducers,
})

export const { saveProfile, resetProfile, saveQuizResult, setStudentName } = profileSlice.actions
