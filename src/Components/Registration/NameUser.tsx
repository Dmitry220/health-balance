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
    if (nameUser.length >= 2 && nameUser.length <= 20) {
      dispatch(setDisabledButton(false))
    }else{
      dispatch(setDisabledButton(true))
    }
  }, [nameUser])

  const validateUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setNameUser(value))
    value.length < 2 && value.length >= 20
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
