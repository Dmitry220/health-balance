import React, { useEffect, useState } from 'react'
import './creating-challenge.scss'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  setTypeChallenge,
  typeCreatingChallengeSelector
} from '../../Redux/slice/challengeSlice'
import { setQuantityPurpose, setRewardPurpose } from '../../Redux/slice/purposeSlice'

export const TypeChallenge = () => {
  const dispatch = useAppDispatch()
  const [resetTarget, setResetTarget] = useState<boolean>(false)
  const type = useAppSelector(typeCreatingChallengeSelector)
  const handlerType = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTypeChallenge(+e.target.value))
    setResetTarget(true)
  }

  useEffect(() => {
    if (resetTarget) {
      dispatch(setRewardPurpose(0))
      dispatch(setQuantityPurpose(0))
    }

  }, [type])

  return (
    <div className={'type-challenge'}>
      <div className='type-challenge__title main-title'>Тип челленджа</div>
      <div className='type-challenge__body' onChange={handlerType}>
        <input
          type='radio'
          name={'type-challenge'}
          value={3}
          id={'personal'}
          defaultChecked={type === 3}
          className='type-challenge__input'
        />
        <label htmlFor='personal' className='type-challenge__label'>
          Личный
        </label>
        <input
          type='radio'
          name={'type-challenge'}
          value={2}
          className='type-challenge__input'
          id={'command'}
          defaultChecked={type === 2}
        />
        <label htmlFor='command' className='type-challenge__label command'>
          Командный
        </label>
      </div>
    </div>
  )
}
