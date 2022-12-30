import { AxiosResponse } from 'axios'
import { $api } from '../http'
import { ILeaderBoardChallenge, ILeaderBoardChallengTeam, ILeaderBoardResponse } from '../models/ILeaderBoard'

export default class LeaderboardService {

  static async leaderboard():Promise<AxiosResponse<ILeaderBoardResponse>> {
    return $api.get(
      `/v2/leaderboard/?token=${localStorage.getItem('token')}`
    )
  }

  static async leaderboardChallenge(idChallenge:number):Promise<AxiosResponse<{data:ILeaderBoardChallenge[]}>> {
    return $api.get(
      `/v2/leaderboard/challenge/${idChallenge}?token=${localStorage.getItem('token')}`
    )
  }

  static async leaderboardTeams(idChallenge:number):Promise<AxiosResponse<{data:ILeaderBoardChallengTeam[]}>> {
    return $api.get(
      `/v2/leaderboard/challenge-teams/${idChallenge}?token=${localStorage.getItem('token')}`
    )
  }
}
