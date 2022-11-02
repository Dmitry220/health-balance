import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";


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

export const fetchGetQuestionnaire = createAsyncThunk(
    'answers',
    async () => {
      const response = fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
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
        // builder.addCase(fetchGetQuestionnaire.fulfilled, (state, action:PayloadAction<QuizState>) => {
        //     state.questions = action.payload.questions
        // })
    }
})

export const {} = quizSlice.actions


export const questions = (state: RootState) => state.quiz.questions

export default quizSlice.reducer
