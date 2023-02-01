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

  const joinToChallenge = async () => {
    try {
      const response = await ChallengeService.challengeJoin(Number(params.id))
      console.log(response.data.success);
      if (response.data.success) {
        navigate(CHALLENGE_ROUTE)
      } else {
        await showToast('Ошибка!')
      }
    } catch (error) {
      await showToast('Ошибка!')
    }
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

      <button
        onClick={joinToChallenge}
        className={existTeam ? 'team-selection-page__button _button-white' : 'team-selection-page__button _button-white disabled'}
        disabled={!existTeam}
      >
        Готово
      </button>

    </div>
  )
}

interface ITeamItem {
  img: string
  title: string
  challengeId: number
  commandId: number,
  existTeam: boolean,
  setExistTeam: Dispatch<SetStateAction<boolean>>
}

const TeamItem: FC<ITeamItem> = ({ img, title, challengeId, commandId, setExistTeam, existTeam }) => {


  const joinToCommand = async () => {
    try {
      const response = await ChallengeService.teamJoin(commandId)
      console.log(response.data.success);
      if (response.data.success) {
        await showToast('Вы в команде!')
        setExistTeam(true)
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
        className='team-item__column'
      >
        <div className='team-item__img'>
          <img src={plug} alt='' />
        </div>
        <div className='team-item__title'>{title}</div>
      </Link>
      {!existTeam && (
        <div className='team-item__join text-blue' onClick={joinToCommand}>
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
