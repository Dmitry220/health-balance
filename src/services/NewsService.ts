import { AxiosResponse } from 'axios'
import { $api } from '../http'
import { IComment, ICreatingComment, ICreatingNews, INews } from '../models/INews'

export default class NewsService {
  static async creatingNews(data:ICreatingNews) {
    return $api.post(
      `news/?token=${localStorage.getItem('token')}`,
      data,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`,
          'Access-Control-Allow-Origin' : '*'
        }
      }
    )
  }

  static async getNews(): Promise<AxiosResponse<{ data: INews[] }>> {
    return $api.get(`news/?token=${localStorage.getItem('token')}`)
  }

  static async getNewsById(
    id: number
  ): Promise<AxiosResponse<{ data: INews }>> {
    return $api.get(`news/${id}?token=${localStorage.getItem('token')}`)
  }

  static async getNewsByCategory (idRubric: number): Promise<AxiosResponse<{ data: INews[] }>> {
    return $api.get(`news?token=${localStorage.getItem('token')}&category=${idRubric}`)
  }

  static async addCommentsNews(data: ICreatingComment) {
    return $api.post(
      `news-comments/?token=${localStorage.getItem('token')}`,
      data,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async listComments(id:number): Promise<AxiosResponse<{data:IComment[]}>> {
    return $api.get(`news-comments/?token=${localStorage.getItem('token')}&news=${id}`)
  }

  static async likeNews(id: number) {
    return $api.patch(
      `news/${id}/like/?token=${localStorage.getItem('token')}`
    )
  }

  static async deleteNews(id: number) {
    return $api.delete(`news/${id}/?token=${localStorage.getItem('token')}`)
  }
}
