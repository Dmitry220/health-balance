import {Capacitor} from '@capacitor/core'
import React, {useEffect, useState} from 'react'
import './assets/style/global.scss'
import AppRouter from './provider/app-router'
import {App as CapacitorApp, BackButtonListenerEvent} from '@capacitor/app'
import {useCompleteTrackMutation} from './services/tracker.api'
import {showToast} from './utils/common-functions'
import {useNavigate} from 'react-router-dom'
import {POST_INTERESTING_ROUTE, TRACKER_ROUTE} from './provider/constants-route'
import {IUpdateUser} from './models/IUsers'
import {useStatusBar} from './hooks/useStatusBar'
import {NoNetworkConnection} from './pages/NoNetworkConnection/NoNetworkConnection'
import {useEditingProfileMutation} from './services/user.api'
import {useOneSignal} from "./hooks/useOneSignal";
import {api} from './services/api'


function App() {

  const [connect, setConnect] = useState<boolean>(true)
  const navigate = useNavigate()
  const statusBar = useStatusBar()
  const {handlerClickPush} = useOneSignal()
  const [complete] = useCompleteTrackMutation()
  const [editingProfile] = useEditingProfileMutation()
  const [getUserTime] = api.endpoints.getUserTime.useLazyQuery()


  const handlerPush = () => {
    handlerClickPush(async (openedEvent) => {
      const { notification }: any = openedEvent
      if (notification?.additionalData?.type === 'news') {
        navigate(
            POST_INTERESTING_ROUTE + '/' + notification.additionalData?.id
        )
      }
      if (notification.additionalData?.track_id) {
        const response = await complete(
            notification.additionalData.track_id
        ).unwrap()
        if (response?.success) {
          await showToast('Цель ' + notification.body + ' выполнена')
          navigate(TRACKER_ROUTE)
        }
      }
    })
  }

  const changeTimezone = () => {
    if (localStorage.getItem('token')) {
      const timezone = -new Date().getTimezoneOffset() / 60
      const data: IUpdateUser = { timezone }
      editingProfile(data)
      getUserTime(null)
    }
  }


  useEffect(() => {

    changeTimezone()
    handlerPush()

    //обработчик приложения при выгрузке/оставления в памяти
    CapacitorApp.addListener('appStateChange', async ({ isActive }) => {
      if(isActive) {
        await changeTimezone()
        handlerPush()
      }
    })

    //обработка кнопки назад
    CapacitorApp.addListener('backButton', async ({ canGoBack }: BackButtonListenerEvent) => {
      if (!canGoBack) await CapacitorApp.exitApp()
      else window.history.back()
    })

    //Обработчик подключения к интернету
    window.addEventListener('offline', () => {
      setConnect(false)
    })
    window.addEventListener('online', () => setConnect(true))
    setConnect(window.navigator.onLine)

  }, [])

  return (
    <div
      className={'_container'}
      style={{
        paddingTop: Capacitor.getPlatform() === 'ios' ? +statusBar : 16
      }}
    >
      {!connect ? (
        <NoNetworkConnection setConnect={setConnect} />
      ) : (
        <AppRouter />
      )}
    </div>
  )
}

export default App
