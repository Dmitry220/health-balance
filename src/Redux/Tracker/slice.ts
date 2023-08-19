import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {IGetTracker, ITrack, ITracks} from "../../models/ITracker";
import {tracksSleepDaysWeek} from "../../utils/globalConstants";


interface IPayloadCurrentDay {
    date: string,
    tracks?: ITracks
}

export interface ITracker {
    tracker: IGetTracker;
    isLoading: boolean;
    currentDay: ITrack | undefined;
    dataSleep: ITrack[];
    tracks: ITracks;
    selectedDate: Date
}

const initialState: ITracker = {
    tracker: {id: 0, fruits: 0, weight: 60, wake_up_time: "06:20"},
    isLoading: false,
    dataSleep: [],
    currentDay: undefined,
    tracks: {
        fruitTrack: [],
        sleepTrack: [],
        waterTrack: [],
    },
    selectedDate: new Date()
};


export const slice = createSlice({
    name: "trackerSlice",
    initialState,
    reducers: {
        setFruitsCreatingTracker: (state, action) => {
            state.tracker.fruits = action.payload;
        },
        setWeightCreatingTracker: (state, action) => {
            state.tracker.weight = action.payload;
        },
        setWakeUpCreatingTracker: (state, action) => {
            state.tracker.wake_up_time = action.payload;
        },
        updateDataSleepTrack: (state,{payload}:PayloadAction<ITracks>) => {
            let difference:number = tracksSleepDaysWeek.length - payload.sleepTrack.length
            let newArraySleepTrack: ITrack[] = [...payload.sleepTrack]

            for (let i = 0; i < difference; i++) {
                console.log(difference, payload)
                const element = payload.sleepTrack[i]?.type
                newArraySleepTrack.unshift({
                    id: -i-1,
                    type: element === 4 ? 1 : 4,
                    additional: tracksSleepDaysWeek[difference-i-1].day,
                    completed: false,
                    notification_send: false,
                    send_time: 0,
                    sleep_time: 0
                })
            }
            state.dataSleep = newArraySleepTrack
        },
        setCurrentDay: (state, {payload}: PayloadAction<IPayloadCurrentDay>) => {
            const indexWeek =
                new Date(payload.date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$2/$1/$3')).getDay() === 0
                    ? 6
                    : new Date(payload.date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$2/$1/$3')).getDay() -
                    1
            if(payload.tracks){
                state.currentDay = payload.tracks.sleepTrack.find(
                    (item) => item.additional === tracksSleepDaysWeek[indexWeek * 2].day && item.type === 1
                )
            }
        },
        setSelectedDateTracker:(state,action:PayloadAction<Date>)=>{
            state.selectedDate = action.payload
        }
    },
    extraReducers: (builder) => {},
});

export const {
    setFruitsCreatingTracker,
    setWakeUpCreatingTracker,
    setWeightCreatingTracker,
    updateDataSleepTrack,
    setCurrentDay,
    setSelectedDateTracker
} = slice.actions;


export const trackerSelector = (state: RootState) => state.tracker.tracker;

export const isLoadingSelector = (state: RootState) => state.tracker.isLoading;

export const dataSleepSelector = (state: RootState) =>
    state.tracker.dataSleep;
export const tracksSelector = (state: RootState) => state.tracker.tracks;
export const currentDaySelector = (state: RootState) => state.tracker.currentDay;
export const selectedDayTrackerSelector = (state: RootState) => state.tracker.selectedDate;

export default slice.reducer;
