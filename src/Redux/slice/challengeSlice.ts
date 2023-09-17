import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {
  IChallenge,
  ICommandList,
  ICreatingChallenge,
  IListCustomersPersonalChallenge,
  IMembersCommandList
} from '../../models/IChallenge'
import ChallengeService, {challengesApi} from '../../services/ChallengeService'

const END_DATE = new Date()
END_DATE.setDate(END_DATE.getDate() + 3)

export interface IChallenges {
  creatingChallenge: ICreatingChallenge
  disabledButton?: boolean
  isLoading: boolean
  challenge_id: number
  challenge: IChallenge | null
  commandList: ICommandList[]
  membersCommandList: IMembersCommandList
  customers: IListCustomersPersonalChallenge[]
  error: boolean,

}

const initialState: IChallenges = {
  creatingChallenge: {
    platform: 0,
    title: '',
    description: '',
    type: 3,
    image: '',
    start_date: new Date(),
    end_date: END_DATE,
    team_amount: '',
    max_peoples: '',
    customers: []
  },
  disabledButton: true,
  isLoading: false,
  challenge_id: 0,
  challenge: null,
  commandList: [],
  membersCommandList: { customers: [], title: '' },
  customers: [],
  error: false
}


export const getChallengeById = createAsyncThunk(
  'getChallengeById',
  async (id: number) => {
    const response = await ChallengeService.getChallengeById(id)
    return await response.data.data
  }
)

export const getCommandList = createAsyncThunk(
  'getCommandList',
  async (id: number) => {
    const response = await ChallengeService.getChallengesTeam(id)
    return await response.data.data
  }
)

export const getMembersCommandList = createAsyncThunk(
  'getMembersCommandList',
  async (id: number) => {
    const response = await ChallengeService.getMembersCommand(id)
    return response.data.data
  }
)

export const getCustomersPersonalChallenge = createAsyncThunk(
  'getCustomersPersonalChallenge',
  async () => {
    const response = await ChallengeService.customersPersonalChallenge()
    return response.data.data
  }
)

export const challengeSlice = createSlice({
  name: 'challengeSlice',
  initialState,
  reducers: {
    setDataChallenge:(state ,action:PayloadAction<any>) => {
      state.creatingChallenge = {...state.creatingChallenge, [action.payload.name]:action.payload.value}
    },
    setDisabledButton: (state, action) => {
      state.disabledButton = action.payload
    },
    setCustomersPersonalChallenge: (state, action: PayloadAction<number>) => {
      if (action.payload === 0) {
        state.creatingChallenge.customers = []
      } else {
        if ((state.creatingChallenge.customers as number[])?.includes(action.payload)) {
          state.creatingChallenge.customers =
              (state.creatingChallenge.customers as number[]).filter(
              (item) => item !== action.payload
            )
        } else {
          state.creatingChallenge.customers = [
            ...state.creatingChallenge.customers as number[],
            action.payload
          ]
        }
      }
    }
  },
  extraReducers: (builder) => {

    //Включение прелоадера в получении челленджа по id
    builder.addCase(getChallengeById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getChallengeById.fulfilled,
      (state, action: PayloadAction<IChallenge>) => {
        state.challenge = action.payload
        state.isLoading = false
      }
    )
    //Получение списка доступных команд
    builder.addCase(
      getCommandList.fulfilled,
      (state, action: PayloadAction<ICommandList[]>) => {
        state.commandList = action.payload
      }
    )
    //Включение прелоадера при получение участников команд
    builder.addCase(getMembersCommandList.pending, (state) => {
      state.isLoading = true
    })
    //Получение списка участников команды
    builder.addCase(
      getMembersCommandList.fulfilled,
      (state, action: PayloadAction<IMembersCommandList>) => {
        state.membersCommandList = action.payload
        state.isLoading = false
      }
    )
    //Включение прелоадера при получении участников личного челенджа
    builder.addCase(getCustomersPersonalChallenge.pending, (state) => {
      state.isLoading = true
    })
    //Получение участников личного челенджа
    builder.addCase(
      getCustomersPersonalChallenge.fulfilled,
      (state, action: PayloadAction<IListCustomersPersonalChallenge[]>) => {
        state.customers = action.payload
        state.isLoading = false
      }
    )

    //id созданного челленджа
    builder.addMatcher(challengesApi.endpoints.creatingChallenge.matchFulfilled,
        (state, action) => {
          state.challenge_id = action.payload.challenge_id
          state.creatingChallenge = initialState.creatingChallenge
        }
    );
  }
})

export const {
  setDisabledButton,
  setCustomersPersonalChallenge,
  setDataChallenge
} = challengeSlice.actions


export const creatingChallengeSelector = (state: RootState) =>
    state.challenges.creatingChallenge
export const disableButtonChallengeSelector = (state: RootState) =>
  state.challenges.disabledButton

export const isLoadingSelector = (state: RootState) =>
  state.challenges.isLoading

export const challengeIdSelector = (state: RootState) =>
  state.challenges.challenge_id

export const challengeSelector = (state: RootState) =>
  state.challenges.challenge
export const commandListSelector = (state: RootState) =>
  state.challenges.commandList
export const membersCommandListSelector = (state: RootState) =>
  state.challenges.membersCommandList
export const customersPersonalChallengeSelector = (state: RootState) =>
  state.challenges.customers



export default challengeSlice.reducer
