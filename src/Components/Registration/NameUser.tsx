import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  nameUserSelector,
  setDisabledButton,
  setNameUser
} from '../../Redux/slice/authSlice'

export const NameUser = () => {
  const nameUser = useAppSelector(nameUserSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (nameUser.length >= 3) {
      dispatch(setDisabledButton(false))
    }
  }, [])

  const validateUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setNameUser(value))
    value.length < 3
      ? dispatch(setDisabledButton(true))
      : dispatch(setDisabledButton(false))
  }
  return (
    <div style={{ position: 'relative' }}>
      <input
        type='text'
        className='registration__field _field'
        value={nameUser}
        onChange={validateUserName}
      />
      <span className={'registration__sub-text-input'}>
        Это имя появится в профиле HealthBalance
      </span>
    </div>
  )
}
