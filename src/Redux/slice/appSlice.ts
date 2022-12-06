import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import AppService from '../../services/AppService'
import { IBalance } from '../../models/IApp'

interface AppState {
  balance: number
  count_steps: number
}

const initialState: AppState = {
  balance: 0,
  count_steps: 0
}

export const getBalance = createAsyncThunk('balance', async () => {
  const response = await AppService.getBalance()
  return response.data.data.balance
})

// export const setPurposeSteps = createAsyncThunk(
//     'setPurposeSteps',
//     async (data:IPersonalPurposeParams) => {
//         const {type,quantity} = data
//         const formData = new FormData()
//         formData.append('quantity', quantity)
//         formData.append('type', type+'')
//         console.log(data);

//         const response = await AppService.creatingPersonalPurpose(formData)
//         console.log(response);

//     }
// )
// export const getPurposeSteps = createAsyncThunk(
//     'getPurposeSteps',
//     async (data:any) => {
//         const response = await AppService.creatingPersonalPurpose(data)
//         console.log(response);

//     }
// )

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.balance = action.payload
    })
  }
})

export const {} = appSlice.actions

export const balanceSelector = (state: RootState) => state.app.balance
export const stepsSelector = (state: RootState) => state.app.balance

export default appSlice.reducer
