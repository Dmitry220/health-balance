import {Capacitor} from '@capacitor/core'
import OneSignal from 'onesignal-cordova-plugin'
import {useEffect, useState} from 'react'
import './assets/style/global.scss'
import AppRouter from './provider/app-router'
import {App as CapacitorApp} from '@capacitor/app'
import {useCompleteTrackMutation} from './services/tracker.api'
import {showToast} from './utils/common-functions'
import {useNavigate} from 'react-router-dom'
import {POST_INTERESTING_ROUTE, TRACKER_ROUTE} from './provider/constants-route'
import {IUpdateUser} from './models/IUsers'
import UserService from './services/UserServices'
import {useStatusBar} from './hooks/useStatusBar'
import {NoNetworkConnection} from './pages/NoNetworkConnection/NoNetworkConnection'

function App() {
  const navigate = useNavigate()
  const statusBar = useStatusBar()
  const [connect, setConnect] = useState<boolean>(true)
  const [complete, {isLoading: isUpdating}] = useCompleteTrackMutation()
  const handlerPush = () => {
    if (Capacitor.getPlatform() !== 'web') {
      OneSignal.setAppId('6c585b11-b33a-44f5-8c7b-3ffac2059d19')
      OneSignal.setNotificationOpenedHandler(async (openedEvent) => {
        const {notification}: any = openedEvent
        if (notification.additionalData?.type === 'news') {
          navigate(
              POST_INTERESTING_ROUTE + '/' + notification.additionalData?.id
          )
        }
        if (notification.additionalData?.track_id) {
          const response = await complete(notification.additionalData.track_id).unwrap();
          if (response?.success) {
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
      const data: IUpdateUser = {timezone}
      await UserService.editingProfile(data)
    }
  }

  useEffect(() => {
    //Изменение timezone при входе в приложение
    changeTimezone()
    //Обработка пушей
    handlerPush()
    //Обработчик сворачиваемого приложения
    CapacitorApp.addListener('appStateChange', ({isActive}) => {
      //Изменение timezone при входе в приложение
      changeTimezone()
      //Обработка пушей
      handlerPush()
    })

    //Обработчик событий для переход "назад"
    CapacitorApp.addListener('backButton', ({canGoBack}: any) => {
      if (!canGoBack) {
        CapacitorApp.exitApp()
      } else {
        window.history.back()
      }
    })
    //Обработчик подключения к интернету
    window.addEventListener('offline', () => {
      setConnect(false)
    });
    window.addEventListener('online', () => setConnect(true));
    setConnect(window.navigator.onLine)
  }, [])


  function onRefresh() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  return (
      <div
          className={'_container'}
          style={{
            paddingTop: Capacitor.getPlatform() === 'ios' ? +statusBar : 16
          }}
      >
        {
          !connect ? <NoNetworkConnection setConnect={setConnect}/> : <AppRouter/>
        }
      </div>
  )
}

export default App
