import { Capacitor } from '@capacitor/core'
import OneSignal from 'onesignal-cordova-plugin'
import { useEffect, useState } from 'react'
import './assets/style/global.scss'
import AppRouter from './provider/app-router'
import { App as CapacitorApp } from '@capacitor/app'
import TrackerService from './services/TrackerService'
import { showToast } from './utils/common-functions'
import { useNavigate } from 'react-router-dom'
import { MOTIVATION_ROUTE, TRACKER_ROUTE } from './provider/constants-route'
import { SafeArea } from 'capacitor-plugin-safe-area'
import { IUpdateUser } from './models/IUsers'
import UserService from './services/UserServices'

function App() {
  const navigate = useNavigate()
  const [insetsHeight, setInsetsHeight] = useState<number>(0)
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)

  const handlerPush = () => {
    if (Capacitor.getPlatform() !== 'web') {
      OneSignal.setAppId('6c585b11-b33a-44f5-8c7b-3ffac2059d19')
      OneSignal.setNotificationOpenedHandler(async (openedEvent) => {
        const { notification }: any = openedEvent
        if (notification.additionalData?.type === 'news') {
          navigate(MOTIVATION_ROUTE + '/' + notification.additionalData?.id)
        }
        if (notification.additionalData?.track_id) {
          const response = await TrackerService.completeTrack(
            notification.additionalData.track_id
          )
          if (response?.data?.success) {
            await showToast('Цель ' + notification.body + ' выполнена')
            navigate(TRACKER_ROUTE)
          }
        }
      })
      OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
        console.log('User accepted notifications: ' + accepted)
      })
    }
  }

  const changeTimezone = async () => {
    if (localStorage.getItem('token')) {
      const timezone = -new Date().getTimezoneOffset() / 60
      const data: IUpdateUser = { timezone }
      await UserService.editingProfile(data)
    }
  }

  useEffect(() => {
    //Изменение timezone при входе в приложение
    changeTimezone()
    //Обработка пушей
    handlerPush()
    //Обработчик сворачиваемого приложения
    CapacitorApp.addListener('appStateChange', ({ isActive }) => {
      //Изменение timezone при входе в приложение
      changeTimezone()
      //Обработка пушей
      handlerPush()
    })

    //Получение высоты статус бара для платформы IOS
    SafeArea.getSafeAreaInsets().then((data) => {
      setInsetsHeight(data.insets.top)
    })
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      setStatusBarHeight(statusBarHeight)
    })
    //Обработчик событий для переход "назад"
    CapacitorApp.addListener('backButton', ({ canGoBack }: any) => {
      if (!canGoBack) {
        CapacitorApp.exitApp()
      } else {
        window.history.back()
      }
    })
  }, [])

  return (
    <div
      className={'_container'}
      style={{
        paddingTop:
          Capacitor.getPlatform() === 'ios'
            ? insetsHeight + statusBarHeight + 20
            : 16
      }}
    >
      <AppRouter />
    </div>
  )
}

export default App
