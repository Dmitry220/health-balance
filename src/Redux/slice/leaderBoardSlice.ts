import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import LeaderboardService from '../../services/LeaderboardService'
import { ILeaderBoardResponse, ILeaderBoardItem } from '../../models/ILeaderBoard'

export interface ILeaderBoardSlice {
  topToday: ILeaderBoardItem[],
  topMonth: ILeaderBoardItem[],
  topYear: ILeaderBoardItem[],
}

const initialState: ILeaderBoardSlice = {
	topToday: [],
	topMonth: [],
	topYear: [],
}

export const leaderboard = createAsyncThunk(
  'leaderboard',
  async () => {
    const response = await LeaderboardService.leaderboard()
    return response.data
  }
)

export const leaderboardSlice = createSlice({
  name: 'leaderboardSlice',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(
      leaderboard.fulfilled,
      (state, action: PayloadAction<ILeaderBoardResponse>) => {
        state.topToday = action.payload.data.today
        state.topMonth = action.payload.data.month
		    state.topYear = action.payload.data.year
      }
    )   
  }
})

export const {} = leaderboardSlice.actions

export const topTodaySelector = (state: RootState) => state.leaderboard.topToday
export const topMonthSelector = (state: RootState) => state.leaderboard.topMonth
export const topYearSelector = (state: RootState) => state.leaderboard.topYear


export default leaderboardSlice.reducer
