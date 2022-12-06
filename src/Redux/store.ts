import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appSlice } from './slice/appSlice'
import { creatingChallengeSlice } from './slice/challengeSlice'
import { quizSlice } from './slice/quizSlice'
import { authSlice } from './slice/authSlice'
import { accessRecoverySlice } from './slice/accessRecoverySlice'
import { profileSlice } from './slice/profileSlice'
import { userSlice } from './slice/userSlice'
import { shopSlice } from './slice/shopSlice'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import { visitedPagesSlice } from './slice/visitedPageSlice'
import { lessonsSlice } from './slice/lessonsSlice'
import { purposesSlice } from './slice/purposeSlice'
import { newsSlice } from './slice/newsSlice'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['visitedPages']
}

const reducer = combineReducers({
  app: appSlice.reducer,
  quiz: quizSlice.reducer,
  auth: authSlice.reducer,
  creatingChallenge: creatingChallengeSlice.reducer,
  recovery: accessRecoverySlice.reducer,
  profile: profileSlice.reducer,
  user: userSlice.reducer,
  shop: shopSlice.reducer,
  visitedPages: visitedPagesSlice.reducer,
  lessons: lessonsSlice.reducer,
  purposes: purposesSlice.reducer,
  news: newsSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
