import './syncing-page.scss'

import google from '../../assets/image/syncing/google.svg'
import Header from '../../Components/Header/Header'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  isGoogleFitSelector,
  setGoogleFit
} from '../../Redux/slice/settingsSlice'
import { ChangeEvent, useState } from 'react'
import { ModalFit } from '../../Components/Modals/Modal-fit'

export const SyncingPage = () => {
  const isGoogleFit = useAppSelector(isGoogleFitSelector)
  const dispatch = useAppDispatch()

  const [activeModal, setActiveModal] = useState<boolean>(false)

  const togleGoogleFit = () => {
    if (isGoogleFit === 1) {
      setActiveModal(true)
      dispatch(setGoogleFit(2))
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
          <button className='button-google-fit' onClick={togleGoogleFit}>
            <img className='button-google-fit__logo' src={google} alt="google" />
            <div className='button-google-fit__title'>
              {isGoogleFit === 1 ? 'Активировать' : 'Отключить'} Google Fit
            </div>
          </button>
          <div className="handler-sync__text">
            Синхронизируйте Health Balance с Google Fit. Подключение к Google Fit позволяет просматривать данные о шагах за последние 3 месяца
          </div>
        </div>
      </div>

      <div className="sync-page__note">
        * Вы можете отключиться от Google Fit в любое время
      </div>
      {
        activeModal &&
        <ModalFit active={activeModal} setActive={setActiveModal}>
          Приложение будет использовать https://www.googleapis.com/auth/fitness.activity.read для отображения
          данных шагов из Google Fit пользователя на странице активности приложения,
          чтобы пользователи могли просматривать пройденное количество шагов через приложение и синхронизировать изменения с Google Fit.
        </ModalFit>

      }

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
