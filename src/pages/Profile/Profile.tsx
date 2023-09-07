import { useState } from 'react'
import './profile.scss'
import Header from '../../Components/Header/Header'
import icon_reward from '../../assets/image/icon_reward.svg'
import { Link, useNavigate } from 'react-router-dom'
import {
  CONSULTATION_ROUTE,
  EDITING_ROUTE,
  SETTINGS_ROUTE,
  SHOP_ROUTE
} from '../../provider/constants-route'
import { ProfileSteps } from '../../Components/Profile/Profile-steps'
import { ProfileChallenge } from '../../Components/Profile/Profile-challenge'
import { useAppSelector } from '../../hooks/redux-hooks'
import { IMAGE_URL } from '../../http'
import settingsIcon from '../../assets/image/icon_option.svg'
import { balanceSelector } from '../../Redux/slice/appSlice'
import avatar from '../../assets/image/avatar.jpeg'
import { ModalExit } from '../../Components/Modals/Modal-exit'
import { Platform } from '../../Components/Platform/Platform'
import { Footer } from '../../Components/Footer/Footer'
import { useLogout } from '../../hooks/useLogout'
import { useGetUserDataOnIdQuery } from '../../services/user.api'
import { Preloader } from '../../Components/Preloader/Preloader'

export const Profile = () => {
  const balance = useAppSelector(balanceSelector)
  const navigation = useNavigate()
  const [logout] = useLogout()
  const [isLogoutModal, setLogoutModal] = useState<boolean>(false)

  const additionalHeaderComponent = <img src={settingsIcon} alt={'icon'} />

  const { data: dataUser, isLoading } = useGetUserDataOnIdQuery(
    localStorage.getItem('id') as string
  )

  const additionalHeaderComponentClick = () => navigation(SETTINGS_ROUTE)

  if (isLogoutModal) {
    return <ModalExit actionCallback={logout} closeCallback={setLogoutModal} />
  }

  return (
    <div className={'profile'}>
      <Header
        title={'Мой профиль'}
        additionalComponent={additionalHeaderComponent}
        additionalOnClick={additionalHeaderComponentClick}
      />
      <>
        {isLoading ? (
          <Preloader height={'auto'} />
        ) : dataUser ? (
          <>
            <Link to={CONSULTATION_ROUTE} className='profile__ _button-yellow'>
              Запись к психологу
            </Link>
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
                  Баланс: {balance} <img src={icon_reward} alt='reward' />
                </button>
                <Link to={SHOP_ROUTE} className='_button-white'>
                  Обменять
                </Link>
              </div>
            </div>
            <div className='profile__block'>
              <Platform />
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
              <div
                className='profile__out'
                onClick={() => setLogoutModal(true)}
              >
                Выйти из аккаунта
              </div>
            </div>
            <div className='profile-block'>
              <Footer />
            </div>
          </>
        ) : (
          <h1>Данных нет</h1>
        )}
      </>
    </div>
  )
}
