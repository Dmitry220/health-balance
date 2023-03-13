import './profile.scss'
import { useNavigate } from 'react-router-dom'
import { DIALOG__ROUTE } from '../../provider/constants-route'
import avatar from '../../assets/image/avatar.jpeg'
import icon_chat from '../../assets/image/icon_chat.svg'
import { useAppSelector } from '../../hooks/redux-hooks'
import { infoUserSelector } from '../../Redux/slice/userSlice'
import { IMAGE_URL } from '../../http'
import ChatService from '../../services/ChatService'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import { useState } from 'react'
import { ModalChat } from '../Modals/Modal-chat'

export const ProfileMemberHead = () => {
  const infoUser = useAppSelector(infoUserSelector)
  const profile = useAppSelector(dataUserSelector)
  const [modalChat, setModalChat] = useState<boolean>(false)
  const navigate = useNavigate()

  const goChat = async () => {
    const response = await ChatService.newChannel(
      infoUser.name + ' ' + infoUser.surname,
      [infoUser.id]
    )
    navigate(DIALOG__ROUTE + '/' + response.data.data[0].id)
  }

  const generateGeneralChat = () => {
    setModalChat(true)
  }

  return (
    <div className={'profile-member-head'}>
      <div className='profile-member-head__row'>
        <div className='profile-member-head__column profile-member-head__column_col-1'>
          <div className='profile-member-head__avatar'>
            {infoUser.avatar && (
              <img
                src={IMAGE_URL + 'avatars/' + infoUser.avatar}
                alt='avatar'
              />
            )}
            {!infoUser.avatar && <img src={avatar} alt='avatar' />}
          </div>
          <div className='profile-member-head__user-name title'>
            {infoUser.name}
          </div>
        </div>
        {profile.id !== infoUser.id && (
          <div className='profile-member-head__column'>
            <div onClick={goChat}>
              <img src={icon_chat} alt='chat' />
            </div>
          </div>
        )}
      </div>
      {profile.role === 1 && (
        <div className='profile-member-head__row'>
          <button
            className='profile-member-head__button _button-dark-yellow'
            onClick={generateGeneralChat}
          >
            Добавить в общий чат
          </button>
        </div>
      )}
      {modalChat && (
        <ModalChat
          active={modalChat}
          setActive={setModalChat}
          idUser={infoUser.id}
        />
      )}
    </div>
  )
}
