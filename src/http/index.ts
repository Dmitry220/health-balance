import axios from 'axios'

export const API_URL = 'https://health-balance.ru/api/v2/'

export const $api = axios.create({ baseURL: API_URL })

export const IMAGE_URL = 'https://health-balance.ru/assets/images/'

export const DOC_URL = 'https://health-balance.ru/downloads/'
