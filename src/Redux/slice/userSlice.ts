import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import PlatformService from '../../services/PlatformService';
import { IUser } from '../../models/IUsers';
import UserService from '../../services/UserServices';


export interface IUserProfile {
    dataUser: IUser,
    isSuccesfullRequest: boolean
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
     isSuccesfullRequest: false    
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
    async (data:IUser) => {
        const params = new URLSearchParams();
		data.surname && params.append('surname', data.surname);
		data.gender && params.append('gender', data.gender+'');
		data.name && params.append('name', data.name);
        //@ts-ignore
		data.birthday && params.append('birthday', new Date(data.birthday));
		data.phone && params.append('phone', data.phone);
		data.email && params.append('email', data.email);
		data.avatar && params.append('avatar', data.avatar);

        console.log(params, data);
        

      //  const {avatar,birthday,email,gender,name,phone,surname} = data
       const response = await UserService.editingProfile(params)
        console.log(response.data);  
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
            state.isSuccesfullRequest = true
        })
        builder.addCase(setUserData.rejected, (state) => {
            state.isSuccesfullRequest = false
        })
    }
})

export const {
    
} = userSlice.actions


export const dataUserSelector = (state: RootState) => state.user.dataUser
export const isSuccesfullRequestSelector = (state: RootState) => state.user.isSuccesfullRequest

export default userSlice.reducer
