import { $api } from '../http'

export default class PlatformService {
  static async getPlatfotms() {
    return $api.get('platforms')
  }
  static async getPlatfotmsForChallenge() {
    return $api.get(`platforms?curator=1&token=${localStorage.getItem('token')}`)
  }
}
