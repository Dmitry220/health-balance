import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import PlatformService from '../../services/PlatformService';
import { IUser } from '../../models/IUsers';
import UserService from '../../services/UserServices';


export interface IUserProfile {
    dataUser: IUser,
}

const initialState: IUserProfile = {   
    dataUser: {
		id: 0,
		name: '',
		surname: '',
		gender: 1,
		birthday: 0,
		phone: '',
		email: '',
		avatar: ''
	 },
    
}


export const setUserData = createAsyncThunk(
    'dataUser',
    async (id:number) => {
        const response = await UserService.getUserDataOnId(id)
        return await response.data.data
    }
)

export const updateProfile = createAsyncThunk(
    'updateProfile',
    async () => {
        const response = await UserService.editingProfile()
        console.log(response);
        
       
    }
)



export const userSlice = createSlice({
    name: 'user',
    initialState:initialState,
    reducers: {
      //   setUser: (state, action) => {
      //       state.dataRegistration!.email = action.payload
      //   },
    },
    extraReducers: (builder) => {
        builder.addCase(setUserData.fulfilled, (state, action:PayloadAction<IUser>) => {
            state.dataUser = action.payload
        })
    }
})

export const {
    
} = userSlice.actions


export const dataUserSelector = (state: RootState) => state.user.dataUser

export default userSlice.reducer
