import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {
  IChallengeCard,
  ICommandList,
  ICreatingChallenge,
  IListCustomersPersonalChallenge,
  IMembersCommandList
} from '../../models/IChallenge'
import ChallengeService, {challengesApi} from '../../services/ChallengeService'

const END_DATE = new Date()
END_DATE.setDate(END_DATE.getDate() + 3)

export interface IChallenge {
  creatingChallenge: ICreatingChallenge
  disabledButton?: boolean
  activeChallenges: IChallengeCard[] | []
  newChalenges: IChallengeCard[] | []
  isLoading: boolean
  challenge_id: number
  challenge: IChallengeCard | null
  commandList: ICommandList[]
  membersCommandList: IMembersCommandList
  customers: IListCustomersPersonalChallenge[]
  error: boolean
}

const initialState: IChallenge = {
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
  activeChallenges: [],
  newChalenges: [],
  isLoading: false,
  challenge_id: 0,
  challenge: null,
  commandList: [],
  membersCommandList: { customers: [], title: '' },
  customers: [],
  error: false
}


export const getListChallenges = createAsyncThunk('challenges', async () => {
  const response = await ChallengeService.getChallenges()
  return await response.data.data
})

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
    //Получение списка всех челелнджей
    builder.addCase(
      getListChallenges.fulfilled,
      (state, action: PayloadAction<IChallengeCard[]>) => {
        const allChallenges = action.payload
        state.activeChallenges = allChallenges.filter(
          (challenge) => challenge.active === 1
        )
        state.newChalenges = allChallenges.filter(
          (challenge) => challenge.active === 0
        )
        state.isLoading = false
      }
    )
    //Включение прелоадера в получении челленджей
    builder.addCase(getListChallenges.pending, (state) => {
      state.isLoading = true
    })
    //Обработка ошибок в получение списка всех челленджей
    builder.addCase(getListChallenges.rejected, (state) => {
      state.isLoading = false
      state.activeChallenges = []
    })


    //Включение прелоадера в получении челленджа по id
    builder.addCase(getChallengeById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getChallengeById.fulfilled,
      (state, action: PayloadAction<IChallengeCard>) => {
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

export const newChallengesSelector = (state: RootState) =>
  state.challenges.newChalenges
export const activeChallengesSelector = (state: RootState) =>
  state.challenges.activeChallenges

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
