import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUser } from '../../models/IUsers'
import UserService from '../../services/UserServices'

export interface IProfile {
  dataUser: IUser
  isSuccesfullRequest: boolean
}

const initialState: IProfile = {
  dataUser: {
    id: 0,
    name: '',
    surname: '',
    gender: 1,
    birthday: 0,
    phone: '',
    email: '',
    avatar: '',
    challenges: 0,
    completed_challenges: 0,
    role: 0,
    steps: 0
  },
  isSuccesfullRequest: false
}

export const setUserData = createAsyncThunk('dataUser', async (id: number) => {
  const response = await UserService.getUserDataOnId(id)
  return response.data.data
})

export const updateProfile = createAsyncThunk(
  'updateProfile',
  async (data: any) => {
    const params = new URLSearchParams()
    data.surname && params.append('surname', data.surname)
    data.gender && params.append('gender', data.gender + '')
    data.name && params.append('name', data.name)
    data.birthday && params.append('birthday', data.birthday + '')
    data.phone && params.append('phone', data.phone)
    data.email && params.append('email', data.email)
    data.avatar && params.append('avatar', data.avatar)

    await UserService.editingProfile(params)
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      setUserData.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.dataUser = action.payload
        state.isSuccesfullRequest = true
      }
    )
    builder.addCase(setUserData.rejected, (state) => {
      state.isSuccesfullRequest = false
    })
  }
})

export const {} = profileSlice.actions

export const dataUserSelector = (state: RootState) => state.profile.dataUser
export const isSuccesfullRequestSelector = (state: RootState) =>
  state.profile.isSuccesfullRequest

export default profileSlice.reducer
