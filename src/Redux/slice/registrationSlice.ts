import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {quizAPI} from "../../API/Api-quiz";


export interface IRegistration {
    email: string,
    telephone: string,
    password: string,
    nameUser: string,
    surName: string,
    day: string,
    month: string,
    year: string,
    gender: string,
    platform: string,
    avatar: string,
    disabledButton?: boolean
}


const initialState: IRegistration = {
    email: '',
    telephone: '',
    password: '',
    nameUser: '',
    surName: '',
    day: '15',
    month: '6',
    year: '2000',
    gender: 'Мужской',
    platform: '',
    avatar:'',
    disabledButton: true
}


export const requestRegistration = createAsyncThunk(
    'requestRegistration',
    async () => {
        // const response = await quizAPI.getQuestionnaire()
        // return await response.data
    }
)


export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setEmail: (state, action) => {            
            state.email = action.payload
        },
        setPassword: (state, action) => {            
            state.password = action.payload
        },
        setTelephone: (state, action) => {            
            state.telephone = action.payload
        },
        setNameUser: (state, action) => {            
            state.nameUser = action.payload
        },
        setSurname: (state, action) => {            
            state.surName = action.payload
        },
        setDay: (state, action) => {            
            state.day = action.payload
        },
        setMonth: (state, action) => {            
            state.month = action.payload
        },
        setYear: (state, action) => {            
            state.year = action.payload
        },
        setGender: (state, action) => {            
            state.gender = action.payload
        },
        setPlatform: (state, action) => {            
            state.platform = action.payload
        },    
        setDisabledButton: (state, action) => {            
            state.disabledButton = action.payload
        },  
        setAvatarRegistartion: (state, action) => {            
            state.avatar = action.payload
        },     
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchGetQuestionnaire.fulfilled, (state, action:PayloadAction<QuizState>) => {
    //         state.questions = action.payload.questions
    //     })
    // }
})

export const {setEmail, setDisabledButton,setDay,setGender,
    setMonth,setNameUser,setPassword,setPlatform,
    setSurname,setTelephone,setYear, setAvatarRegistartion} = registrationSlice.actions


export const emailSelector = (state: RootState) => state.registration.email
export const disableButtonSelector = (state: RootState) => state.registration.disabledButton
export const passwordSelector = (state: RootState) => state.registration.password
export const telephoneSelector = (state: RootState) => state.registration.telephone
export const nameUserSelector = (state: RootState) => state.registration.nameUser
export const surNameSelector = (state: RootState) => state.registration.surName
export const daySelector = (state: RootState) => state.registration.day
export const monthSelector = (state: RootState) => state.registration.month
export const yearSelector = (state: RootState) => state.registration.year
export const genderSelector = (state: RootState) => state.registration.gender
export const platformSelector = (state: RootState) => state.registration.platform


export default registrationSlice.reducer
