import {AxiosResponse} from 'axios'
import {$api} from '../http'
import {
    IAllChallenge,
    IChallenge,
    ICommandList,
    ICreatingChallenge,
    ICreatingChallengeResponse,
    IListCustomersPersonalChallenge,
    IMembersCommandList, ITypeChallenges
} from '../models/IChallenge'
import {ICreatingPurpose, IPurposeResponse} from '../models/IPurpose'
import {api} from "./api";
import {ITrack, ITracks} from "../models/ITracker";
import {typesChallenge} from "../utils/enums";


export default class ChallengeService {

    static async getChallenges() {
        return $api.get(`challenges?token=${localStorage.getItem('token')}`)
    }

    static async getChallengeById(id: number) {
        return $api.get(`challenges/${id}?token=${localStorage.getItem('token')}`)
    }

    static async getChallengesTeam(
        id: number
    ): Promise<AxiosResponse<{ data: ICommandList[] }>> {
        return $api.get(
            `challenge-teams?token=${localStorage.getItem('token')}&challenge=${id}`
        )
    }

    static async getMembersCommand(
        id: number
    ): Promise<AxiosResponse<{ data: IMembersCommandList }>> {
        return $api.get(
            `challenge-teams/${id}?token=${localStorage.getItem('token')}`
        )
    }

    static async challengeJoin(id: number) {
        return $api.post(
            `challenges/${id}/join?token=${localStorage.getItem('token')}`
        )
    }

    static async teamJoin(id: number) {
        return $api.post(
            `challenge-teams/${id}/join?token=${localStorage.getItem('token')}`
        )
    }

    static async purposeChallengeComplete(id: number) {
        return $api.post(
            `challenges/${id}/purpose_done?token=${localStorage.getItem('token')}`
        )
    }

    static async completeChallenge(id: number) {
        return $api.post(
            `challenges/${id}/complete?token=${localStorage.getItem('token')}`
        )
    }

    static async customersPersonalChallenge(): Promise<AxiosResponse<{ data: IListCustomersPersonalChallenge[] }>> {
        return $api.get(
            `customers?token=${localStorage.getItem('token')}&curator_teams=1`
        )
    }
}

export const challengesApi = api.injectEndpoints({
    endpoints: (build) => ({
        creatingChallenge: build.mutation<ICreatingChallengeResponse, ICreatingChallenge>({
            query: (data) => ({
                url: `challebcvbnges?token=${localStorage.getItem('token')}`,
                method: 'POST',
                body: data
            })
        }),
        creatingPurpose: build.mutation<IPurposeResponse, ICreatingPurpose>({
            query: (data) => ({
                url: `purposes?token=${localStorage.getItem('token')}`,
                method: 'POST',
                body: data
            })
        }),

        getChallenges: build.query<IAllChallenge, null>({
            query: () => `challenges?token=${localStorage.getItem('token')}`,
            transformResponse: (response: { data: IChallenge[] }): IAllChallenge => {
                const newChallenges: ITypeChallenges = {personal:[],command:[],common:[],all:[]}
                const activeChallenges: ITypeChallenges = {personal:[],command:[],common:[],all:[]}
                response.data.forEach(challenge => {
                    if (!challenge.active) {
                        if (challenge.type === typesChallenge.personal) newChallenges.personal?.push(challenge)
                        else if (challenge.type === typesChallenge.command) newChallenges.command?.push(challenge)
                        else if (challenge.type === typesChallenge.common) newChallenges.common?.push(challenge)
                        newChallenges.all.push(challenge)
                    } else {
                        if (challenge.type === typesChallenge.personal) activeChallenges.personal?.push(challenge)
                        else if (challenge.type === typesChallenge.command) activeChallenges.command?.push(challenge)
                        else if (challenge.type === typesChallenge.common) activeChallenges.common?.push(challenge)
                        newChallenges.all.push(challenge)
                    }
                })
                return {
                    newChallenges,
                    activeChallenges
                }
            }
        }),


    })
})

export const {
    useCreatingChallengeMutation,
    useCreatingPurposeMutation,
    useGetChallengesQuery
} = challengesApi