import { ChangeEvent, useEffect, useState } from 'react'
import './auth.scss'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/image/Logo.svg'
import {
  ACCESS_RECOVERY__ROUTE,
  ACTIVITY_ROUTE,
  REGISTRATION_ROUTE,
} from '../../provider/constants-route'
import { useAppDispatch } from '../../utils/hooks/redux-hooks'
import { resetFieldRegistration, sendLogin } from '../../Redux/slice/authSlice'
import { Device } from '@capacitor/device'
import { Capacitor } from '@capacitor/core'
import OneSignal from 'onesignal-cordova-plugin'


export const Auth = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useAppDispatch()

  const handlerLogin = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)

  const handlerPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  let navigate = useNavigate()

  const submit = async (e: any) => {
    e.preventDefault()    
    const uuid = await Device.getId()   
    const device_token = uuid.uuid

    await dispatch(sendLogin({ email, password, device_token}))
    dispatch(resetFieldRegistration())
    OneSignalInit()    
    navigate(ACTIVITY_ROUTE)
  }

  async function OneSignalInit () {    
    if (Capacitor.getPlatform() !== 'web') {  
      let externalUserId = localStorage.getItem("id")     

      console.log('uuid device token ', externalUserId);
      OneSignal.setAppId('6c585b11-b33a-44f5-8c7b-3ffac2059d19')
      OneSignal.setNotificationOpenedHandler(function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData))
      })
      OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
        console.log('User accepted notifications: ' + accepted)
      })

      OneSignal.setExternalUserId(externalUserId, (results:any) => {
        // The results will contain push and email success statuses
        console.log('Results of setting external user id ', JSON.stringify(results));
               
        // Push can be expected in almost every situation with a success status, but
        // as a pre-caution its good to verify it exists
        if (results.push && results.push.success) {
          console.log('Results of setting external user id push status: ',results.push.success);       
        }
        
        // Verify the email is set or check that the results have an email success status
        if (results.email && results.email.success) {
          console.log('Results of setting external user id email status: ',results.email.success);        
        }
      
        // Verify the number is set or check that the results have an sms success status
        if (results.sms && results.sms.success) {
          console.log('Results of setting external user id sms status:');
          console.log(results.sms.success);
        }
      });
     
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
