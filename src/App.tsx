import { useEffect } from 'react'
import OneSignal from 'onesignal-cordova-plugin'
import './assets/style/global.scss'
import AppRouter from './provider/app-router'

function App() {
  useEffect(() => {
    OneSignalInit()
  }, [])

  function OneSignalInit(): void {
    OneSignal.setAppId('6c585b11-b33a-44f5-8c7b-3ffac2059d19')
    OneSignal.setNotificationOpenedHandler(function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData))
    })
    OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      console.log('User accepted notifications: ' + accepted)
    })
  }

  return (
    <div className={'_container'}>
      <AppRouter />
    </div>
  )
}

export default App
