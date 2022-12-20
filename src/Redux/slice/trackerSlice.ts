import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IChallengeCard } from '../../models/IChallenge'
import ChallengeService from '../../services/ChallengeService'
import { ICreatingTracker, IGetTracker } from '../../models/ITracker'
import TrackerService from '../../services/TrackerService'

const END_DATE = new Date()
END_DATE.setDate(END_DATE.getDate() + 3)

export interface ITracker {
  creatingTracker: ICreatingTracker,
  tracker: IGetTracker,
  isLoading: boolean,
  countWater: number
  
}

const initialState: ITracker = {
	creatingTracker: {fruits:0,weight: 60,wake_up_time:"06:20"},
	tracker: {id:0,fruits:0,weight: 60,wake_up_time:"06:20"},
	isLoading: false,
  countWater: 0
 
}

export const creatingTracker = createAsyncThunk<unknown>(
  'creatingTracker',
  async (arg, { getState }) => {
    const state: any = getState()   
    const formData = new FormData()
    formData.append('wake_up_time',state.tracker.creatingTracker.wake_up_time)
    formData.append('weight', state.tracker.creatingTracker.weight)
    formData.append('fruits', state.tracker.creatingTracker.fruits)
   const response = await TrackerService.creatingTracker(formData)
	console.log(response);  
  }
)

export const getTracker = createAsyncThunk('getTracker', async () => {
  const response = await TrackerService.getTracker()
  return response.data.data
})



export const trackerSlice = createSlice({
  name: 'trackerSlice',
  initialState,
  reducers: {
    setFruitsCreatingTracker: (state, action) => {
      state.tracker.fruits = action.payload
    },
    setWeightCreatingTracker: (state, action) => {
      state.tracker.weight = action.payload
    },
    setWakeUpCreatingTracker: (state, action) => {
      state.tracker.wake_up_time = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTracker.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getTracker.fulfilled,
      (state, action: PayloadAction<IGetTracker>) => {
        state.tracker = action.payload
        state.countWater = +(action.payload.weight*35/1000).toFixed(1)
        state.isLoading = false
      }
    )
  }
})

export const {
 setFruitsCreatingTracker,setWakeUpCreatingTracker,setWeightCreatingTracker
} = trackerSlice.actions

export const creatingTrackerSelector = (state: RootState) =>state.tracker.creatingTracker
export const trackerSelector = (state: RootState) =>state.tracker.tracker
export const countWaterSelector = (state: RootState) =>state.tracker.countWater
export const isLoadingSelector = (state: RootState) => state.tracker.isLoading


export default trackerSlice.reducer
