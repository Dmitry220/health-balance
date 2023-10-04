import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {ICreatingNews} from '../../models/INews'

export interface INewsSlice {
    creatingNews: ICreatingNews,
    previewImage: string
}

const initialState: INewsSlice = {
    creatingNews: {
        annotation: '',
        content: '',
        image: '',
        title: '',
        category: 0,
        push: 0
    },
    previewImage: ''
}


export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setPreviewImage: (state, action) => {
            state.previewImage = action.payload
        },
        handlerNews: (state, action: PayloadAction<ICreatingNews>) => {
            state.creatingNews = action.payload
        },
        resetDataNews: (state) => {
            state.creatingNews = initialState.creatingNews
            state.previewImage = ''
        }
    },
    extraReducers: (builder) => {
    }
})

export const {
    resetDataNews,
    handlerNews,
    setPreviewImage
} = newsSlice.actions


export const creatingNewsSelector = (state: RootState) =>
    state.news.creatingNews
export const previewImageSelector = (state: RootState) =>
    state.news.previewImage

export default newsSlice.reducer
