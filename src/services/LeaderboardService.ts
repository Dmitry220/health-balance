import { AxiosResponse } from 'axios'
import { $api } from '../http'
import { ILeaderBoardResponse } from '../models/ILeaderBoard'

export default class LeaderboardService {

  static async leaderboard():Promise<AxiosResponse<ILeaderBoardResponse>> {
    return $api.get(
      `/v2/leaderboard/?token=${localStorage.getItem('token')}`
    )
  }
}
