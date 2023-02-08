import { useEffect } from 'react'
import './assets/style/global.scss'
import AppRouter from './provider/app-router'
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

function App() {

  useEffect(() => {
    console.log('appp');
    if (Capacitor.getPlatform() != 'web') {
      addListeners()
      registerNotifications()
      getDeliveredNotifications()
    }
  }, [])

  const addListeners = async () => {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }

  const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
  }

  const getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', JSON.stringify(notificationList));
  }


  return (
    <div className={'_container'}>
      <AppRouter />
    </div>
  )
}

export default App
