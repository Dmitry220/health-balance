import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {quizAPI} from "../../API/Api-quiz";


export interface IQuestions {
    id: string,
    question: string,
    tag: string,
    answer_type: string,
    answers: any
}

interface QuizState {
    questions: Array<IQuestions>,
    blocks: string | null,
    last_step: number,
    progress: any
}


const initialState: QuizState = {
    progress: {
        title: "",
        step: 1
    },
    questions: [],
    blocks: null,
    last_step: 0,
}

export const fetchGetQuestionnaire = createAsyncThunk<QuizState>(
    'answers',
    async () => {
        const response = await quizAPI.getQuestionnaire()
        return await response.data
    }
)


export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        // fetchGetQuestionnaire: (state, action) => {
        //     state.questions = action.payload
        //     //state.passedTests = action.payload.filter(item=>item.status === 2)
        // },
        // setSelectedTest: (state, action) => {
        //     state.selectedTest = action.payload
        //     state.list.push()
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetQuestionnaire.fulfilled, (state, action:PayloadAction<QuizState>) => {
            state.questions = action.payload.questions
        })
    }
})

export const {} = quizSlice.actions


export const questions = (state: RootState) => state.quiz.questions

export default quizSlice.reducer
