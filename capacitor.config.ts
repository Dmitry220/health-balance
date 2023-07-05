import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.academia.health',
  appName: 'HealthBalance',
  webDir: 'build',
  bundledWebRuntime: false,
  ios: {
    backgroundColor: '#121212'
  },
  "plugins":{
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '892578456296-nmrjb7m8pn1f109psnaoff2q2es6s19f.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  }
}

export default config
