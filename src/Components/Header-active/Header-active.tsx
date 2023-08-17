import { FC, useEffect } from 'react'
import './header-active.scss'
import { RewardCount } from '../Reward/Reward-count'
import icon_chat from '../../assets/image/icon_chat.svg'
import { Link } from 'react-router-dom'
import { CHAT__ROUTE, PROFILE_ROUTE } from '../../provider/constants-route'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import { IMAGE_URL } from '../../http'
import { balanceSelector, getBalance, heightStatusBarSelector } from '../../Redux/slice/appSlice'
import avatar from '../../assets/image/avatar.jpeg'
import { Capacitor } from '@capacitor/core'


interface IHeaderActive {
  transparent: boolean
}

const HeaderActive: FC<IHeaderActive> = ({ transparent }) => {
  const dataUser = useAppSelector(dataUserSelector)
  const balance = useAppSelector(balanceSelector)
  const statusBar = useAppSelector(heightStatusBarSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getBalance())
  }, [])

  return (
    <div
      className={'header-active'}
      style={{
        background: transparent ? 'transparent' : '#121212',
        top: Capacitor.getPlatform() === 'ios' ? 0 : 'auto',
        padding:
          Capacitor.getPlatform() === 'ios'
            ? `${+statusBar}px 16px 16px 16px`
            : '16px 16px 16px 16px'
      }}
    >
      <div className='header-active__container'>
        <Link to={PROFILE_ROUTE} className='header-active__column'>
          <div className='header-active__avatar'>
            {dataUser.avatar && (
              <img
                src={IMAGE_URL + 'avatars/' + dataUser.avatar}
                alt='avatar'
              />
            )}
            {!dataUser.avatar && <img src={avatar} alt='avatar' />}
          </div>
          <div className='header-active__user-name icon-icon_back'>
            {dataUser.name}
          </div>
        </Link>
        <div className='header-active__column'>
          {transparent ? (
            <RewardCount count={balance} />
          ) : (
            <Link to={CHAT__ROUTE}>
              <img src={icon_chat} alt='' />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderActive
