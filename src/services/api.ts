import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {API_URL} from "../http";

export interface ISuccessResponse {
    success: boolean
}

export const api = createApi({
    reducerPath: "api",
    tagTypes: ['tracks', 'newTracker','deleteTracker', 'updateTracker','interruptPoll'],
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: () => ({}),
});