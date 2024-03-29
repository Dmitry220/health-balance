import { AxiosResponse } from 'axios'
import { $api } from '../http'
import { ICommandList, ICreatingChallenge, IListCustomersPersonalChallenge, IMembersCommandList } from '../models/IChallenge'
import { ICreatingPurpose, IPurposeResponse } from '../models/IPurpose'

export default class ChallengeService {
  static async creatingPurpose(
    data: ICreatingPurpose
  ): Promise<AxiosResponse<IPurposeResponse>> {
    return $api.post(
      `purposes/?token=${localStorage.getItem('token')}`,
      data,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async creatingChallenge(data: ICreatingChallenge) {
    return $api.post(
      `challenges/?token=${localStorage.getItem('token')}`,
      data,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async getChallenges() {
    return $api.get(`challenges/?token=${localStorage.getItem('token')}`)
  }

  static async getChallengeById(id: number) {
    return $api.get(
      `challenges/${id}?token=${localStorage.getItem('token')}`
    )
  }

  static async getChallengesTeam(id:number):Promise<AxiosResponse<{data:ICommandList[]}>> {
    return $api.get(
      `challenge-teams/?token=${localStorage.getItem('token')}&challenge=${id}`
    )
  }
  static async getMembersCommand(id:number):Promise<AxiosResponse<{data:IMembersCommandList}>> {
    return $api.get(
      `challenge-teams/${id}?token=${localStorage.getItem('token')}`
    )
  }

  static async challengeJoin(id: number) {
    return $api.post(
      `challenges/${id}/join/?token=${localStorage.getItem('token')}`
    )
  }

  static async teamJoin(id: number) {
    return $api.post(
      `challenge-teams/${id}/join/?token=${localStorage.getItem('token')}`
    )
  }

  static async purposeChallengeComplete(id: number) {
    return $api.post(
      `challenges/${id}/purpose_done/?token=${localStorage.getItem('token')}`
    )
  }

  static async completeChallenge(id: number) {
    return $api.post(
      `challenges/${id}/complete/?token=${localStorage.getItem('token')}`
    )
  }

  static async customersPersonalChallenge():Promise<AxiosResponse<{data:IListCustomersPersonalChallenge[]}>> {
    return $api.get(
      `customers?token=${localStorage.getItem('token')}&curator_teams=1`
    )
  }
}
