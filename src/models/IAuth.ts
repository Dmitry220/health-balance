export interface IRegistration {
  email: string
  phone: string
  password: string
  name: string
  surname: string
  birthday: number
  gender: number
  platform: number
  avatar: string
  device_token: string
}

export interface ILogin {
  email: string
  password: string,
  device_token: string
}

export interface IAuthResponse {
  data: {
    id: number
    token: string
  }
}
