import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {
  CHALLENGE_ROUTE
} from '../../provider/constants-route'
import {
  commandListSelector,
  getCommandList
} from '../../Redux/slice/challengeSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import './team-selection.scss'
import { TeamItem } from './Team-item'

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

