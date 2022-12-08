import { AxiosResponse } from 'axios'
import { $api } from '../http'
import { IComment, INews } from '../models/INews'

export default class NewsService {
  static async creatingNews(params: FormData) {
    return $api.post(
      `/v2/news/?token=${localStorage.getItem('token')}`,
      params,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async getNews(): Promise<AxiosResponse<{ data: INews[] }>> {
    return $api.get(`/v2/news/?token=${localStorage.getItem('token')}`)
  }

  static async getNewsById(
    id: number
  ): Promise<AxiosResponse<{ data: INews }>> {
    return $api.get(`/v2/news/${id}?token=${localStorage.getItem('token')}`)
  }

  static async addCommentsNews(params: FormData) {
    return $api.post(
      `/v2/news-comments/?token=${localStorage.getItem('token')}`,
      params,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async listComments(id:number): Promise<AxiosResponse<{data:IComment[]}>> {
    return $api.get(`/v2/news-comments/?token=${localStorage.getItem('token')}&news=${id}`)
  }

  static async likeNews(id: number) {
    return $api.patch(
      `/v2/news/${id}/like/?token=${localStorage.getItem('token')}`
    )
  }

  static async deleteNews(id: number) {
    return $api.delete(`/v2/news/${id}/?token=${localStorage.getItem('token')}`)
  }
}
