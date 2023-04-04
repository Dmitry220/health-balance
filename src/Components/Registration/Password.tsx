import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  passwordSelector,
  setDisabledButton,
  setPassword
} from '../../Redux/slice/authSlice'

export const Password = () => {
  const password = useAppSelector(passwordSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    password.length >= 8 ? dispatch(setDisabledButton(false)) : dispatch(setDisabledButton(true))
  }, [password])

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setPassword(value.trim()))
  }
  return (
    <div style={{ position: 'relative' }}>
      <input
        type='password'
        className='registration__field _field'
        value={password}
        onChange={validatePassword}
      />
      <span className={'registration__sub-text-input'}>
        Минимум 8 символов.
      </span>
    </div>
  )
}
