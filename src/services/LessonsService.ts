import { $api } from '../http'
import { ICreatingLecture } from '../models/ILessons'

export default class LessonService {
  static async createLesson(data: ICreatingLecture) {
    return $api.post(`lessons?token=${localStorage.getItem('token')}`, data, {
      headers: {
        accept: 'application/json',
        'Content-Type': `multipart/form-data`
      }
    })
  }

  static async complete(
    dataTaskToCompleted: { answer?: any; file?: Blob },
    id: number
  ) {
    return $api.post(
      `lessons/${id}/complete?token=${localStorage.getItem('token')}`,
      dataTaskToCompleted,
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static getLessons(id: number) {
    return $api.get(
      `lessons?token=${localStorage.getItem('token')}&challenge=${id}`
    )
  }

  static getLessonById(id: number) {
    return $api.get(`lessons/${id}?token=${localStorage.getItem('token')}`)
  }

  static checkTask(id: number) {
    return $api.get(
      `lessons/${id}/check?token=${localStorage.getItem('token')}`
    )
  }
}
