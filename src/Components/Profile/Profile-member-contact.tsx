import { infoUserSelector } from '../../Redux/slice/userSlice'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import './profile.scss'

export const ProfileMemberContact = () => {
  const infoUser = useAppSelector(infoUserSelector)

  return (
    <div className={'profile-member-contact'}>
      <div className='profile-member-contact__row'>
        <div className='profile-member-contact__caption'>Email</div>
        <div className='profile-member-contact__value title-17'>
          {infoUser.email}
        </div>
        <div className='profile-member-contact__caption'>Телефон</div>
        <div className='profile-member-contact__value title-17'>
          {infoUser.phone}
        </div>
        <div className='profile-member-contact__caption'>Дата рождения</div>
        <div className='profile-member-contact__value title-17'>
          {new Date(infoUser.birthday * 1000).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
