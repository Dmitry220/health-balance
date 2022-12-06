import { useState } from 'react'
import './settings.scss'
import Header from '../../Components/Header/Header'
import { Link } from 'react-router-dom'
import { SYNCING_ROUTE } from '../../provider/constants-route'

export const Settings = () => {
  const [notificationNews, setNotificationNews] = useState<boolean>(true)
  const [notificationQuiz, setNotificationQuiz] = useState<boolean>(true)
  const [notificationChallenge, setNotificationChallenge] =
    useState<boolean>(true)
  const [notificationPedometer, setNotificationPedometer] =
    useState<boolean>(true)

  return (
    <div className={'settings'}>
      <Header title={'Настройки'} />
      <div className='settings__container'>
        <div className='settings__block'>
          <div className='settings__title'>Синхронизация</div>
          <div className='settings__row'>
            <div className='settings__notification-title'>Приложения</div>
            <Link
              to={SYNCING_ROUTE}
              className='settings__notification-title settings__notification-title_blue'
            >
              Настроить
            </Link>
          </div>
        </div>
        <div className='settings__block'>
          <div className='settings__title'>Уведомления</div>
          <div className='settings__items-notifications'>
            <div className='settings__row'>
              <label htmlFor={'news'} className='settings__notification-title'>
                Новости приложения
              </label>
              <label className='settings__switch switch'>
                <input
                  id={'news'}
                  type='checkbox'
                  checked={notificationNews}
                  onChange={() => setNotificationNews((prev) => !prev)}
                />
                <span className='switch__slider round' />
              </label>
            </div>
            <div className='settings__row'>
              <label
                htmlFor={'notificationQuiz'}
                className='settings__notification-title'
              >
                Опросы
              </label>
              <label className='settings__switch switch'>
                <input
                  id={'notificationQuiz'}
                  type='checkbox'
                  checked={notificationQuiz}
                  onChange={() => setNotificationQuiz((prev) => !prev)}
                />
                <span className='switch__slider round' />
              </label>
            </div>
            <div className='settings__row'>
              <label
                htmlFor={'notificationChallenge'}
                className='settings__notification-title'
              >
                Уведомления челленджей
              </label>
              <label className='settings__switch switch'>
                <input
                  id={'notificationChallenge'}
                  type='checkbox'
                  checked={notificationChallenge}
                  onChange={() => setNotificationChallenge((prev) => !prev)}
                />
                <span className='switch__slider round' />
              </label>
            </div>
            <div className='settings__row'>
              <label
                htmlFor={'notificationPedometer'}
                className='settings__notification-title'
              >
                Уведомления шагометра
              </label>
              <label className='settings__switch switch'>
                <input
                  id={'notificationPedometer'}
                  type='checkbox'
                  checked={notificationPedometer}
                  onChange={() => setNotificationPedometer((prev) => !prev)}
                />
                <span className='switch__slider round' />
              </label>
            </div>
          </div>
        </div>
        <div className='settings__block'>
          <div className='settings__title'>Конфиденциальность</div>
          <div className='settings__block-links'>
            <Link
              to={'/'}
              className='settings__notification-title settings__notification-title_blue'
            >
              Политика конфиденциальности
            </Link>
            <Link
              to={'/'}
              className='settings__notification-title settings__notification-title_blue'
            >
              Правила и условия
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
