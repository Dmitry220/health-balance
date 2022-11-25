import { configureStore } from '@reduxjs/toolkit'
import {appSlice} from "./slice/appSlice";
import { creatingChallengeSlice } from './slice/challengeSlice';
import {quizSlice} from "./slice/quizSlice";
import { authSlice } from './slice/authSlice';
import {accessRecoverySlice} from "./slice/accessRecoverySlice";
import {profileSlice} from './slice/profileSlice';
import { userSlice } from './slice/userSlice';
import {shopSlice} from './slice/shopSlice';


export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        quiz: quizSlice.reducer,
        auth: authSlice.reducer,
        creatingChallenge: creatingChallengeSlice.reducer,
        recovery: accessRecoverySlice.reducer,
        profile: profileSlice.reducer,
        user: userSlice.reducer,
        shop: shopSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch