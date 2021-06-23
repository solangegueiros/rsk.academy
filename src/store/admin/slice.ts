import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AdminNameListType = {
  name: string
  owner: string
  scName: string
}

type AdminStateType = {
  students: string[]
  nameList: AdminNameListType[]
  studentCount: number
  nameCount: number
}

const initialAdminState: AdminStateType = {
  students: null,
  nameList: null,
  studentCount: null,
  nameCount: null,
}

const adminReducers = {
  loadStudents: (state: AdminStateType, { payload }: PayloadAction<{ students: string[] }>) => {
    state.students = [...payload.students].sort((a, b) => a.localeCompare(b)).map(student => student.toLowerCase())
  },
  loadNames: (state: AdminStateType, { payload }: PayloadAction<{ nameList: AdminNameListType[] }>) => {
    state.nameList = [...payload.nameList].sort((a, b) => a.name.localeCompare(b.name))
  },
  loadCounts: (state: AdminStateType, { payload }: PayloadAction<{ studentCount: number; nameCount: number }>) => {
    const { studentCount, nameCount } = payload
    state.studentCount = studentCount
    state.nameCount = nameCount
  },
  resetAdmin: () => initialAdminState,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState: initialAdminState,
  reducers: adminReducers,
})

export const { loadCounts, loadStudents, loadNames, resetAdmin } = adminSlice.actions
