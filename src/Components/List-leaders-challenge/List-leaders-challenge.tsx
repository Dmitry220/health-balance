import { FC, useEffect } from 'react'
import './list-leaders-challenge.scss'
import icon from '../../assets/image/icon_reward.svg'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  getLeaderboardChallenge,
  getLeaderboardTeamsChallenge,
  isLoadingSelector,
  leaderboardChallengeSelector,
  leaderboardTeamsChallengeChallengeSelector
} from '../../Redux/slice/leaderBoardSlice'
import { IMAGE_URL } from '../../http'
import avatar from '../../assets/image/avatar.jpeg'
import {
  ILeaderBoardChallenge,
  ILeaderBoardChallengTeam
} from '../../models/ILeaderBoard'
import { Preloader } from '../Preloader/Preloader'
import { Link } from 'react-router-dom'
import { PROFILE_MEMBER_ROUTE, TEAM_MEMBER_ROUTE } from '../../provider/constants-route'

interface IListLeadersChallenge {
  type: number
  idChallenge: number
}

export const ListLeadersChallenge: FC<IListLeadersChallenge> = ({
  type,
  idChallenge
}) => {
  const dispatch = useAppDispatch()
  const leaderboardChallenge = useAppSelector(leaderboardChallengeSelector)
  const leaderboardTeamsChallenge = useAppSelector(
    leaderboardTeamsChallengeChallengeSelector
  )
  const isLoading = useAppSelector(isLoadingSelector)

  useEffect(() => {
    if (type === 2) {
      dispatch(getLeaderboardTeamsChallenge(idChallenge))
    } else {
      dispatch(getLeaderboardChallenge(idChallenge))
    }
  }, [idChallenge])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={'leader-challenge'}>
      <div className='leader-challenge__header'>
        <div className='leader-challenge__title'>
          {type === 3 ? 'Участники' : 'Команды'}
        </div>
        <div className='leader-challenge__title'>Прогресс</div>
      </div>
      <div className='leader-challenge__items'>
        {(type === 1 || type === 3) &&
          leaderboardChallenge.map((item, i) => (
            <LeaderboardItem
              item={item}
              place={i + 1}
              typeChallenge={type}
              key={item.id}
            />
          ))}
        {type === 2 &&
          leaderboardTeamsChallenge.map((item, i) => (
            <LeaderboardItem
              item={item}
              place={i + 1}
              typeChallenge={type}
              key={item.id}
            />
          ))}
      </div>
    </div>
  )
}

interface ILeaderboardItem {
  place: number
  typeChallenge: number
  item: ILeaderBoardChallengTeam & ILeaderBoardChallenge
}

const LeaderboardItem: FC<ILeaderboardItem> = ({
  place,
  typeChallenge,
  item
}) => {
  const idProfile = Number(localStorage.getItem('id'))

  const colorReward = (place: number) => {
    switch (place) {
      case 1:
        return 'item-leader__place_1'
      case 2:
        return 'item-leader__place_2'
      case 3:
        return 'item-leader__place_3'
      default:
        return ''
    }
  }

  return (
    <Link to={typeChallenge === 2 ? TEAM_MEMBER_ROUTE + '/' + item.id : PROFILE_MEMBER_ROUTE+'/'+item.id} className='leader-challenge__item item-leader'>
      <div className='item-leader__column item-leader__column_1'>
        <div className={'item-leader__place ' + colorReward(place)}>
          {place}
        </div>
        <div
          className={
            typeChallenge === 3
              ? 'item-leader__avatar item-leader__avatar_member'
              : 'item-leader__avatar'
          }
        >
          {
            <img
              src={item.avatar ? IMAGE_URL + 'avatars/' + item.avatar : avatar}
              alt='avatar'
              style={{ borderRadius: typeChallenge === 3 ? '50%' : '10px' }}
            />
          }
        </div>
        <div
          className={
            item.id === idProfile
              ? 'item-leader__title item-leader__title_yourCommand'
              : 'item-leader__title'
          }
        >
          {typeChallenge === 2 ? item.title : item.name}
          {item.active === 1 && (
            <div className='item-leader__your-command'>Ваша команда</div>
          )}
        </div>
      </div>
      <div className='item-leader__column item-leader__column_2'>
        <div className='item-leader__icon'>
          <img src={icon} alt='icon' />
        </div>
        <div className='item-leader__reward'>{item.points || 0}</div>
      </div>
    </Link>
  )
}
