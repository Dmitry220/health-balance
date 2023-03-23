import { FC, useEffect } from 'react'
import './list-leaders-challenge.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  getLeaderboardChallenge,
  getLeaderboardTeamsChallenge,
  isLoadingSelector,
  leaderboardChallengeSelector,
  leaderboardTeamsChallengeSelector
} from '../../Redux/slice/leaderBoardSlice'
import { Preloader } from '../Preloader/Preloader'
import { LeaderboardItem } from './Leaderboard-item'

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
  const leaderboardTeamsChallenge = useAppSelector(leaderboardTeamsChallengeSelector)
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

