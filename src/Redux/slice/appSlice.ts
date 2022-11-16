import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import AppService from '../../services/AppService';
import { IBalance } from '../../models/IApp';


interface AppState {
    balance: number
}


const initialState: AppState = {
    balance: 0,
}

export const getBalance = createAsyncThunk(
    'balance',
    async () => {
        const response = await AppService.getBalance()
        return response.data.data.balance
    }
)


export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getBalance.fulfilled, (state, action) => {
            state.balance = action.payload
        })       
    }
})

export const {} = appSlice.actions


export const balanceSeelctor = (state: RootState) => state.app.balance

export default appSlice.reducer