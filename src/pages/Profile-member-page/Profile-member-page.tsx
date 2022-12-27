import { useEffect } from 'react'
import { ProfileSteps } from '../../Components/Profile/Profile-steps'
import { ProfileChallenge } from '../../Components/Profile/Profile-challenge'
import { ProfileMemberHead } from '../../Components/Profile/Profile-member-head'
import './profile-member-page.scss'
import { ProfileMemberContact } from '../../Components/Profile/Profile-member-contact'
import Header from '../../Components/Header/Header'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { useLocation, useParams } from 'react-router-dom'
import { infoUserSelector, setUserInfo } from '../../Redux/slice/userSlice'

export const ProfileMemberPage = () => {
  const dispacth = useAppDispatch()
  const params = useParams()
  const infoUser = useAppSelector(infoUserSelector)
  useEffect(() => {
    dispacth(setUserInfo(Number(params.id)))
  }, [])

  return (
    <div className={'profile-member-page'}>
      <Header title={'Профиль участника'} />
      <div className='profile-member-page__block'>
        <ProfileMemberHead />
      </div>
      <div className='profile-member-page__block'>
        <ProfileSteps
          steps={infoUser.steps}
          kilometer={+((infoUser.steps * 0.7) / 1000).toFixed(2)}
        />
      </div>
      <div className='profile-member-page__block'>
        <ProfileChallenge
          challenges={infoUser.challenges}
          completed_challenges={infoUser.completed_challenges}
        />
      </div>
      <div className='profile-member-page__block'>
        <ProfileMemberContact />
      </div>
    </div>
  )
}
