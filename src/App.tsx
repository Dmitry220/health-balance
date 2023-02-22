import { Capacitor } from '@capacitor/core'
import OneSignal from 'onesignal-cordova-plugin'
import {useEffect } from 'react'
import './assets/style/global.scss'
import AppRouter from './provider/app-router'
import { App as CapacitorApp } from '@capacitor/app'
import TrackerService from './services/TrackerService'
import { showToast } from './utils/common-functions'
import { useNavigate } from "react-router-dom"
import { MOTIVATION_ROUTE } from './provider/constants-route'


function App() {
  const navigate = useNavigate();
  if (Capacitor.getPlatform() !== 'web') {
    OneSignal.setNotificationOpenedHandler(async (openedEvent) => {
      console.log('OneSignal: notification opened:', openedEvent)
      const { action, notification }: any = openedEvent
      console.log(notification.additionalData)
      if (notification.additionalData?.type === 'news') {
        navigate(MOTIVATION_ROUTE + '/' + notification.additionalData?.id)
      }
      const response = await TrackerService.complteteTrack(
        notification.additionalData.track_id
      )
      if (response.data.success) {
        await showToast('Цель ' + notification.body + ' выполнена')
      }
    })
  }
  console.log('app');

  useEffect(() => {
    CapacitorApp.addListener('backButton', ({ canGoBack }: any) => {
      if (!canGoBack) {
        CapacitorApp.exitApp()
      } else {
        window.history.back()
      }
    })
  }, [])

  return (
    <div className={'_container'}>
      <AppRouter />
    </div>
  )
}

export default App
