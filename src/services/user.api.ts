import {IUpdateUser, IUser} from "../models/IUsers";
import {api, ISuccessResponse} from "./api";


export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUserDataOnId: build.query<IUser, number>({
            query: (id) => `customers/${id}?token=${localStorage.getItem("token")}`,
            transformResponse: (response: { data: IUser }): IUser => response.data,
            providesTags: (result, error, arg) => {
                return [{type: 'editProfile', id: result?.email}]
            },
        }),

        editingProfile: build.mutation<ISuccessResponse, IUpdateUser>({
            query: (data) => ({
                url: `customers/?token=${localStorage.getItem("token")}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, arg) =>{
                return [{type: 'editProfile', id: arg.email || 0}]
            },
        }),
    }),

})

export const {
    useGetUserDataOnIdQuery,
    useEditingProfileMutation
} = userApi
