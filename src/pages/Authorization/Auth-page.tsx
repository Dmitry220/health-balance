import { Capacitor } from '@capacitor/core'
import { SafeArea } from 'capacitor-plugin-safe-area'
import { FC, useEffect, useState } from 'react'
import { Auth } from '../../Components/Authorization/Auth'
import Pedometer from '../../plugins/pedometer'
import './auth-page.scss'

export const AuthPage: FC = () => {

  const [insetsHeight, setInsetsHeight] = useState<number>(0)
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)

  useEffect(() => {
    //Старт шагомера и предоставления разрешений
    if (Capacitor.getPlatform() === 'android') {
      Pedometer.start()
    }
    SafeArea.getSafeAreaInsets().then((data) => {
      setInsetsHeight(data.insets.top)
    })
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      setStatusBarHeight(statusBarHeight)
    })
  }, [])


  return (
    <div className={'auth-page'} style={{ margin: Capacitor.getPlatform() === 'ios' ? `${insetsHeight + statusBarHeight + 20} -16px -16px -16px` : '-16px' }}>
      <Auth />
    </div>
  )
}
