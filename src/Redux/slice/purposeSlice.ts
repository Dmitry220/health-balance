import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import PurposeService from '../../services/PurposeService'
import {
    ICreatingPurpose,
    IPersonalPurposeParams,
    IPurpose
} from '../../models/IPurpose'

export interface IPurposes {
    purpose: IPurpose | null
    creatingPurpose: ICreatingPurpose
    isLoading: boolean
    challenge_id: number
}

const initialState: IPurposes = {
    purpose: null,
    creatingPurpose: {challenge: 0, quantity: 0, reward: 0, type: 1},
    isLoading: false,
    challenge_id: 0
}

export const setPurposeSteps = createAsyncThunk(
    'setPurposeSteps',
    async (data: IPersonalPurposeParams) => {
        const {type, quantity} = data

        await PurposeService.creatingPersonalPurpose(data)
    }
)

export const getPersonalPurpose = createAsyncThunk(
    'getPersonalPurpose',
    async () => {
        const response = await PurposeService.getPersonalPurpose()
        return response.data.data
    }
)

export const getChallengePurpose = createAsyncThunk(
    'getChallengePurpose',
    async (id: number) => {
        const response = await PurposeService.getChallengePurpose(id)
        return response.data.data
    }
)

export const purposesSlice = createSlice({
    name: 'purposes',
    initialState,
    reducers: {
        setPurposeChallenge: (state, action) => {
            state.creatingPurpose = {...state.creatingPurpose, [action.payload.name]: action.payload.value}
        },
        resetPurposeChallenge: (state) => {
            state.creatingPurpose = {
                type: 1,
                challenge: 0,
                quantity: 0,
                reward: 0
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            getPersonalPurpose.fulfilled,
            (state, action: PayloadAction<IPurpose>) => {
                state.purpose = action.payload
                state.isLoading = false
            }
        )
        builder.addCase(getPersonalPurpose.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getChallengePurpose.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            getChallengePurpose.fulfilled,
            (state, action: PayloadAction<IPurpose>) => {
                state.purpose = action.payload
                state.isLoading = false
            }
        )
    }
})

export const {resetPurposeChallenge, setPurposeChallenge} =
    purposesSlice.actions


export const purposeSelector = (state: RootState) => state.purposes.purpose
export const creatingPurposeSelector = (state: RootState) =>
    state.purposes.creatingPurpose
export const isLoadingSelector = (state: RootState) => state.purposes.isLoading

export default purposesSlice.reducer
