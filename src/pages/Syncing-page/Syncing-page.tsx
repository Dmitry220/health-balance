import './syncing-page.scss'

import apple from '../../assets/image/syncing/Apple-health.png'
import samsung from '../../assets/image/syncing/Samsung-Health.png'
import huawei from '../../assets/image/syncing/Huawei-Health.png'
import google from '../../assets/image/syncing/Google-fit.png'
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

export const SyncingPage = () => {
  const isGoogleFit = useAppSelector(isGoogleFitSelector)
  const dispatch = useAppDispatch()

  const togleGoogleFit = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setGoogleFit(+e.target.value));
  }

  return (
    <div className={'sync-page'}>
      <Header title={'Синхронизация'} />
      {(Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'web') && <> <div className='sync-page__item'>
        <div className="custom-checkbox sync-page__radio">
          <div>
            <input
              checked={isGoogleFit === 1}
              value={1}
              type="radio"
              name={"radio"}
              className={"custom-checkbox__checkbox"}
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
          <div className="custom-checkbox sync-page__radio">
            <input
              checked={isGoogleFit === 2}
              value={2}
              type="radio"
              name={"radio"}
              className={"custom-checkbox__checkbox"}
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
      </>}

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
