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
  device_token: string,
  timezone: number
}

export interface ILogin {
  email: string
  password: string,
  device_token: string,
  timezone: number
}

export interface IAuthResponse {
  data: {
    id: number
    token: string
  }
}

export interface IVisitPages {
  activity: number
  tracker: number,
  challenge: number
}
