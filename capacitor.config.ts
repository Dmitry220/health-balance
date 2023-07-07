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
      //serverClientId: '892578456296-nmrjb7m8pn1f109psnaoff2q2es6s19f.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
     // androidClientId: '892578456296-f9gqaa4k7sror2c3iitvi511oh7el0kj.apps.googleusercontent.com',
      clientId: '892578456296-nmrjb7m8pn1f109psnaoff2q2es6s19f.apps.googleusercontent.com'
    },
  }
}

export default config
