import { useEffect } from 'react'
import { Capacitor } from '@capacitor/core'
import OneSignal from 'onesignal-cordova-plugin'

import './assets/style/global.scss'
import AppRouter from './provider/app-router'
import { Device } from '@capacitor/device'

function App() {
  useEffect(() => {
    OneSignalInit()
  }, [])

  async function OneSignalInit () {
    if (Capacitor.getPlatform() !== 'web') {
      const uuid = await Device.getId()   
      let externalUserId = uuid.uuid      
    
      OneSignal.setAppId('6c585b11-b33a-44f5-8c7b-3ffac2059d19')
      OneSignal.setNotificationOpenedHandler(function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData))
      })
      OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
        console.log('User accepted notifications: ' + accepted)
      })
      OneSignal.setExternalUserId(externalUserId);
    }
  }

  return (
    <div className={'_container'}>
      <AppRouter />
    </div>
  )
}

export default App
