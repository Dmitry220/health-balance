import {$api} from '../http'
import {ICreatingLecture, ILesson, ITaskToCompleted} from '../models/ILessons'
import {
    ICreatingTracker,
    IGetTracker,
    ITrack,
    ITracks,
    IUpdateTracker
} from '../models/ITracker'
import {api, ISuccessResponse} from './api'


export default class LessonService {
    static async createLesson(data: ICreatingLecture) {
        return $api.post(`lessons?token=${localStorage.getItem('token')}`, data, {
            headers: {
                accept: 'application/json',
                'Content-Type': `multipart/form-data`
            }
        })
    }

    static async complete(
        dataTaskToCompleted: { answer?: any; file?: Blob },
        id: number
    ) {
        return $api.post(
            `lessons/${id}/complete?token=${localStorage.getItem('token')}`,
            dataTaskToCompleted,
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': `multipart/form-data`
                }
            }
        )
    }

    static getLessons(id: number) {
        return $api.get(
            `lessons?token=${localStorage.getItem('token')}&challenge=${id}`
        )
    }

    static getLessonById(id: number) {
        return $api.get(`lessons/${id}?token=${localStorage.getItem('token')}`)
    }

    static checkTask(id: number) {
        return $api.get(
            `lessons/${id}/check?token=${localStorage.getItem('token')}`
        )
    }
}


export const lessonsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getLessons: build.query<ILesson[], number>({
            query: (id) => `lessons?token=${localStorage.getItem('token')}&challenge=${id}`,
            transformResponse: (response: { data: ILesson[] }): ILesson[] => response.data,
        }),
        getLessonById: build.query<ILesson, number>({
            query: (id) => `lessons/${id}?token=${localStorage.getItem('token')}`,
            transformResponse: (response: { data: ILesson }): ILesson => response.data,
        }),
        checkTask: build.query<{ exist: boolean }, number>({
            query: (id) => `lessons/${id}/check?token=${localStorage.getItem('token')}`,
        }),


        completeLesson: build.mutation<ISuccessResponse, ITaskToCompleted>({
            query: ({id, dataTaskToCompleted}) => ({
                url: `lessons/${id}/complete?token=${localStorage.getItem('token')}`,
                method: 'POST',
                body: dataTaskToCompleted
            }),
            invalidatesTags: [{type: 'newTracker'}]
        }),

    })
})

export const {
    useGetLessonsQuery,
    useGetLessonByIdQuery,
    useCheckTaskQuery,
    useCompleteLessonMutation
}
    = lessonsApi
