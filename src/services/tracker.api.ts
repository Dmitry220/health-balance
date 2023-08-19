import {AxiosResponse} from "axios";
import {$api} from "../http";
import {ICreatingTracker, IGetTracker, ITrack, ITracks} from "../models/ITracker";
import {api, ISuccessResponse} from "./api";


export default class TrackerApi {


    static async updateTracker(
        id: number,
        type: "weight" | "fruits" | "wake_up_time",
        value: string
    ): Promise<AxiosResponse<{ tracker_id: number }>> {
        const body = type + "=" + value;
        return (
            $api.patch(
                `tracker/${id}/update?token=${localStorage.getItem("token")}`,
                body, {
                    headers: {
                        "Content-Type": "text/plain",
                    },
                }
            )
        );
    }

    static async complteteTrack(id: number) {
        return (
            $api.post(
                `tracks/${id}/complete?token=${localStorage.getItem("token")}`, {}, {
                    headers: {
                        accept: "application/json",
                        "Content-Type": `multipart/form-data`,
                    },
                }
            )

        );
    }


    static async deleteTracker(): Promise<AxiosResponse<{ success: boolean }>> {
        return $api.delete(`tracker?token=${localStorage.getItem("token")}`);
    }
}

export const trackerApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTracker: build.query<IGetTracker, void>({
            query: () => `tracker/?token=${localStorage.getItem("token")}`,
            transformResponse: (response: { data: IGetTracker }): IGetTracker => response.data,
            providesTags: () => [{type: "newTracker"}]
        }),

        getTracks: build.query<ITracks, string>({
            query: (date) => `tracks/?date=${date}&token=${localStorage.getItem("token")}`,
            transformResponse: (response: { data: ITrack[] }): ITracks => {
                return {
                    fruitTrack: response.data.filter(item => item.type === 3),
                    waterTrack: response.data.filter(item => item.type === 2),
                    sleepTrack: response.data.filter(item => item.type === 1 || item.type === 4)
                };
            },
            providesTags: () => [{type: "tracks"}]
        }),

        completeTrack: build.mutation<ISuccessResponse, number>({
            query: (id) => ({
                url: `tracks/${id}/complete?token=${localStorage.getItem("token")}`,
                method: 'POST',
            }),
            invalidatesTags: [{type: 'tracks'}],
        }),

        creatingTracker: build.mutation<{ tracker_id: number }, ICreatingTracker>({
            query: (data) => ({
                url: `tracker/?token=${localStorage.getItem("token")}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{type: 'newTracker'}],
        }),

        deleteTracker: build.mutation<ISuccessResponse, null>({
            query: () => ({
                url: `tracker?token=${localStorage.getItem("token")}`,
                method: "DELETE",
            })
        }),

    }),

})

export const {useGetTrackerQuery, useGetTracksQuery, useCompleteTrackMutation, useCreatingTrackerMutation, useDeleteTrackerMutation} = trackerApi
