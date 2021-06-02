import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ethers } from 'ethers'

export type AdminStudentsType = [ethers.BigNumber, string, string, string, string[]] & {
  index: ethers.BigNumber
  ownerAddress: string
  portfolioAddress: string
  activeClass: string
  studentClasses: string[]
}

export type AdminNameListType = {
  name: string
  owner: string
  scName: string
}

type AdminStateType = {
  students: AdminStudentsType[]
  nameList: AdminNameListType[]
}

const initialAdminState: AdminStateType = {
  students: null,
  nameList: null,
}

const adminReducers = {
  loadAdmin: (
    state: AdminStateType,
    {
      payload,
    }: PayloadAction<{
      students: AdminStudentsType[]
      nameList: AdminNameListType[]
    }>,
  ) => {
    const { students, nameList } = payload

    state.students = students
    state.nameList = nameList
  },
  resetAdmin: () => initialAdminState,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState: initialAdminState,
  reducers: adminReducers,
})

export const { loadAdmin, resetAdmin } = adminSlice.actions
