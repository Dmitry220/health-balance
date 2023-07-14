import './syncing-page.scss'

import google from '../../assets/image/syncing/google.svg'
import Header from '../../Components/Header/Header'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  isGoogleFitSelector,
  setGoogleFit
} from '../../Redux/slice/settingsSlice'
import { useState } from 'react'
import { ModalFit } from '../../Components/Modals/Modal-fit'
import Pedometer from '../../plugins/pedometer'
import { currentStepsCountSelector } from '../../Redux/slice/appSlice'

export const SyncingPage = () => {
  const isGoogleFit = useAppSelector(isGoogleFitSelector)
  const steps = useAppSelector(currentStepsCountSelector)
  const dispatch = useAppDispatch()

  const [activeModal, setActiveModal] = useState<boolean>(false)

  const toggleGoogleFit = async () => {
    if (isGoogleFit === 1) {
      setActiveModal(true)
    } else {
      dispatch(setGoogleFit(1))
      await Pedometer.setData({
        numberOfSteps: steps || 0,
        token: localStorage.getItem('token')
      })
      await Pedometer.start({ token: localStorage.getItem('token') })
    }
  }

  return (
    <div className={'sync-page'}>
      <Header title={'Синхронизация'} />
      <h1 className='sync-page__head'>Google Fit Синхронизация</h1>
      <div className='sync-page__text'>
        Google Fit — это открытая платформа, которая позволяет вам
        контролировать свои данные о фитнесе из нескольких приложений и
        устройств
      </div>
      <div className='sync-page__row handler-sync'>
        <div className='handler-sync__column'>
          <button className='button-google-fit' onClick={toggleGoogleFit}>
            <img
              className='button-google-fit__logo'
              src={google}
              alt='google'
            />
            <div className='button-google-fit__title'>
              {isGoogleFit === 1 ? 'Активировать' : 'Отключить'} Google Fit
            </div>
          </button>
          <div className='handler-sync__text'>
            Синхронизируйте Health Balance с Google Fit. Подключение к Google
            Fit позволяет просматривать данные о шагах за последние 3 месяца
          </div>
        </div>
      </div>

      <div className='sync-page__note'>
        * Вы можете отключиться от Google Fit в любое время
      </div>
      {activeModal && (
        <ModalFit active={activeModal} setActive={setActiveModal}>
          Приложение будет использовать
          https://www.googleapis.com/auth/fitness.activity.read для отображения
          данных шагов из Google Fit пользователя на странице активности
          приложения, чтобы пользователи могли просматривать пройденное
          количество шагов через приложение и синхронизировать изменения с
          Google Fit.
        </ModalFit>
      )}
    </div>
  )
}
