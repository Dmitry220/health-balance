import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import LeaderboardService from '../../services/LeaderboardService'
import { ILeaderBoardResponse, ILeaderBoardItem, ILeaderBoardChallenge, ILeaderBoardChallengTeam } from '../../models/ILeaderBoard'

export interface ILeaderBoardSlice {
  topToday: ILeaderBoardItem[],
  topMonth: ILeaderBoardItem[],
  topYear: ILeaderBoardItem[],
  leaderboardChallenge: ILeaderBoardChallenge[] | []
  leaderboardTeamsChallenge: ILeaderBoardChallengTeam[] | []
  isLoading: boolean
}

const initialState: ILeaderBoardSlice = {
	topToday: [],
	topMonth: [],
	topYear: [],
  leaderboardChallenge: [],
  isLoading: false,
  leaderboardTeamsChallenge: []
}

export const leaderboard = createAsyncThunk(
  'leaderboard',
  async () => {
    const response = await LeaderboardService.leaderboard()
    return response.data
  }
)

export const getLeaderboardChallenge = createAsyncThunk(
  'getLeaderboardChallenge',
  async (idChallenge: number) => {
    const response = await LeaderboardService.leaderboardChallenge(idChallenge)
    return response.data.data
  }
)

export const getLeaderboardTeamsChallenge = createAsyncThunk(
  'getLeaderboardTeamsChallenge',
  async (idChallenge: number) => {
    const response = await LeaderboardService.leaderboardTeams(idChallenge)
    return response.data.data
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
    builder.addCase(
      getLeaderboardChallenge.fulfilled,
      (state, action: PayloadAction<ILeaderBoardChallenge[]>) => {
        state.leaderboardChallenge = action.payload
        state.isLoading = false
      }
    ) 
    builder.addCase(
      getLeaderboardChallenge.pending,
      (state) => {
        state.isLoading = true
      }
    ) 

    builder.addCase(
      getLeaderboardTeamsChallenge.fulfilled,
      (state, action: PayloadAction<ILeaderBoardChallengTeam[]>) => {
        state.leaderboardTeamsChallenge = action.payload
        state.isLoading = false
      }
    ) 
    builder.addCase(
      getLeaderboardTeamsChallenge.pending,
      (state) => {
        state.isLoading = true
      }
    ) 
  }
})

export const {} = leaderboardSlice.actions

export const topTodaySelector = (state: RootState) => state.leaderboard.topToday
export const topMonthSelector = (state: RootState) => state.leaderboard.topMonth
export const topYearSelector = (state: RootState) => state.leaderboard.topYear
export const leaderboardChallengeSelector = (state: RootState) => state.leaderboard.leaderboardChallenge
export const leaderboardTeamsChallengeChallengeSelector = (state: RootState) => state.leaderboard.leaderboardTeamsChallenge
export const isLoadingSelector = (state: RootState) => state.leaderboard.isLoading


export default leaderboardSlice.reducer
