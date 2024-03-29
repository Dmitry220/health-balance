import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appSlice } from './slice/appSlice'
import { challengeSlice } from './slice/challengeSlice'
import { healthIndexSlice } from './slice/healthIndexSlice'
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
import { trackerSlice } from './slice/trackerSlice'
import { leaderboardSlice } from './slice/leaderBoardSlice'
import { settingsSlice } from './slice/settingsSlice'
import { platformApi } from '../services/PlatformService'
import { authApi } from '../services/AuthService'
import { consultationApi } from '../services/ConsultationService'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['shop', 'settings', 'visitedPages']
}

const reducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  app: appSlice.reducer,
  auth: authSlice.reducer,
  challenges: challengeSlice.reducer,
  recovery: accessRecoverySlice.reducer,
  profile: profileSlice.reducer,
  user: userSlice.reducer,
  shop: shopSlice.reducer,
  visitedPages: visitedPagesSlice.reducer,
  lessons: lessonsSlice.reducer,
  purposes: purposesSlice.reducer,
  news: newsSlice.reducer,
  tracker: trackerSlice.reducer,
  healthIndex: healthIndexSlice.reducer,
  leaderboard: leaderboardSlice.reducer,
  settings: settingsSlice.reducer,
  [platformApi.reducerPath]: platformApi.reducer,
  [consultationApi.reducerPath]: consultationApi.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/clearResults') {
    state = undefined
  }
  return persistedReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([
      platformApi.middleware,
      authApi.middleware,
      consultationApi.middleware
    ]),
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
