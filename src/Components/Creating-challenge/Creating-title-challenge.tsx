import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  setDisabledButton,
  setTitleChallenge,
  titleCreatingChallengeSelector
} from '../../Redux/slice/challengeSlice'
import './creating-challenge.scss'

export const CreatingTitleChallenge = () => {
  const dispatch = useAppDispatch()
  const title = useAppSelector(titleCreatingChallengeSelector)

  const handlerTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitleChallenge(e.target.value))
    e.target.value.length >= 3
      ? dispatch(setDisabledButton(false))
      : dispatch(setDisabledButton(true))
  }

  useEffect(() => {
    if (title.length >= 3) {
      dispatch(setDisabledButton(false))
    }
  }, [])

  return (
    <div className={'creating-title-challenge'}>
      <div className='creating-title-challenge__title main-title'>Название</div>
      <input
        type='text'
        className='creating-title-challenge__field _field'
        onChange={handlerTitle}
        value={title}
      />
      <div className='creating-title-challenge__note small-text'>
        {title.length}/65
      </div>
    </div>
  )
}
