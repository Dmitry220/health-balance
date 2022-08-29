import { configureStore } from '@reduxjs/toolkit'
import {appSlice} from "./slice/appSlice";
import { creatingChallengeSlice } from './slice/creatingChallengeSlice';
import {quizSlice} from "./slice/quizSlice";
import { registrationSlice } from './slice/registrationSlice';
import {accessRecoverySlice} from "./slice/accessRecoverySlice";


export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        quiz: quizSlice.reducer,
        registration: registrationSlice.reducer,
        creatingChallenge: creatingChallengeSlice.reducer,
        recovery: accessRecoverySlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch