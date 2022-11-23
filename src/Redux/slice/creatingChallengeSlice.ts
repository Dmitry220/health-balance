import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from "../store";
import { ICreatingPurpose } from '../../models/IChallenge';
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
    purpose:ICreatingPurpose
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
    purpose:{
        challenge: 0,
        quantity: 0,
        reward: 0,
        type: 1
    }
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
             console.log(response);                     
        }catch(e){
            console.log(e);            
        }            
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
        setIdChallengePurpose: (state, action) => {
            state.purpose.challenge = action.payload
        },
        setQuantityPurpose: (state, action) => {
            state.purpose.quantity = action.payload
        },
        setRewardPurpose: (state, action) => {
            state.purpose.reward = action.payload
        },
        setTypePurpose: (state, action) => {
            state.purpose.type = action.payload
        },
    },
})

export const {setDescriptionChallenge,setDisabledButton,setEndDateChallenge,setIdChallengePurpose,setMaxPeoplesChallenge,setPlatformChallenge,setQuantityPurpose,
setRewardPurpose,setStartDateChallenge,setTeamAmountChallenge,setTitleChallenge,setTypeChallenge,setTypePurpose,setImageChallenge} = creatingChallengeSlice.actions


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

export const rewardPurposeSelector = (state: RootState) => state.creatingChallenge.purpose.reward
export const idChallengePurposeSelector = (state: RootState) => state.creatingChallenge.purpose.challenge
export const quantityPurposeSelector = (state: RootState) => state.creatingChallenge.purpose.quantity
export const typePurposeSelector = (state: RootState) => state.creatingChallenge.purpose.type

export default creatingChallengeSlice.reducer
