import { AxiosResponse } from 'axios'
import { $api } from '../http'
import { IPurposeResponse } from '../models/IPurpose'

export default class ChallengeService {
  static async creatingPurpose(
    params: FormData
  ): Promise<AxiosResponse<IPurposeResponse>> {
    return $api.post(
      `/v2/purposes/?token=${localStorage.getItem('token')}`,
      params,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async creatingChallenge(params: FormData) {
    return $api.post(
      `/v2/challenges/?token=${localStorage.getItem('token')}`,
      params,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async getChallenges() {
    return $api.get(`/v2/challenges/?token=${localStorage.getItem('token')}`)
  }

  static async getChallengeById(id: number) {
    return $api.get(
      `/v2/challenges/${id}?token=${localStorage.getItem('token')}`
    )
  }

  static async getChallengesTeam() {
    return $api.get(
      `/v2/challenge-teams/?token=${localStorage.getItem('token')}`
    )
  }

  static async challengeJoin(id: number) {
    return $api.post(
      `/v2/challenges/${id}/join/?token=${localStorage.getItem('token')}`
    )
  }
}
