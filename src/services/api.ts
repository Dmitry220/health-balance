import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from "@reduxjs/toolkit/dist/query/react";
import {API_URL} from "../http";

export interface ISuccessResponse {
    success: boolean
}
const baseQuery = fetchBaseQuery({ baseUrl: API_URL })

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
    > = async (args, api, extraOptions = {}) => {
    const result = await baseQuery(args, api, extraOptions);
    console.log(result)
    // if (result?.error?.status === RESPONSE_CODE.NO_AUTH) { // 401
    //   //  logout(); // Optionally you can trigger some code directly here
    //     // or dispatch an action to be handled in reducer or your middleware
    //     api.dispatch("whatever action you need");
    // }
    return result;
};


export const api = createApi({
    reducerPath: "api",
    tagTypes: ['tracks', 'newTracker', 'deleteTracker', 'updateTracker', 'interruptPoll'],
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        checkToken: builder.query<ISuccessResponse, null>({
            query: () => `customers/check-token/?token=${localStorage.getItem("token")}`,
        }),
    }),
});

export const {
    useCheckTokenQuery
} = api


