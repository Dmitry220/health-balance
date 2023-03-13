import { AxiosResponse } from 'axios'
import { $api } from '../http'
import {  IPersonalPurposeParams, IPurpose } from '../models/IPurpose'

export default class PurposeService {
  static async creatingPersonalPurpose(data: IPersonalPurposeParams) {
    return $api.post(
      `/v2/purposes/?token=${localStorage.getItem('token')}`,
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
    return $api.get(`/v2/purposes?token=${localStorage.getItem('token')}`)
  }

  static async getChallengePurpose(
    id: number
  ): Promise<AxiosResponse<{ data: IPurpose }>> {
    return $api.get(
      `/v2/purposes?challenge_id=${id}&token=${localStorage.getItem('token')}`
    )
  }

  static async changePersonalPurpose(id: number, quantity: number) {
    return $api.patch(
      `/v2/purposes/${id}/${quantity}?token=${localStorage.getItem('token')}`
    )
  }

  static async completePersonalPurpose(id: number) {
    return await $api.post(
      `/v2/purposes/${id}/complete?token=${localStorage.getItem('token')}`
    )
  }

  static async isCompletedPurpose():Promise<AxiosResponse<{data: 
    {
        id: number,
        finished: number,
        date: number
    }[]}>> {
    return await $api.get(
      `/v2/purpose_progress?token=${localStorage.getItem('token')}`
    )
  }
}
