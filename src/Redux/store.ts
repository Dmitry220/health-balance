import { configureStore } from '@reduxjs/toolkit'
import {appSlice} from "./slice/appSlice";
import { creatingChallengeSlice } from './slice/creatingChallengeSlice';
import {quizSlice} from "./slice/quizSlice";
import { authSlice } from './slice/authSlice';
import {accessRecoverySlice} from "./slice/accessRecoverySlice";
import {userSlice} from './slice/userSlice';


export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        quiz: quizSlice.reducer,
        auth: authSlice.reducer,
        creatingChallenge: creatingChallengeSlice.reducer,
        recovery: accessRecoverySlice.reducer,
        user: userSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch