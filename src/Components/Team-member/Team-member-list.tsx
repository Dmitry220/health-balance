import { Link } from 'react-router-dom'
import { CHAT__ROUTE } from '../../provider/constants-route'
import icon_chat from '../../assets/image/icon_chat.svg'
import './team-member-list.scss'

export const TeamMemberList = () => {
  return (
    <div className={'team-member-list'}>
      <div className='team-member-list__row'>
        <div className='team-member-list__column'>
          <div className='team-member-list__avatar'>
            <img
              src='https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'
              alt='avatar'
            />
          </div>
          <div className='team-member-list__user-name'>Усейн Болт</div>
        </div>
        <div className='team-member-list__column'>
          <Link to={CHAT__ROUTE}>
            <img src={icon_chat} alt='chat' />
          </Link>
        </div>
      </div>
      <div className='team-member-list__row'>
        <div className='team-member-list__column'>
          <div className='team-member-list__avatar'>
            <img
              src='https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'
              alt='avatar'
            />
          </div>
          <div className='team-member-list__user-name text-yellow'>
            Усейн Болт
          </div>
        </div>
        <div className='team-member-list__column'>
          <Link to={CHAT__ROUTE}>
            <img src={icon_chat} alt='chat' />
          </Link>
        </div>
      </div>
    </div>
  )
}
