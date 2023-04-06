import { ChangeEvent, useState } from 'react'
import './auth.scss'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/image/Logo.svg'
import {
  ACCESS_RECOVERY__ROUTE,
  REGISTRATION_ROUTE,
  START_ROUTE
} from '../../provider/constants-route'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { resetFieldRegistration, setAuth } from '../../Redux/slice/authSlice'
import { Device } from '@capacitor/device'
import { Capacitor } from '@capacitor/core'
import OneSignal from 'onesignal-cordova-plugin'
import AuthService from '../../services/AuthService'
import { showToast } from '../../utils/common-functions'

export const Auth = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handlerLogin = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)

  const handlerPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  let navigate = useNavigate()

  const submit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const uuid = await Device.getId()
    const device_token = uuid.uuid
    const timezone = -new Date().getTimezoneOffset() / 60

    try {
      const response = await AuthService.login(
        email,
        password,
        device_token,
        timezone
      )
      if (response.data.data) {
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('id', response.data.data.id + '')
        dispatch(setAuth())
        dispatch(resetFieldRegistration())
        OneSignalInit()
        navigate(START_ROUTE)
      }
    } catch (e: any) {
      if (e.code !== 'ERR_NETWORK') {
        await showToast('Неверный email или пароль!')
      } else {
        await showToast('Нет подключения к интернету!')
      }
    } finally {
      setIsLoading(false)
    }
  }

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

  return (
    <form className={'auth'} onSubmit={submit}>
      <div className='auth__content'>
        <div className='auth__logo'>
          <img src={logo} alt='' />
        </div>
        <div className='auth__form form-auth'>
          <div className='form-auth__fields'>
            <input
              type='email'
              spellCheck={false}
              className='form-auth__field'
              placeholder={'Email'}
              value={email}
              onChange={handlerLogin}
            />
            <input
              type='password'
              spellCheck={false}
              className='form-auth__field'
              placeholder={'Пароль'}
              value={password}
              onChange={handlerPassword}
            />
          </div>
          <div className='form-auth__buttons'>
            <button
              className='form-auth__button'
              onClick={submit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='spinner'>
                  <i className='fa fa-spinner fa-spin'></i> Загрузка
                </span>
              ) : (
                'Войти'
              )}
            </button>
            {/* <button className='form-auth__button transparent'>
              <img src={appleIcon} alt='apple' />
              Войти через Apple ID
            </button> */}
          </div>
          <Link
            to={ACCESS_RECOVERY__ROUTE}
            className='form-auth__link link-auth'
          >
            Забыли пароль?
          </Link>
        </div>
        <div className='auth__links'>
          <div className={'auth__link link-auth'}>У вас ещё нет аккаунта?</div>
          <Link
            to={REGISTRATION_ROUTE}
            className={'auth__link link-auth yellow'}
          >
            Регистрация
          </Link>
        </div>
      </div>
    </form>
  )
}
