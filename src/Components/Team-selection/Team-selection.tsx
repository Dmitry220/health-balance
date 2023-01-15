import { useState } from 'react'
import { useEffect } from 'react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {
  CHALLENGE_ROUTE,
  TEAM_MEMBER_ROUTE
} from '../../provider/constants-route'
import {
  commandListSelector,
  getCommandList
} from '../../Redux/slice/challengeSlice'
import ChallengeService from '../../services/ChallengeService'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import './team-selection.scss'
import plug from '../../assets/image/plug.png'
import { showToast } from '../../utils/common-functions'

export const TeamSelection = () => {
  const params = useParams()

  const dispatch = useAppDispatch()
  const commands = useAppSelector(commandListSelector)

  useEffect(() => {
    dispatch(getCommandList(Number(params.id)))
  }, [])

  return (
    <div className={'team-selection'}>
      {commands.map((item) => (
        <TeamItem
          key={item.id}
          commandId={item.id}
          title={item.title}
          img={''}
          challengeId={item.challenge_id}
        />
      ))}{' '}
      <br />
      {commands.length ? (
        <Link
          to={CHALLENGE_ROUTE}
          className='team-selection-page__button _button-white'
        >
          Готово
        </Link>
      ) : (
        <h1>Команд нет!</h1>
      )}
    </div>
  )
}

interface ITeamItem {
  img: string
  title: string
  challengeId: number
  commandId: number
}

const TeamItem: FC<ITeamItem> = ({ img, title, challengeId, commandId }) => {
  const [existTeam, setExistTeam] = useState<boolean>(false)

  const join = async () => {
    try {
      await ChallengeService.challengeJoin(challengeId)
      setExistTeam(true)
      await showToast('Вы в команде!')
    } catch (error) {
      await showToast('Ошибка!')
    }
  }

  return (
    <div className='team-selection__item team-item'>
      <Link
        to={TEAM_MEMBER_ROUTE + '/' + commandId}
        className='team-item__column'
      >
        <div className='team-item__img'>
          <img src={plug} alt='' />
        </div>
        <div className='team-item__title'>{title}</div>
      </Link>
      {!existTeam && (
        <div className='team-item__join text-blue' onClick={join}>
          Вступить
        </div>
      )}
      {existTeam && (
        <div className='team-item__joined text-yellow'>
          Вы в команде <span />
        </div>
      )}
    </div>
  )
}
