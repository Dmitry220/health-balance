import { ChangeEvent, useEffect } from 'react'
import {
  maxPeoplesCreatingChallengeSelector,
  setDisabledButton,
  setMaxPeoplesChallenge,
  setTeamAmountChallenge,
  teamAmountCreatingChallengeSelector
} from '../../Redux/slice/challengeSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import './creating-challenge.scss'

export const CreatingCommandsChallenge = () => {
  const dispatch = useAppDispatch()

  const maxPeoples = useAppSelector(maxPeoplesCreatingChallengeSelector)
  const teamAmount = useAppSelector(teamAmountCreatingChallengeSelector)

  const handlerTeamAmount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTeamAmountChallenge(e.target.value.replace(/\D/, '')))
    // dispatch(setDisabledButton(false))
  }
  const handleraMaxPeoples = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMaxPeoplesChallenge(e.target.value.replace(/\D/, '')))
    //dispatch(setDisabledButton(false))
  }

  useEffect(() => {
    if (maxPeoples !== 0 && teamAmount !== 0) {
      dispatch(setDisabledButton(false))
    }
  }, [maxPeoples, teamAmount])

  return (
    <div className={'creating-commands-challenge'}>
      <div className='creating-commands-challenge__main-title main-title'>
        Команды
      </div>
      <div className='creating-commands-challenge__block'>
        <h1 className='creating-commands-challenge__title'>
          Количество команд
        </h1>
        <input type="number" className='_field' onChange={handlerTeamAmount} value={teamAmount} />

      </div>
      <div className='creating-commands-challenge__block'>
        <h1 className='creating-commands-challenge__title'>
          Участников на команду
        </h1>
        <input type="number" className='_field' onChange={handleraMaxPeoples} value={maxPeoples} />
      </div>
    </div>
  )
}
