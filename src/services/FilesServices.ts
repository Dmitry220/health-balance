import { AxiosResponse } from 'axios'
import { $api } from '../http'
import { IFileAvatar } from '../models/IFiles'

export default class FileService {
  static async uploadFile(
    params: FormData
  ): Promise<AxiosResponse<IFileAvatar>> {
    return $api.post(
      `/v2/images/?type=avatars&token=${localStorage.getItem('token')}`,
      params,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }

  static async addImageChallenge(params: FormData) {
    return $api.post(
      `/v2/images/?type=challenges&token=${localStorage.getItem('token')}`,
      params,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }
  static async addImageLesson(params: FormData) {
    return $api.post(
      `/v2/images/?type=lessons&token=${localStorage.getItem('token')}`,
      params,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }

  static async addImageNews(params: FormData) {
    return $api.post(
      `/v2/images/?type=news&token=${localStorage.getItem('token')}`,
      params,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }
}
