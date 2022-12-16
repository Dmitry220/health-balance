import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import AppService from '../../services/AppService'
import { IBalance, IStepsPerDay, IStepsPerWeekAndMonth } from '../../models/IApp'

interface AppState {
  balance: number
  steps: IStepsPerDay[] | []
  stepsDay: any,
  stepsWeekAndMonth: any
}

const initialState: AppState = {
  balance: 0,
  steps: [],
  stepsDay: [],
  stepsWeekAndMonth: {}
}

export const getBalance = createAsyncThunk('balance', async () => {
  const response = await AppService.getBalance()
  return response.data.data.balance
})


export const getStepsPerDay = createAsyncThunk(
    'getStepsPerDay',
    async (data:any) => {
        const {start_date,end_date} = data
        const response = await AppService.getStepsPerDay(start_date,end_date)
        return response.data.data

    }
)

export const getStepsPerWeekAndMonth = createAsyncThunk(
  'getStepsPerWeekAndMonth',
  async (data:any) => {
      const {start_date,end_date, type} = data
      const response = await AppService.getStepsPerWeekAndMonth(start_date,end_date, type)
      return response.data.data

  }
)

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.balance = action.payload
    })
    builder.addCase(getStepsPerDay.fulfilled, (state, action:PayloadAction<IStepsPerDay[]>) => {
      state.steps = action.payload
      
    })
    builder.addCase(getStepsPerWeekAndMonth.fulfilled, (state, action) => {
      state.stepsWeekAndMonth = action.payload
    })
  }
})

export const {} = appSlice.actions

export const balanceSelector = (state: RootState) => state.app.balance
export const stepsPerDaySelector = (state: RootState) => state.app.steps
export const stepsPerWeekAndMonthSelector = (state: RootState) => state.app.stepsWeekAndMonth

export default appSlice.reducer
