import { useEffect, useState } from 'react'
import './profile.scss'
import Header from '../../Components/Header/Header'
import icon_reward from '../../assets/image/icon_reward.svg'
import { Link, useNavigate } from 'react-router-dom'
import { EDITING_ROUTE, SETTINGS_ROUTE, SHOP_ROUTE } from '../../provider/constants-route'
import { ProfileSteps } from '../../Components/Profile/Profile-steps'
import { ProfileChallenge } from '../../Components/Profile/Profile-challenge'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  dataUserSelector,
  setUserData,
  updateProfile
} from '../../Redux/slice/profileSlice'
import { logout } from '../../Redux/slice/authSlice'
import { IMAGE_URL } from '../../http'
import settingsIcon from "../../assets/image/icon_option.svg";
import { balanceSelector } from '../../Redux/slice/appSlice'
import avatar from '../../assets/image/avatar.jpeg'
import { ModalExit } from '../../Components/Modals/Modal-exit'
import Pedometer from '../../plugins/pedometer'
import { Capacitor } from '@capacitor/core'


export const Profile = () => {

  const dataUser = useAppSelector(dataUserSelector)
  const ballance = useAppSelector(balanceSelector)
  const navigation = useNavigate();
  const dispatch = useAppDispatch()
  const [isLogoutModal, setLogoutModal] = useState<boolean>(false)
  const idUser = Number(localStorage.getItem('id'))

  const additionalHeaderComponent = <img src={settingsIcon} />;

  const additionalHeaderComponentClick = () => {
    navigation(SETTINGS_ROUTE);
  };

  useEffect(() => {
    dispatch(setUserData(idUser))
  }, [])

  if(isLogoutModal){
     return <ModalExit actionCallback={()=>{
      if(Capacitor.getPlatform() === 'android'){
        Pedometer.reset()
      }     
      dispatch(logout())
    }} closeCallback={setLogoutModal}/>
  }

  const ads = {
    naem: "sdf",
    f: null
  }

  return (
    <div className={'profile'}>
      <Header 
      title={'Мой профиль'} 
      additionalComponent={additionalHeaderComponent}
        additionalOnClick={additionalHeaderComponentClick}
      />
      <div className='profile__block'>
        <div className='profile__header'>
          <div className='profile__avatar'>
            {dataUser.avatar && <img src={IMAGE_URL + 'avatars/' + dataUser.avatar} alt='avatar' />}
            {!dataUser.avatar&&<img src={avatar} alt='avatar' />}
          </div>
          <div className='profile__user-info'>
            <div className='profile__user-name'>{dataUser.name + ' ' + (dataUser.surname != null ? dataUser.surname : '')}</div>
            <Link to={EDITING_ROUTE} className='profile__link text-blue'>
              Редактировать
            </Link>
          </div>
        </div>
        <div className='profile__buttons'>
          <button className='profile__button-balance'>
            Баланс: {ballance} <img src={icon_reward} alt='reward' />
          </button>
          <Link to={SHOP_ROUTE} className='_button-white'>Обменять</Link>
        </div>
      </div>
      <div className='profile__block'>
        <ProfileSteps steps={dataUser.steps} kilometer={+((dataUser.steps * 0.7) / 1000).toFixed(2)} />
      </div>
      <div className='profile__block'>
      <ProfileChallenge challenges={dataUser.challenges} completed_challenges={dataUser.completed_challenges}/>
      </div>
      <div className='profile__block'>
        <div className='profile__out' onClick={() => setLogoutModal(true)}>
          Выйти из аккаунта
        </div>
      </div>
    </div>
  )
}
