import { Capacitor } from '@capacitor/core';
import OneSignal from 'onesignal-cordova-plugin';
import './assets/style/global.scss'
import AppRouter from './provider/app-router'

function App() {

  if(Capacitor.getPlatform() != 'web'){
    OneSignal.setNotificationOpenedHandler(openedEvent => {
      console.log("OneSignal: notification opened:", openedEvent);
      const { action, notification } = openedEvent;
      console.log("dfsd ", JSON.stringify(action), JSON.stringify(notification))
    });
  }
  


  return (
    <div className={'_container'}>
      <AppRouter />
    </div>
  )
}

export default App
