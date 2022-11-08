import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import AuthService from '../../services/AuthService';
import { ILogin, IRegistration } from '../../models/IAuth';
import PlatformService from '../../services/PlatformService';
import { IListPlatform } from '../../models/IPlatforms';


export interface IAuth {
    disabledButton?: boolean,
    listPlatforms?: IListPlatform[] | [],
    isAuth: boolean,
    error: boolean,
    dataRegistration: IRegistration | null
}

const initialState: IAuth = {   
    disabledButton: true,
    listPlatforms: [],
    isAuth: false,
    error: false,
    dataRegistration: {
        email: '',
        phone: '',
        password: '',
        name: '',
        surname: '',
        birthday:'15.06.2000',
        gender: 1,
        platform: null,
        avatar: '',
        device_token: ''
    }
}


export const requestRegistration = createAsyncThunk(
    'requestRegistration',
    async (data:IRegistration) => {       
        const {name, surname, birthday,gender,avatar,phone,email,password,device_token,platform} = data
           const response = await AuthService.registration( 
            name, surname,birthday,gender,avatar,phone,email,password,device_token,platform
            )            
         console.log(response);
    }
)

export const sendLogin = createAsyncThunk(
    'login',
    async (data:ILogin) => {      
        const {email,password} = data
        const response = await AuthService.login(email,password)            
        localStorage.setItem('token',response.data.data)
    }
)

export const getPlatforms = createAsyncThunk(
    'platforms',
    async () => {
        const response = await PlatformService.getPlatfotms()
        return await response.data.data
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState:initialState,
    reducers: {
        setEmail: (state, action) => {
            state.dataRegistration!.email = action.payload
        },
        setPassword: (state, action) => {
            state.dataRegistration!.password =  action.payload
        },
        setTelephone: (state, action) => {
            state.dataRegistration!.phone = action.payload
        },
        setNameUser: (state, action) => {
            state.dataRegistration!.name = action.payload
        },
        setSurname: (state, action) => {
            state.dataRegistration!.surname = action.payload
        },
        setBirthday: (state, action) => {
            state.dataRegistration!.birthday = action.payload
        },
        setGender: (state, action) => {
            state.dataRegistration!.gender = action.payload
        },
        setPlatform: (state, action) => {
            state.dataRegistration!.platform = action.payload
        },
        setAvatarRegistartion: (state, action) => {
            state.dataRegistration!.avatar = action.payload
        },
        setDisabledButton: (state, action) => {
            state.disabledButton = action.payload
        },    
        checkAuth: (state) => {
            if(localStorage.getItem('token')){
                state.isAuth = true
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPlatforms.fulfilled, (state, action:PayloadAction<IListPlatform[]>) => {
            state.listPlatforms = action.payload
            state.error = false
        })      
        builder.addCase(sendLogin.fulfilled, (state, action) => {            
            state.isAuth = true
            state.error = false
        })    
        builder.addCase(sendLogin.rejected, (state, action) => {            
            state.error = true
        }) 
    }
})

export const {
    setEmail, setDisabledButton,setGender,
    setNameUser, setPassword, setPlatform,
    setSurname, setTelephone, setAvatarRegistartion, setBirthday,checkAuth
} = authSlice.actions


export const emailSelector = (state: RootState) => state.auth.dataRegistration!.email
export const disableButtonSelector = (state: RootState) => state.auth.disabledButton
export const passwordSelector = (state: RootState) => state.auth.dataRegistration!.password
export const telephoneSelector = (state: RootState) => state.auth.dataRegistration!.phone
export const nameUserSelector = (state: RootState) => state.auth.dataRegistration!.name
export const surNameSelector = (state: RootState) => state.auth.dataRegistration!.surname
export const birthdaySelector = (state: RootState) => state.auth.dataRegistration!.birthday
export const genderSelector = (state: RootState) => state.auth.dataRegistration!.gender
export const platformSelector = (state: RootState) => state.auth.dataRegistration!.platform
export const listPlatformSelector = (state: RootState) => state.auth.listPlatforms
export const avatarSelector = (state: RootState) => state.auth.dataRegistration!.avatar
export const isAuthSelector = (state: RootState) => state.auth.isAuth
export const errorSelector = (state: RootState) => state.auth.error

export default authSlice.reducer
