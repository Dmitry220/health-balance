import React, { useEffect } from 'react'
import { Birthday } from '../Registration/Birthday'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { Platform } from '../Registration/Platform'
import './AuthorizationGoogle.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  dataRegistrationSelector,
  platformSelector,
  resetFieldRegistration,
  setAuth,
  typePlatformSelector
} from '../../Redux/slice/authSlice'
import { useSignInWithGoogleMutation } from '../../services/AuthService'
import { showToast } from '../../utils/common-functions'
import { LOGIN_ROUTE, START_ROUTE } from '../../provider/constants-route'
import { useNavigate } from 'react-router-dom'
import { Privateplatform } from '../Registration/Private-platform/Private-platform'
import Header from '../Header/Header'
import { Capacitor } from '@capacitor/core'
import OneSignal from 'onesignal-cordova-plugin'
import { Device } from '@capacitor/device'
import { Telephone } from '../Registration/Telephone'
import { Preloader } from '../Preloader/Preloader'
import { WEB_CLIENT_ID } from '../../utils/globalConstants'

export const AuthorizationGoogle = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const dataRegistration = useAppSelector(dataRegistrationSelector)
  const typePlatfotm = useAppSelector(typePlatformSelector)
  const [submit, { isLoading, error }] = useSignInWithGoogleMutation()

  async function OneSignalInit() {
    if (Capacitor.getPlatform() !== 'web') {
      let externalUserId = localStorage.getItem('id')

      OneSignal.setExternalUserId(externalUserId, (results: any) => {
        // The results will contain push and email success statuses
        console.log('External user id ', JSON.stringify(results))
        if (results.push && results.push.success) {
          console.log('Results external user id: ', results.push.success)
        }
      })
    }
  }

  const googleAuth = async () => {
    const response = await GoogleAuth.signIn()

    const timezone = -new Date().getTimezoneOffset() / 60
    const uuid = await Device.getId()
    const device_token = uuid.uuid

    await submit({
      birthday: dataRegistration.birthday,
      platform: dataRegistration.platform,
      timezone: timezone,
      access_token: response.authentication.accessToken,
      server_code: response.serverAuthCode,
      google_token: response.authentication.idToken,
      platform_code: dataRegistration.privatePlatform,
      device_token: device_token,
      phone: dataRegistration.phone
    })
      .unwrap()
      .then(async (response) => {
        await showToast(`Регистрация прошла успешно`)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.id + '')
        dispatch(setAuth())
        dispatch(resetFieldRegistration())
        OneSignalInit()
        navigate(START_ROUTE)
      })
      .catch(async (err) => {
        if (err.data?.errors['google.reg']) {
          await showToast(err.data?.errors['google.reg'])
        }
      })
  }

  useEffect(() => {
    GoogleAuth.initialize({
      clientId: WEB_CLIENT_ID,
      scopes: ['profile', 'email']
    })
  }, [])

  return (
    <div className='auth-google'>
      <Header title='Sign in with Google' />
      <div className='auth-google__container'>
        <h2 className='auth-google__title main-title'>
          Когда у вас день рождения?
        </h2>
        <Birthday googleAuth={true} />
        <h2 className='auth-google__title main-title'>Ваш телефон</h2>
        <Telephone googleAuth={true} />
        <h2 className='auth-google__title main-title'>Выберите платформу</h2>
        <Platform googleAuth={true} />
        {typePlatfotm === 2 && (
          <>
            <h2 className='auth-google__title main-title'>
              Укажите код платформы
            </h2>
            <Privateplatform googleAuth={true} />
          </>
        )}
        {!isLoading ? (
          <button
            type='button'
            className='google-sign-in-button'
            onClick={googleAuth}
          >
            Sign in with Google
          </button>
        ) : (
          <Preloader height='auto' />
        )}
      </div>
    </div>
  )
}
