import { AxiosResponse } from 'axios'
import { $api } from '../http'
import { IGetTracker, ITrack } from '../models/ITracker'

export default class TrackerService {
  static async creatingTracker(params: FormData) {
    return $api.post(
      `/v2/tracker/?token=${localStorage.getItem('token')}`,
      params,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async getTracker(): Promise<AxiosResponse<{ data: IGetTracker }>> {
    return $api.get(`/v2/tracker/?token=${localStorage.getItem('token')}`)
  }

  static async updateTracker(
    id: number,
    type: 'weight' | 'fruits' | 'wake_up_time',
    value: string
  ) {
    const body = type + '=' + value
    return (
      $api.patch(
        `/v2/tracker/${id}/update?token=${localStorage.getItem('token')}`,
        body
      ),
      {
        headers: {
          'Content-Type': 'text/plain'
        }
      }
    )
  }

  static async installPushTracker(
    type: 1 | 2 | 3,
    time: string,
    send_time: number,
    additional?: string
  ) {
    return (
      $api.post(`/v2/tracks?token=${localStorage.getItem('token')}`, {
        type,
        time,
        additional,
        send_time
      }),
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async completeTrack(id: number) {
    return $api.post(
      `/v2/tracks/${id}/complete?token=${localStorage.getItem('token')}`,
      {},
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async createTrack(type: 1 | 2 | 3, time: string, additional: string) {
    return (
      $api.post(`/v2/tracks?token=${localStorage.getItem('token')}`, {
        type,
        time,
        additional
      }),
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async getTracks(
    date: string
  ): Promise<AxiosResponse<{ data: ITrack[] }>> {
    return $api.get(
      `/v2/tracks/?date=${date}&token=${localStorage.getItem('token')}`
    )
  }

  static async updateTrack(data: {
    id: number
    type?: 1 | 2 | 3
    additional?: string
    time?: string
    send_time?: number
  }) {
    return (
      $api.patch(
        `/v2/tracks/${data.id}?token=${localStorage.getItem('token')}`,
        data
      ),
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'text/plain'
        }
      }
    )
  }

  static async deleteTracker(): Promise<AxiosResponse<{ success: boolean }>> {
    return $api.delete(`/v2/tracker?token=${localStorage.getItem('token')}`)
  }
}
