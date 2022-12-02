import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import { INewChallenge } from '../../models/IChallenge';
import ChallengeService from '../../services/ChallengeService';

const END_DATE = new Date()
END_DATE.setDate(END_DATE.getDate() + 3)

export interface IChallenge {
    creatingChallenge:{
        platform: number,
        title: string,
        description: string,
        type: 1|2|3,
        image: string,
        startDate: Date,
        endDate: Date,
        team_amount: number,
        max_peoples: number
    },
    disabledButton?: boolean,
    challenges: INewChallenge[] | [],
    isLoading: boolean,
    challenge_id: number,
    challenge: INewChallenge | null
}


const initialState: IChallenge = {
    creatingChallenge:{
        platform: 0,
        title: '',
        description: '',
        type: 1,
        image: '',
        startDate: new Date(),
        endDate: END_DATE,
        team_amount: 0,  
        max_peoples: 0      
    },
    disabledButton: true,
    challenges:[],
    isLoading: false,
    challenge_id: 0,
    challenge: null
}


export const creatingChallenge = createAsyncThunk<unknown>(
    'creatingChallenge',
    async (arg,{getState}) => {      
         const state:any = getState()
            console.log((state.creatingChallenge.creatingChallenge.startDate).getTime()/1000);
            const formData = new FormData()
            formData.append("platform",state.creatingChallenge.creatingChallenge.platform)
            formData.append("title",state.creatingChallenge.creatingChallenge.title)
            formData.append("description",state.creatingChallenge.creatingChallenge.description)
            formData.append("type",state.creatingChallenge.creatingChallenge.type)
            formData.append("image",state.creatingChallenge.creatingChallenge.image)
            formData.append("start_date",''+(state.creatingChallenge.creatingChallenge.startDate).getTime()/1000)
            formData.append("end_date",''+(state.creatingChallenge.creatingChallenge.startDate).getTime()/1000)
            formData.append("team_amount",state.creatingChallenge.creatingChallenge.team_amount)
            formData.append("max_peoples",state.creatingChallenge.creatingChallenge.max_peoples)            
        try{
            const response = await ChallengeService.creatingChallenge(formData)      
            //console.log(response);                
             
            const formDataPurpose = new FormData()
            formDataPurpose.append('quantity', state.purposes.creatingPurpose.quantity)
            formDataPurpose.append('type', state.purposes.creatingPurpose.type)
            formDataPurpose.append('reward', state.purposes.creatingPurpose.reward)
            formDataPurpose.append('challenge', response.data.challenge_id)               
                
            const responsepurpose = await ChallengeService.creatingPurpose(formDataPurpose)
            console.log(responsepurpose);  
            return await response.data.challenge_id                   
        }catch(e){
            console.log(e);            
        }            
    }
)

export const getListChallenges = createAsyncThunk(
    'challenges',
    async () => {
        const response = await ChallengeService.getChallenges()
        return await response.data.data
    }
)

export const getChallengeById = createAsyncThunk(
    'getChallengeById',
    async (id:number) => {
        const response = await ChallengeService.getChallengeById(id)
        return await response.data.data
    }
)

export const creatingChallengeSlice = createSlice({
    name: 'creating-challenge',
    initialState,
    reducers: {
        setPlatformChallenge: (state, action) => {
            state.creatingChallenge.platform = action.payload
        },
        setTypeChallenge: (state, action) => {
            state.creatingChallenge.type = action.payload
        },
        setStartDateChallenge: (state, action) => {
            state.creatingChallenge.startDate = action.payload
        },
        setEndDateChallenge: (state, action) => {
            state.creatingChallenge.endDate = action.payload
        },
        setTitleChallenge: (state, action) => {
            if(action.payload.length <= 65) state.creatingChallenge.title = action.payload
        },
        setDescriptionChallenge: (state, action) => {
            if(action.payload.length <= 180) state.creatingChallenge.description = action.payload
        },
        setMaxPeoplesChallenge: (state, action) => {
            state.creatingChallenge.max_peoples = action.payload
        },
        setTeamAmountChallenge: (state, action) => {
            state.creatingChallenge.team_amount = action.payload
        },    
        setImageChallenge: (state, action) => {
            state.creatingChallenge.image = action.payload
        }, 
        setDisabledButton: (state, action) => {
            state.disabledButton = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getListChallenges.fulfilled, (state, action:PayloadAction<INewChallenge[]>) => {
            state.challenges = action.payload
            state.isLoading = false
        })
        builder.addCase(getListChallenges.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(creatingChallenge.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(creatingChallenge.fulfilled, (state, action:PayloadAction<any>) => {
            state.challenge_id = action.payload
            state.isLoading = false
        })
        builder.addCase(getChallengeById.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getChallengeById.fulfilled, (state, action:PayloadAction<INewChallenge>) => {
            state.challenge = action.payload
            state.isLoading = false
        })
    }
})

export const {setDescriptionChallenge,setDisabledButton,setEndDateChallenge,setMaxPeoplesChallenge,setPlatformChallenge,
setStartDateChallenge,setTeamAmountChallenge,setTitleChallenge,setTypeChallenge,setImageChallenge} = creatingChallengeSlice.actions


export const platformCreatingChallengeSelector = (state: RootState) => state.creatingChallenge.creatingChallenge.platform
export const disableButtonChallengeSelector = (state: RootState) => state.creatingChallenge.disabledButton
export const typeCreatingChallengeSelector = (state: RootState) => state.creatingChallenge.creatingChallenge.type
export const titleCreatingChallengeSelector = (state: RootState) => state.creatingChallenge.creatingChallenge.title
export const descriptionCreatingChallengeSelector = (state: RootState) => state.creatingChallenge.creatingChallenge.description
export const imageCreatingChallengeSelector = (state: RootState) => state.creatingChallenge.creatingChallenge.image
export const startDateCreatingChallengeSelector = (state: RootState) => state.creatingChallenge.creatingChallenge.startDate
export const endDateCreatingChallengeSelector = (state: RootState) => state.creatingChallenge.creatingChallenge.endDate
export const maxPeoplesCreatingChallengeSelector = (state: RootState) => state.creatingChallenge.creatingChallenge.max_peoples
export const teamAmountCreatingChallengeSelector = (state: RootState) => state.creatingChallenge.creatingChallenge.team_amount

export const listChallengesSelector = (state: RootState) => state.creatingChallenge.challenges

export const isLoadingSelector = (state: RootState) => state.creatingChallenge.isLoading

export const challengeIdSelector = (state: RootState) => state.creatingChallenge.challenge_id

export const challengeSelector = (state: RootState) => state.creatingChallenge.challenge

export default creatingChallengeSlice.reducer
