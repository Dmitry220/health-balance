import { $api } from '../http'

export default class PlatformService {
  static async getPlatfotms() {
    return $api.get('/v2/platforms')
  }
  static async getPlatfotmsForChallenge() {
    return $api.get(`/v2/platforms?curator=1&token=${localStorage.getItem('token')}`)
  }
}
