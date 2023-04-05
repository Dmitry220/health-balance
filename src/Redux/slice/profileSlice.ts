import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUpdateUser, IUser } from '../../models/IUsers'
import UserService from '../../services/UserServices'
import { showToast } from '../../utils/common-functions'

export interface IProfile {
  dataUser: IUser
  isSuccesfullRequest: boolean,
  isLoading: boolean
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
  isSuccesfullRequest: false,
  isLoading: false
}

export const setUserData = createAsyncThunk('dataUser', async (id: number) => {
  const response = await UserService.getUserDataOnId(id)
  return response.data.data
})

export const updateProfile = createAsyncThunk(
  'updateProfile',
  async (data: IUpdateUser) => {
    try {
     const response = await UserService.editingProfile(data)     
     if(response.data.success){
      await showToast('Данные успешно сохранены!')
     }else{
      await showToast('Ошибка!')
     }    
    } catch (error) {
      console.log(error);      
      await showToast('Ошибка!')
    } 
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
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateProfile.fulfilled, (state) => {
      state.isLoading = false
    })
  }
})

export const {} = profileSlice.actions

export const dataUserSelector = (state: RootState) => state.profile.dataUser
export const isLoadingSelector = (state: RootState) => state.profile.isLoading
export const isSuccesfullRequestSelector = (state: RootState) =>
  state.profile.isSuccesfullRequest

export default profileSlice.reducer
