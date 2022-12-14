import { AxiosResponse } from 'axios'
import { $api } from '../http'
import { IPurposeResponse } from '../models/IPurpose'
import { IGetTracker, ITrack } from '../models/ITracker'
import { ITracker } from '../Redux/slice/trackerSlice'

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
    console.log(body)
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
}
