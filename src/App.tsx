import { Capacitor } from '@capacitor/core'
import OneSignal from 'onesignal-cordova-plugin'
import Pedometer from './plugins/pedometer'
import { useEffect, useState } from 'react'
import './assets/style/global.scss'
import AppRouter from './provider/app-router'
import { App as CapacitorApp } from '@capacitor/app'
import TrackerService from './services/TrackerService'
import { showToast } from './utils/common-functions'
import { useNavigate } from 'react-router-dom'
import {
  MOTIVATION_ROUTE,
  TRACKER_HABITS_ROUTE
} from './provider/constants-route'
import { SafeArea } from 'capacitor-plugin-safe-area'

function App() {
  const navigate = useNavigate()
  const [insetsHeight, setInsetsHeight] = useState<number>(0)
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)

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
        navigate(TRACKER_HABITS_ROUTE)
        await showToast('Цель ' + notification.body + ' выполнена')
      }
    })
  }

  useEffect(() => {
    if (Capacitor.getPlatform() === 'android') {
      Pedometer.start()
    }
    SafeArea.getSafeAreaInsets().then((data) => {
      setInsetsHeight(data.insets.top)
    })
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      setStatusBarHeight(statusBarHeight)
    })
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
      {Capacitor.getPlatform() === 'ios' && (
        <div
          className='band-black'
          style={{ height: insetsHeight + statusBarHeight }}
        />
      )}
      <AppRouter />
    </div>
  )
}

export default App
