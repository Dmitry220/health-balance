import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  nameUserSelector,
  setDisabledButton,
  setNameUser
} from '../../Redux/slice/authSlice'

export const NameUser = () => {
  const nameUser = useAppSelector(nameUserSelector)
  const dispatch = useAppDispatch()
  const validationRegex = nameUser.length >= 2 && nameUser.length <= 20 && nameUser.match("^[a-zA-Z0-9]*$")

  useEffect(() => {
    if( validationRegex){
      dispatch(setDisabledButton(false))
      return
    }
    dispatch(setDisabledButton(true))
  }, [nameUser])

  const validateUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setNameUser(value))
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
