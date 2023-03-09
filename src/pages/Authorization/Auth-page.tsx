import { Capacitor } from '@capacitor/core'
import { FC, useEffect } from 'react'
import { Auth } from '../../Components/Authorization/Auth'
import Pedometer from '../../plugins/pedometer'
import './auth-page.scss'

export const AuthPage: FC = () => {
  useEffect(() => {
    // Старт шагомера и предоставления разрешений
    if (Capacitor.getPlatform() === 'android') {
      Pedometer.start()
    }
  }, [])

  return (
    <div className={'auth-page'} style={{ margin: -16 }}>
      <Auth />
    </div>
  )
}
