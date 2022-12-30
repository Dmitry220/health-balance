import './profile.scss'
import { Link, useNavigate } from 'react-router-dom'
import { CHAT__ROUTE, DIALOG__ROUTE } from '../../provider/constants-route'
import avatar from '../../assets/image/avatar.jpeg'
import icon_chat from '../../assets/image/icon_chat.svg'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import { infoUserSelector } from '../../Redux/slice/userSlice'
import { IMAGE_URL } from '../../http'
import ChatService from '../../services/ChatService'

export const ProfileMemberHead = () => {
  const infoUser = useAppSelector(infoUserSelector)
  const navigate = useNavigate()

  const goChat = async () => {
    const response = await ChatService.newChannel(infoUser.name+' '+infoUser.surname, [infoUser.id])
    console.log(response.data.data);
    navigate(DIALOG__ROUTE+'/'+response.data.data[0].id)
  }

  return (
    <div className={'profile-member-head'}>
      <div className='profile-member-head__row'>
        <div className='profile-member-head__column'>
          <div className='profile-member-head__avatar'>
           {infoUser.avatar && <img src={IMAGE_URL + 'avatars/' + infoUser.avatar} alt='avatar' />}
           {!infoUser.avatar && <img src={avatar} alt='avatar' />}
          </div>
          <div className='profile-member-head__user-name title'>
            {infoUser.name}
          </div>
        </div>
        <div className='profile-member-head__column'>
          <div onClick={goChat}>
            <img src={icon_chat} alt='chat' />
          </div>
        </div>
      </div>
      <div className='profile-member-head__row'>
        <button className='profile-member-head__button _button-dark-yellow'>
          Добавить в общий чат
        </button>
      </div>
    </div>
  )
}
