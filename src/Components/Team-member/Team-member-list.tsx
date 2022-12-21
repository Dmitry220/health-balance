import { Link, useParams } from 'react-router-dom'
import { CHAT__ROUTE, PROFILE_MEMBER_ROUTE } from '../../provider/constants-route'
import icon_chat from '../../assets/image/icon_chat.svg'
import './team-member-list.scss'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {  getMembersCommandList, membersCommandListSelector } from '../../Redux/slice/challengeSlice'
import { useEffect } from 'react'
import { IMAGE_URL } from '../../http'

export const TeamMemberList = () => {


  const params = useParams()

  const dispatch = useAppDispatch()
  const members = useAppSelector(membersCommandListSelector)

  useEffect(() => {
    dispatch(getMembersCommandList(Number(params.id)))
  }, [])

  console.log(members);
  

  return (
    <div className={'team-member-list'}>
      {
        members&&members.customers.map(item => <div className='team-member-list__row' key={item.id}>
          <Link to={PROFILE_MEMBER_ROUTE+'/'+item.id} className='team-member-list__column'>
            <div className='team-member-list__avatar'>
              <img
                src={item.avatar ? (IMAGE_URL + 'avatars/' + item.avatar)
                : 'https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'}
              alt='avatar'
              />
            </div>
            <div className='team-member-list__user-name'>{item.name}</div>
          </Link>
          <div className='team-member-list__column'>
            <Link to={CHAT__ROUTE}>
              <img src={icon_chat} alt='chat' />
            </Link>
          </div>
        </div>)
      }
    </div>
  )
}
