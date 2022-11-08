export interface IRegistration {
    email: string,
    phone: string,
    password: string,
    name: string,
    surname: string,
    birthday: string,
    gender: number,
    platform: number | null,
    avatar: string,
    device_token: string
}

export interface ILogin {
    email: string,
    password: string,
}