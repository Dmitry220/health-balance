import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ICreatingNews, IComment, INews } from '../../models/INews'
import NewsService from '../../services/NewsService'

export interface INewsSlice {
  creatingNews: ICreatingNews
  news: INews[]
  newsById: INews | null
  isLoading: boolean
  imageNews?: any
  comments: IComment[]
  idNewComment: number
}

const initialState: INewsSlice = {
  creatingNews: {
    annotation: '',
    content: '',
    image: '',
    team: 0,
    title: '',
    category: 0,
    push: 0
  },
  isLoading: false,
  newsById: null,
  news: [],
  comments: [],
  idNewComment: 0
}

export const getNews = createAsyncThunk('getNews', async () => {
  const response = await NewsService.getNews()
  return response.data.data
})

export const getNewsById = createAsyncThunk(
  'getNewsById',
  async (id: number) => {
    const response = await NewsService.getNewsById(id)
    return response.data.data
  }
)

export const getNewsByCategory = createAsyncThunk(
  'getNewsByCategory',
  async (idRubric: number) => {
    const response = await NewsService.getNewsByCategory(idRubric)
    return response.data.data
  }
)

export const getComments = createAsyncThunk(
  'getComments',
  async (id: number) => {
    const response = await NewsService.listComments(id)
    return response.data.data
  }
)

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setTitleNews: (state, action) => {
      state.creatingNews.title = action.payload
    },
    setContentNews: (state, action) => {
      state.creatingNews.content = action.payload
    },
    setAnnotationNews: (state, action) => {
      state.creatingNews.annotation = action.payload
    },
    setImageNews: (state, action) => {
      state.creatingNews.image = action.payload
    },
    setTempImageNews: (state, action) => {
      state.imageNews = action.payload
    },
    setTeamNews: (state, action) => {
      state.creatingNews.team = action.payload
    },
    setRubricNews: (state, action) => {
      state.creatingNews.category = action.payload
    },
    setPushNews: (state, action) => {
      state.creatingNews.push = action.payload
    },
    setIdNewComment: (state, action) => {
      state.idNewComment = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      getNews.fulfilled,
      (state, action: PayloadAction<INews[]>) => {
        state.news = action.payload
        state.isLoading = false
      }
    )
    builder.addCase(getNews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getNewsById.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getNewsById.fulfilled,
      (state, action: PayloadAction<INews>) => {
        state.newsById = action.payload
        state.isLoading = false
      }
    )
    // builder.addCase(getComments.pending, (state) => {
    //   state.isLoading = true
    // })
    builder.addCase(
      getComments.fulfilled,
      (state, action: PayloadAction<IComment[]>) => {
        state.comments = action.payload
      }
    ) 
    builder.addCase(
      getNewsByCategory.pending,
      (state) => {
        state.isLoading = true
      }
    )
    builder.addCase(
      getNewsByCategory.fulfilled,
      (state, action: PayloadAction<INews[]>) => {
        state.news = action.payload
        state.isLoading = false
      }
    )
   
  }
})

export const {
  setAnnotationNews,
  setContentNews,
  setImageNews,
  setTeamNews,
  setTitleNews,
  setRubricNews,
  setPushNews,
  setTempImageNews,
  setIdNewComment
} = newsSlice.actions

export const isLoadingSelector = (state: RootState) => state.news.isLoading
export const newsSelector = (state: RootState) => state.news.news
export const newsByIdSelector = (state: RootState) => state.news.newsById
export const creatingNewsSelector = (state: RootState) =>
  state.news.creatingNews
export const tempImageNewsSelector = (state: RootState) => state.news.imageNews
export const commentsSelector = (state: RootState) => state.news.comments
export const idNewCommentSelector = (state: RootState) =>
  state.news.idNewComment

export default newsSlice.reducer
