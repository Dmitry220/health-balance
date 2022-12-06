import axios from 'axios'

export const API_URL = 'http://test.health-balance.ru/api/'

export const $api = axios.create({ baseURL: API_URL })

export const IMAGE_URL = 'http://test.health-balance.ru/assets/images/'
