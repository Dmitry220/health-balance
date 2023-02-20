import { useState } from 'react'
import { useEffect, Dispatch, SetStateAction } from 'react'
import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [existTeam, setExistTeam] = useState<boolean>(false)

  const redirectToChallenge = () => {
    navigate(CHALLENGE_ROUTE)
  }

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
          existTeam={existTeam}
          setExistTeam={setExistTeam}
        />
      ))}{' '}
      <br />
      {commands.length ? (
        <button
          onClick={redirectToChallenge}
          className={
            existTeam
              ? 'team-selection-page__button _button-white'
              : 'team-selection-page__button _button-white disabled'
          }
          disabled={!existTeam}
        >
          Готово
        </button>
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
  existTeam: boolean
  setExistTeam: Dispatch<SetStateAction<boolean>>
}

const TeamItem: FC<ITeamItem> = ({
  img,
  title,
  challengeId,
  commandId,
  setExistTeam,
  existTeam
}) => {
  const [disabledTeams, setDisabledTeams] = useState(false)

  const joinToChallenge = async () => {
    try {
      const response = await ChallengeService.challengeJoin(Number(challengeId))
      if (!response.data.success) {
        await showToast('Ошибка!')
      }
    } catch (error) {
      await showToast('Ошибка!')
    }
  }

  const joinToCommand = async () => {
    try {
      const response = await ChallengeService.teamJoin(commandId)
      if (response.data.success) {
        await showToast('Вы в команде!')
        setDisabledTeams(true)
        setExistTeam(true)
        await joinToChallenge()
      } else {
        await showToast('Ошибка!')
      }
    } catch (error) {
      await showToast('Ошибка!')
    }
  }

  return (
    <div className='team-selection__item team-item'>
      <Link
        to={TEAM_MEMBER_ROUTE + '/' + commandId}
        className={
          !existTeam ? 'team-item__column' : 'team-item__column disabled'
        }
      >
        <div className='team-item__img'>
          <img src={plug} alt='' />
        </div>
        <div className='team-item__title'>{title}</div>
      </Link>
      {!disabledTeams && (
        <div
          className={
            (existTeam ? disabledTeams : !existTeam)
              ? 'team-item__join text-blue'
              : 'team-item__join disabled text-blue'
          }
          onClick={joinToCommand}
        >
          Вступить
        </div>
      )}
      {disabledTeams && (
        <div className='team-item__join text-yellow'>
          Вы в команде <span />
        </div>
      )}
    </div>
  )
}
