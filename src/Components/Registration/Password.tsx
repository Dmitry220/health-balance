import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  passwordSelector,
  setDisabledButton,
  setPassword
} from '../../Redux/slice/authSlice'

export const Password = () => {
  const password = useAppSelector(passwordSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (password.length >= 8) {
      dispatch(setDisabledButton(false))
    }else{
      dispatch(setDisabledButton(true))
    }
  }, [])

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setPassword(value))
    value.length < 8
      ? dispatch(setDisabledButton(true))
      : dispatch(setDisabledButton(false))
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
