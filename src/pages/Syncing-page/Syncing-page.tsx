import './syncing-page.scss'

import apple from '../../assets/image/syncing/Apple-health.png'
import samsung from '../../assets/image/syncing/Samsung-Health.png'
import huawei from '../../assets/image/syncing/Huawei-Health.png'
import google from '../../assets/image/syncing/google.svg'
import mi from '../../assets/image/syncing/Mi-Fit.png'
import plug from '../../assets/image/plug.png'
import Header from '../../Components/Header/Header'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  isGoogleFitSelector,
  setGoogleFit
} from '../../Redux/slice/settingsSlice'
import { ChangeEvent } from 'react'
import { Capacitor } from '@capacitor/core'
import { Health } from '@awesome-cordova-plugins/health'

export const SyncingPage = () => {
  const isGoogleFit = useAppSelector(isGoogleFitSelector)
  const dispatch = useAppDispatch()

  const togleGoogleFit = (e: ChangeEvent<HTMLInputElement>) => {
    if (isGoogleFit === 1) {
      dispatch(setGoogleFit(2))
      Health.isAvailable()
      .then((available) => {
        if (available) {
          Health.requestAuthorization([{ read: ['steps'] }])
            .then(() => {
              Health.promptInstallFit().then(() => {
               
              })
            })
            .catch((error) => console.error(error))
        }
      })
      .catch((error) => console.error(error))
    } else {
      
      dispatch(setGoogleFit(1))
    }

  }

  return (
    <div className={'sync-page'}>
      <Header title={'Синхронизация'} />
      {/* {(Capacitor.getPlatform() === 'android' ||
        Capacitor.getPlatform() === 'web') && (
        <>
          <div className='sync-page__item'>
            <div className='custom-checkbox sync-page__radio'>
              <div>
                <input
                  checked={isGoogleFit === 1}
                  value={1}
                  type='radio'
                  name={'radio'}
                  className={'custom-checkbox__checkbox'}
                  id={'1'}
                  onChange={togleGoogleFit}
                />
                <label htmlFor={'1'}>
                  <div className='sync-page__column'>
                    <div className='sync-page__icon'>
                      <img src={plug} alt='google' />
                    </div>
                    <div className='sync-page__title'>Встроенный шагомер</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className='sync-page__item'>
            <div className='custom-checkbox sync-page__radio'>
              <input
                checked={isGoogleFit === 2}
                value={2}
                type='radio'
                name={'radio'}
                className={'custom-checkbox__checkbox'}
                id={'2'}
                onChange={togleGoogleFit}
              />
              <label htmlFor={'2'}>
                <div className='sync-page__column'>
                  <div className='sync-page__icon'>
                    <img src={google} alt='google' />
                  </div>
                  <div className='sync-page__title'>Google fit</div>
                </div>
              </label>
            </div>
          </div>
        </>
      )} */}

      <h1 className='sync-page__head'>Google Fit Синхронизация</h1>
      <div className="sync-page__text">
        Google Fit — это открытая платформа, которая позволяет вам контролировать свои данные о фитнесе из нескольких приложений и устройств
      </div>
      <div className="sync-page__row handler-sync">
        <div className="handler-sync__column">
          <div className="handler-sync__body">
            <div className="handler-sync__icon">
              <img src={google} alt="google" />
            </div>
            <div className='handler-sync__title'>
              Google Fit синхронизация
            </div>
            <label className={'handler-sync__switch switch'}>
              <input type="checkbox" onChange={togleGoogleFit} checked={isGoogleFit === 2} />
              <span className={'switch__slider round'}></span>
            </label>
          </div>

          <div className="handler-sync__text">
            Синхронизируйте Healthe Balance с Google Fit. Подключение к Google Fit позволяет просматривать данные о шагах за последние 3 месяца
          </div>
        </div>
      </div>

      {/* <div className='sync-page__item'>
        <div className='sync-page__column'>
          <div className='sync-page__icon'>
            <img src={apple} alt='apple' />
          </div>
          <div className='sync-page__title'>Apple Health</div>
        </div>
        <div className='sync-page__action text-blue'>Подключить</div>
      </div>
      <div className='sync-page__item'>
        <div className='sync-page__column'>
          <div className='sync-page__icon'>
            <img src={samsung} alt='samsung' />
          </div>
          <div className='sync-page__title'>Samsung Health</div>
        </div>
        <div className='sync-page__action text-blue'>Подключить</div>
      </div>
      <div className='sync-page__item'>
        <div className='sync-page__column'>
          <div className='sync-page__icon'>
            <img src={huawei} alt='huawei' />
          </div>
          <div className='sync-page__title'>Huawei Health</div>
        </div>
        <div className='sync-page__action text-blue'>Подключить</div>
      </div>
      <div className='sync-page__item'>
        <div className='sync-page__column'>
          <div className='sync-page__icon'>
            <img src={mi} alt='mi' />
          </div>
          <div className='sync-page__title'>Mi Fit</div>
        </div>
        <div className='sync-page__action text-blue'>Подключить</div>
      </div> */}
    </div>
  )
}
