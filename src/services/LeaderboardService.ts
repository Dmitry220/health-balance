import {AxiosResponse} from 'axios'
import {$api} from '../http'
import {
    ILeaderBoardChallenge,
    ILeaderBoardChallengTeam,
    ILeaderBoardItem,
    ILeaderBoardResponse
} from '../models/ILeaderBoard'
import {api, ISuccessResponse} from "./api";
import {ICreatingTracker, IGetTracker, ITrack, ITracks, IUpdateTracker} from "../models/ITracker";

export default class LeaderboardService {

    static async leaderboard(): Promise<AxiosResponse<ILeaderBoardResponse>> {
        return $api.get(
            `leaderboard/?token=${localStorage.getItem('token')}`
        )
    }

    static async leaderboardChallenge(idChallenge: number): Promise<AxiosResponse<{ data: ILeaderBoardChallenge[] }>> {
        return $api.get(
            `leaderboard/challenge/${idChallenge}?token=${localStorage.getItem('token')}`
        )
    }

    static async leaderboardTeams(idChallenge: number): Promise<AxiosResponse<{ data: ILeaderBoardChallengTeam[] }>> {
        return $api.get(
            `leaderboard/challenge-teams/${idChallenge}?token=${localStorage.getItem('token')}`
        )
    }
}
export const leaderboardApi = api.injectEndpoints({
    endpoints: (build) => ({
        leaderboard: build.query<ILeaderBoardResponse, null>({
            query: () => `leaderboard/?token=${localStorage.getItem('token')}`,
            transformResponse: (response: { data: ILeaderBoardResponse }): ILeaderBoardResponse => response.data,
        }),

        leaderboardChallenge: build.query<ILeaderBoardChallenge[], number>({
            query: (idChallenge) => `leaderboard/challenge/${idChallenge}?token=${localStorage.getItem('token')}`,
            transformResponse: (response: { data: ILeaderBoardChallenge[] }): ILeaderBoardChallenge[] => response.data
        }),
        leaderboardTeams: build.query<ILeaderBoardChallengTeam[], number>({
            query: (idChallenge) => `leaderboard/challenge-teams/${idChallenge}?token=${localStorage.getItem('token')}`,
            transformResponse: (response: { data: ILeaderBoardChallengTeam[] }): ILeaderBoardChallengTeam[] => response.data
        })
    }),

})

export const {
    useLeaderboardChallengeQuery,
    useLeaderboardTeamsQuery,
    useLeaderboardQuery
} = leaderboardApi