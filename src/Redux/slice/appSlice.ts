import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";


interface AppState {
    currency: number
}


const initialState: AppState = {
    currency: 0,
}


export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

    },
})

export const {} = appSlice.actions


//export const selectCount = (state: RootState) => state.app

export default appSlice.reducer