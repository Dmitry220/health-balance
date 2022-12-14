import axios from 'axios'

export const API_URL = 'http://test-1.symedia.ru/api/'

export const $api = axios.create({ baseURL: API_URL })

export const IMAGE_URL = 'http://test-1.symedia.ru/assets/images/'

export const DOC_URL = 'http://test-1.symedia.ru/downloads/'
