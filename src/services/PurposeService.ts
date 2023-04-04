import { AxiosResponse } from 'axios'
import { $api } from '../http'
import {  IPersonalPurposeParams, IPurpose } from '../models/IPurpose'

export default class PurposeService {
  static async creatingPersonalPurpose(data: IPersonalPurposeParams) {
    return $api.post(
      `purposes/?token=${localStorage.getItem('token')}`,
      data,
      {
        headers: {
          accept: 'application/json',
          "Content-Type": `multipart/form-data`,
        }
      }
    )
  }

  static async getPersonalPurpose(): Promise<AxiosResponse<{ data: IPurpose }>> {
    return $api.get(`purposes?token=${localStorage.getItem('token')}`)
  }

  static async getChallengePurpose(
    id: number
  ): Promise<AxiosResponse<{ data: IPurpose }>> {
    return $api.get(
      `purposes?challenge_id=${id}&token=${localStorage.getItem('token')}`
    )
  }

  static async changePersonalPurpose(id: number, quantity: number) {
    return $api.patch(
      `purposes/${id}/${quantity}?token=${localStorage.getItem('token')}`
    )
  }

  static async completePersonalPurpose(id: number) {
    return await $api.post(
      `purposes/${id}/complete?token=${localStorage.getItem('token')}`
    )
  }

  static async isCompletedPurpose():Promise<AxiosResponse<{data: 
    {
        id: number,
        finished: number,
        date: number
    }[]}>> {
    return await $api.get(
      `purpose_progress?token=${localStorage.getItem('token')}`
    )
  }
}
