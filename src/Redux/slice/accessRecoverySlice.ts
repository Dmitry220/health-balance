import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";


export interface IAccessRecovery {
    email: string,
    password: string,
    repeatPassword: string,
    disabledButton?: boolean
}


const initialState: IAccessRecovery = {
    email: '',
    password: '',
    repeatPassword: '',
    disabledButton: true
}


export const accessRecoverySlice = createSlice({
    name: 'recovery',
    initialState,
    reducers: {
        setRecoveryEmail: (state, action) => {
            state.email = action.payload
        },
        setRecoveryPassword: (state, action) => {
            state.password = action.payload
        },
        setRepeatPassword: (state, action) => {
            state.repeatPassword = action.payload
        },
        setDisabledButton: (state, action) => {
            state.disabledButton = action.payload
        },
    },
})

export const {setRecoveryPassword,setDisabledButton,setRecoveryEmail,setRepeatPassword} = accessRecoverySlice.actions


export const emailRecoverySelector = (state: RootState) => state.recovery.email
export const disableButtonSelector = (state: RootState) => state.recovery.disabledButton
export const passwordRecoverySelector = (state: RootState) => state.recovery.password
export const repeatPasswordRecoverySelector = (state: RootState) => state.recovery.repeatPassword



export default accessRecoverySlice.reducer
