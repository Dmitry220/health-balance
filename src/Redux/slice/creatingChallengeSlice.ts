import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";


export interface ICreatingChallenge {
    platform: string,
    typeChallenge: string,
    reward: number,
    duration: string,
    titleChallenge: string,
    descriptionChallenge: string,
    numberTeams: string,
    participantsTeam: string,
    cover: string,
    disabledButton?: boolean
}


const initialState: ICreatingChallenge = {
    platform: '',
    typeChallenge: '',
    reward: 0,
    duration: '',
    titleChallenge: '',
    descriptionChallenge: '',
    numberTeams: '',
    participantsTeam: '',
    cover: '',
    disabledButton: true,
}


export const creatingChallengeSlice = createSlice({
    name: 'creating-challenge',
    initialState,
    reducers: {
        setPlatform: (state, action) => {
            state.platform = action.payload
        },
        setTypeChallenge: (state, action) => {
            state.typeChallenge = action.payload
        },
        setReward: (state, action) => {
            state.reward = action.payload
        },
        setDuration: (state, action) => {
            state.duration = action.payload
        },
        setTitleChallenge: (state, action) => {
            if(action.payload.length <= 65) state.titleChallenge = action.payload
        },
        setDescriptionChallenge: (state, action) => {
            if(action.payload.length <= 180) state.descriptionChallenge = action.payload
        },
        setNumberTeams: (state, action) => {
            state.numberTeams = action.payload
        },
        setParticipantsTeam: (state, action) => {
            state.participantsTeam = action.payload
        },
        setCover: (state, action) => {
            state.cover = action.payload
        },      
        setDisabledButton: (state, action) => {
            state.disabledButton = action.payload
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchGetQuestionnaire.fulfilled, (state, action:PayloadAction<QuizState>) => {
    //         state.questions = action.payload.questions
    //     })
    // }
})

export const {setCover,setDescriptionChallenge,setDisabledButton,
setDuration,setNumberTeams,setParticipantsTeam,setPlatform,setReward,setTitleChallenge,setTypeChallenge} = creatingChallengeSlice.actions


export const platformChallengeSelector = (state: RootState) => state.creatingChallenge.platform
export const disableButtonChallengeSelector = (state: RootState) => state.creatingChallenge.disabledButton
export const typeChallengeSelector = (state: RootState) => state.creatingChallenge.typeChallenge
export const rewardSelector = (state: RootState) => state.creatingChallenge.reward
export const durationSelector = (state: RootState) => state.creatingChallenge.duration
export const titleChallengeSelector = (state: RootState) => state.creatingChallenge.titleChallenge
export const descriptionSelector = (state: RootState) => state.creatingChallenge.descriptionChallenge
export const numberTeamsSelector = (state: RootState) => state.creatingChallenge.numberTeams
export const participantsTeamSelector = (state: RootState) => state.creatingChallenge.participantsTeam
export const coverSelector = (state: RootState) => state.creatingChallenge.cover

export default creatingChallengeSlice.reducer
