import {ProfileSteps} from '../../Components/Profile/Profile-steps'
import {ProfileChallenge} from '../../Components/Profile/Profile-challenge'
import {ProfileMemberHead} from '../../Components/Profile/Profile-member-head'
import './profile-member-page.scss'
import {ProfileMemberContact} from '../../Components/Profile/Profile-member-contact'
import Header from '../../Components/Header/Header'
import {useParams} from 'react-router-dom'
import {useGetUserDataOnIdQuery} from "../../services/user.api";
import {useAppSelector} from '../../hooks/redux-hooks'
import {dataUserSelector} from '../../Redux/slice/profileSlice'

export const ProfileMemberPage = () => {

    const params = useParams()
    const profile = useAppSelector(dataUserSelector)
    const {data: profileMember, isLoading} = useGetUserDataOnIdQuery(Number(params.id))

    return (
        <div className={'profile-member-page'}>
            <Header title={'Профиль участника'}/>
            {
                <>
                    {isLoading ? (
                        <>Loading...</>
                    ) : profileMember ? (
                        <>
                            <div className='profile-member-page__block'>
                                <ProfileMemberHead profileMember={profileMember}/>
                            </div>
                            <div className='profile-member-page__block'>
                                <ProfileSteps
                                    steps={profileMember.steps}
                                    kilometer={+((profileMember.steps * 0.7) / 1000).toFixed(2)}
                                />
                            </div>
                            <div className='profile-member-page__block'>
                                <ProfileChallenge
                                    challenges={profileMember.challenges}
                                    completed_challenges={profileMember.completed_challenges}
                                />
                            </div>
                            {(profile?.role === 1 || profile?.role === 2) &&
                            <div className='profile-member-page__block'>
                               <ProfileMemberContact profileMember={profileMember}/>
                            </div>}
                        </>
                    ) : (
                        <h1>Данных нет</h1>
                    )}
                </>
            }
        </div>
    )
}
