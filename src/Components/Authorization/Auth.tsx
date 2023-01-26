import { ChangeEvent, useEffect, useState } from 'react'
import './auth.scss'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/image/Logo.svg'
import appleIcon from '../../assets/image/auth/appleIcon.svg'
import {
  ACCESS_RECOVERY__ROUTE,
  ACTIVITY_ROUTE,
  REGISTRATION_ROUTE,
  START_ROUTE
} from '../../provider/constants-route'
import { useAppDispatch } from '../../utils/hooks/redux-hooks'
import { sendLogin } from '../../Redux/slice/authSlice'
import OneSignal from 'onesignal-cordova-plugin'
import { Capacitor } from '@capacitor/core'

export const Auth = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [device_token, setDeviceToken] = useState<string>('')

  const dispatch = useAppDispatch()

  const handlerLogin = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)

  const handlerPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  let navigate = useNavigate()

  const submit = async (e: any) => {
    e.preventDefault()
    await dispatch(sendLogin({ email, password, device_token }))
    navigate(ACTIVITY_ROUTE)
  }

  useEffect(() => {
    if (Capacitor.getPlatform() !== 'web') {
      OneSignal.getDeviceState((state) => {
        setDeviceToken(state.userId);
      });
    }
  }, [])
  

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
            <button className='form-auth__button' onClick={submit}>
              Войти
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
