import { AxiosResponse } from 'axios'
import { $api } from '../http'
import { IAuthResponse } from '../models/IAuth'

export default class AuthService {
  static async registration(
    name: string,
    surname: string,
    birthday: number,
    gender: number,
    avatar: string,
    phone: string,
    email: string,
    password: string,
    device_token: string,
    platform: number,
    timezone: number
  ) {
    return $api.post(
      'customers',
      {
        email,
        password,
        name,
        surname,
        gender,
        avatar,
        birthday,
        device_token,
        platform,
        phone,
        timezone
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async login(
    email: string,
    password: string,
    device_token: string,
    timezone: number
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post(
      'login',
      { email, password, device_token, timezone },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async getPlatfotms() {
    return $api.get('platforms')
  }

  static async restorePassword(email: string) {
    return $api.post(
      'restore_password',
      { email },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async updatePassword(email: string, code: number, password: string) {
    return $api.post(
      'update_password',
      { email, code, password },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': `multipart/form-data`
        }
      }
    )
  }

  static async deleteCustomerAccount() {
    return $api.delete(`customers?token=${localStorage.getItem('token')}`)
  }
}
