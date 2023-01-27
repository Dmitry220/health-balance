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
      console.log('uuid device token ', externalUserId);
      OneSignal.setAppId('6c585b11-b33a-44f5-8c7b-3ffac2059d19')
      OneSignal.setNotificationOpenedHandler(function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData))
      })
      OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
        console.log('User accepted notifications: ' + accepted)
      })

      OneSignal.setExternalUserId(externalUserId, (results:any) => {
        // The results will contain push and email success statuses
        console.log('Results of setting external user id ', JSON.stringify(results));
               
        // Push can be expected in almost every situation with a success status, but
        // as a pre-caution its good to verify it exists
        if (results.push && results.push.success) {
          console.log('Results of setting external user id push status: ',results.push.success);       
        }
        
        // Verify the email is set or check that the results have an email success status
        if (results.email && results.email.success) {
          console.log('Results of setting external user id email status: ',results.email.success);        
        }
      
        // Verify the number is set or check that the results have an sms success status
        if (results.sms && results.sms.success) {
          console.log('Results of setting external user id sms status:');
          console.log(results.sms.success);
        }
      });
     
    }
  }

  return (
    <div className={'_container'}>
      <AppRouter />
    </div>
  )
}

export default App
