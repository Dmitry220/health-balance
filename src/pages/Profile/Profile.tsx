import { useEffect, useState } from 'react'
import './profile.scss'
import Header from '../../Components/Header/Header'
import icon_reward from '../../assets/image/icon_reward.svg'
import { Link, useNavigate } from 'react-router-dom'
import {
  CONSULTATION_ROUTE,
  EDITING_ROUTE,
  LOGIN_ROUTE,
  SETTINGS_ROUTE,
  SHOP_ROUTE
} from '../../provider/constants-route'
import { ProfileSteps } from '../../Components/Profile/Profile-steps'
import { ProfileChallenge } from '../../Components/Profile/Profile-challenge'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { dataUserSelector, setUserData } from '../../Redux/slice/profileSlice'
import { clearResults, logout } from '../../Redux/slice/authSlice'
import { IMAGE_URL } from '../../http'
import settingsIcon from '../../assets/image/icon_option.svg'
import { balanceSelector } from '../../Redux/slice/appSlice'
import avatar from '../../assets/image/avatar.jpeg'
import { ModalExit } from '../../Components/Modals/Modal-exit'
import Pedometer from '../../plugins/pedometer'
import { Capacitor } from '@capacitor/core'
import { persistor } from '../..'
import TrackerService from '../../services/TrackerService'
import { isGoogleFitSelector } from '../../Redux/slice/settingsSlice'

export const Profile = () => {
  const dataUser = useAppSelector(dataUserSelector)
  const isGoogleFit = useAppSelector(isGoogleFitSelector)
  const ballance = useAppSelector(balanceSelector)
  const navigation = useNavigate()
  const dispatch = useAppDispatch()
  const [isLogoutModal, setLogoutModal] = useState<boolean>(false)
  const idUser = Number(localStorage.getItem('id'))

  const additionalHeaderComponent = <img src={settingsIcon} alt={'icon'} />

  const additionalHeaderComponentClick = () => {
    navigation(SETTINGS_ROUTE)
  }

  useEffect(() => {
    dispatch(setUserData(idUser))
  }, [])

  const logout = async () => {
    if (Capacitor.getPlatform() === 'android' && isGoogleFit === 1) {
      await Pedometer.reset()
      await Pedometer.stop()
    }
    await TrackerService.deleteTracker()
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    await dispatch(clearResults())
    await persistor.purge()
    await window.location.replace(LOGIN_ROUTE)
  }

  if (isLogoutModal) {
    return (
      <ModalExit
        actionCallback={logout}
        closeCallback={setLogoutModal}
      />
    )
  }

  return (
    <div className={'profile'}>
      <Header
        title={'Мой профиль'}
        additionalComponent={additionalHeaderComponent}
        additionalOnClick={additionalHeaderComponentClick}
      />
      <Link to={CONSULTATION_ROUTE} className='profile__ _button-yellow'>Запись к психологу</Link>
      <div className='profile__block'>
        <div className='profile__header'>
          <div className='profile__avatar'>
            {dataUser.avatar && (
              <img
                src={IMAGE_URL + 'avatars/' + dataUser.avatar}
                alt='avatar'
              />
            )}
            {!dataUser.avatar && <img src={avatar} alt='avatar' />}
          </div>
          <div className='profile__user-info'>
            <div className='profile__user-name'>
              {dataUser.name +
                ' ' +
                (dataUser.surname !== null ? dataUser.surname : '')}
            </div>
            <Link to={EDITING_ROUTE} className='profile__link text-blue'>
              Редактировать
            </Link>
          </div>
        </div>
        <div className='profile__buttons'>
          <button className='profile__button-balance'>
            Баланс: {ballance} <img src={icon_reward} alt='reward' />
          </button>
          <Link to={SHOP_ROUTE} className='_button-white'>
            Обменять
          </Link>
        </div>
      </div>
      <div className='profile__block'>
        <ProfileSteps
          steps={dataUser.steps}
          kilometer={+((dataUser.steps * 0.7) / 1000).toFixed(2)}
        />
      </div>
      <div className='profile__block'>
        <ProfileChallenge
          challenges={dataUser.challenges}
          completed_challenges={dataUser.completed_challenges}
        />
      </div>
      <div className='profile__block'>
        <div className='profile__out' onClick={() => setLogoutModal(true)}>
          Выйти из аккаунта
        </div>
      </div>
    </div>
  )
}
