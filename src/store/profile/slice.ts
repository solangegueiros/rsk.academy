import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ethers } from 'ethers'

export type QuizResultType = {
  id: string
  total: number
  grade: number
  attempt: number
  passed: boolean
  answer?: string
}

type ProfileStateType = {
  index: ethers.BigNumber
  ownerAddress: string
  portfolioAddress: string
  activeClass: string
  studentClasses: string[]
  portfolioList: [string, string][]
  studentActiveClassName: string
  classStudentInfo: any
  studentName: string
  quizResults: QuizResultType[]
  quizList: string[]
  quizMinimum: number
  certificatePdfHash: string
  isProfileLoading: boolean
}

export const initialProfileState: ProfileStateType = {
  index: null,
  ownerAddress: null,
  portfolioAddress: null,
  activeClass: null,
  studentClasses: null,
  portfolioList: null,
  studentActiveClassName: null,
  classStudentInfo: null,
  studentName: null,
  quizResults: null,
  quizList: null,
  quizMinimum: null,
  certificatePdfHash: null,
  isProfileLoading: false,
}

export const profileReducers = {
  loadProfile: (state: ProfileStateType, { payload }: PayloadAction<ProfileStateType>): void => {
    const {
      index,
      ownerAddress,
      portfolioAddress,
      activeClass,
      studentClasses,
      portfolioList,
      studentActiveClassName,
      classStudentInfo,
      studentName,
      quizResults,
      quizList,
      quizMinimum,
      certificatePdfHash,
    } = payload

    state.index = index
    state.ownerAddress = ownerAddress
    state.portfolioAddress = portfolioAddress
    state.activeClass = activeClass
    state.studentClasses = studentClasses
    state.portfolioList = portfolioList
    state.studentActiveClassName = studentActiveClassName
    state.classStudentInfo = classStudentInfo
    state.studentName = studentName
    state.quizResults = quizResults
    state.quizList = quizList
    state.quizMinimum = quizMinimum
    state.certificatePdfHash = certificatePdfHash
    state.isProfileLoading = false
  },
  resetProfile: (): ProfileStateType => initialProfileState,
  setProfileLoading: (state: ProfileStateType, { payload }: PayloadAction<boolean>): void => {
    state.isProfileLoading = payload
  },
  setStudentName: (state: ProfileStateType, { payload }: PayloadAction<string>): void => {
    state.studentName = payload
  },
  loadCertificateHash: (state: ProfileStateType, { payload }: PayloadAction<string>): void => {
    state.certificatePdfHash = payload
  },
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: profileReducers,
})

export const { loadProfile, resetProfile, setStudentName, loadCertificateHash, setProfileLoading } =
  profileSlice.actions
