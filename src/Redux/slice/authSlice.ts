import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import { $api } from '../../http';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import AuthService from '../../services/AuthService';

interface IListPlatform {
    id: number,
    image: string,
    status: boolean,
    title: string,
    stratDate?: number,
    endDate?: number
}

export interface IRegistration {
    email: string,
    telephone: string,
    password: string,
    nameUser: string,
    surName: string,
    day: string,
    month: string,
    year: string,
    gender: number,
    platform: number | null,
    avatar: string,
    disabledButton?: boolean,
    listPlatforms?: IListPlatform[] | [],
    isAuth: boolean,
    error: boolean
}



const initialState: IRegistration = {
    email: '',
    telephone: '',
    password: '',
    nameUser: '',
    surName: '',
    day: '15',
    month: '6',
    year: '2000',
    gender: 1,
    platform: null,
    avatar: '',
    disabledButton: true,
    listPlatforms: [],
    isAuth: false,
    error: false
}


export const requestRegistration = createAsyncThunk(
    'requestRegistration',
    async (data:any) => {       
        const {name, surname,birhday,gender,avatar,phone,email,password,device_token,platform, formData} = data
           const response = await AuthService.registration( 
            name, surname,birhday,gender,avatar,phone,email,password,device_token,platform, formData
            )            
         console.log(response);
    }
)

export const sendLogin = createAsyncThunk(
    'login',
    async (data:any) => {      
        const {email,password} = data
        const response = await AuthService.login(email,password)            
        localStorage.setItem('token',response.data.data)
    }
)

export const getPlatforms = createAsyncThunk(
    'platforms',
    async () => {
        const response = await AuthService.getPlatfotms()
        return await response.data.data
    }
)


export const authSlice = createSlice({
    name: 'registration',
    initialState:initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setTelephone: (state, action) => {
            state.telephone = action.payload
        },
        setNameUser: (state, action) => {
            state.nameUser = action.payload
        },
        setSurname: (state, action) => {
            state.surName = action.payload
        },
        setDay: (state, action) => {
            state.day = action.payload
        },
        setMonth: (state, action) => {            
            state.month = action.payload
        },
        setYear: (state, action) => {
            state.year = action.payload
        },
        setGender: (state, action) => {
            state.gender = action.payload
        },
        setPlatform: (state, action) => {
            state.platform = action.payload
        },
        setDisabledButton: (state, action) => {
            state.disabledButton = action.payload
        },
        setAvatarRegistartion: (state, action) => {
            state.avatar = action.payload
        },
        setListPlatforms: (state, action) => {
            state.avatar = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPlatforms.fulfilled, (state, action: any) => {
            state.listPlatforms = action.payload
        })      
        builder.addCase(sendLogin.fulfilled, (state, action: any) => {            
            state.isAuth = true
        })    
        builder.addCase(sendLogin.rejected, (state, action: any) => {            
            state.error = true
        }) 
    }
})

export const {
    setEmail, setDisabledButton, setDay, setGender,
    setMonth, setNameUser, setPassword, setPlatform,
    setSurname, setTelephone, setYear, setAvatarRegistartion
} = authSlice.actions


export const emailSelector = (state: RootState) => state.registration.email
export const disableButtonSelector = (state: RootState) => state.registration.disabledButton
export const passwordSelector = (state: RootState) => state.registration.password
export const telephoneSelector = (state: RootState) => state.registration.telephone
export const nameUserSelector = (state: RootState) => state.registration.nameUser
export const surNameSelector = (state: RootState) => state.registration.surName
export const daySelector = (state: RootState) => state.registration.day
export const monthSelector = (state: RootState) => state.registration.month
export const yearSelector = (state: RootState) => state.registration.year
export const genderSelector = (state: RootState) => state.registration.gender
export const platformSelector = (state: RootState) => state.registration.platform
export const listPlatformSelector = (state: RootState) => state.registration.listPlatforms
export const avatarSelector = (state: RootState) => state.registration.avatar
export const isAuthSelector = (state: RootState) => state.registration.isAuth
export const errorSelector = (state: RootState) => state.registration.error

export default authSlice.reducer
