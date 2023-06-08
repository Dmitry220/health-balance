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
import { useLoginMutation } from '../../services/AuthService'
import { showToast } from '../../utils/common-functions'


export const Auth = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [submitLogin, { isLoading, error }] = useLoginMutation()
  let navigate = useNavigate()

  const handlerLogin = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)

  const handlerPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const submit = async (e: any) => {

    e.preventDefault()
    const uuid = await Device.getId()
    const device_token = uuid.uuid
    const timezone = -new Date().getTimezoneOffset() / 60

    await submitLogin({
      email,
      password,
      device_token,
      timezone,
    })
      .unwrap()
      .then((response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.id + '')
        dispatch(setAuth())
        dispatch(resetFieldRegistration())
        OneSignalInit()
        navigate(START_ROUTE)
      }))
      .catch(async (err) => {
        if (err.data?.errors?.email && err?.data?.errors?.password) {
          await showToast(err?.data?.errors?.email.join('. ') + '. ' + err.data?.errors?.password.join('. '))
          return
        }
        if (err.data?.errors?.email) {
          await showToast(err?.data?.errors?.email.join('. '))
          return
        }
        if (err?.data?.errors?.password) {
          await showToast(err.data?.errors?.password.join('. '))
          return
        }
      })
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
