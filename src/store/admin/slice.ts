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
  loadAdmin: (state: AdminStateType, { payload }: PayloadAction<AdminStateType>) => {
    const { students, nameList, studentCount, nameCount } = payload
    state.students = [...students].sort((a, b) => a.localeCompare(b)).map(student => student.toLowerCase())
    state.nameList = [...nameList]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(n => ({ name: n.name, owner: n.owner.toLowerCase(), scName: n.scName.toLowerCase() }))
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

export const { loadAdmin, resetAdmin } = adminSlice.actions
