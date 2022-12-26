import { AxiosResponse } from 'axios'
import { $api } from '../http'
import { ICommandList, IMembersCommandList } from '../models/IChallenge'
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

  static async getChallengesTeam(id:number):Promise<AxiosResponse<{data:ICommandList[]}>> {
    return $api.get(
      `/v2/challenge-teams/?token=${localStorage.getItem('token')}&challenge=${id}`
    )
  }
  static async getMembersCommand(id:number):Promise<AxiosResponse<{data:IMembersCommandList}>> {
    return $api.get(
      `/v2/challenge-teams/${id}?token=${localStorage.getItem('token')}`
    )
  }

  static async challengeJoin(id: number) {
    return $api.post(
      `/v2/challenges/${id}/join/?token=${localStorage.getItem('token')}`
    )
  }

  static async purposeChallengeComplete(id: number) {
    return $api.post(
      `/v2/challenges/${id}/purpose_done/?token=${localStorage.getItem('token')}`
    )
  }

  static async completeChallenge(id: number) {
    return $api.post(
      `/v2/challenges/${id}/complete/?token=${localStorage.getItem('token')}`
    )
  }
}
