import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AdminStudentsType = {
  activeClass: string
  index: string
  ownerAddress: string
  portfolioAddress: string
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
