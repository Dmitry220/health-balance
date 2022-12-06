import { $api } from '../http'

export default class PlatformService {
  static getPlatfotms() {
    return $api.get('/v2/platforms')
  }
}
