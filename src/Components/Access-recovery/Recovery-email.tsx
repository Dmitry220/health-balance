import React, { FC, useState } from 'react'
import './access-recovery.scss'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  emailRecoverySelector,
  errorRecoverySelector,
  setDisabledButton,
  setError,
  setRecoveryEmail
} from '../../Redux/slice/accessRecoverySlice'

export const RecoveryEmail = () => {
  const error = useAppSelector(errorRecoverySelector)
  const email = useAppSelector(emailRecoverySelector)
  const dispatch = useAppDispatch()

  
  const handlerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setError(false))
    const validRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const value = e.target.value
    dispatch(setRecoveryEmail(e.target.value))
    value.match(validRegex)
      ? dispatch(setDisabledButton(false))
      : dispatch(setDisabledButton(true))
   
  }



  return (
    <div className={'recovery-email'}>
      <div className='recovery-email__title main-title'>Укажите вашу почту</div>
      <input
        type='text'
        className={
          error
            ? 'recovery-email__field _field error'
            : 'recovery-email__field _field'
        }
        value={email}
        onChange={handlerEmail}
      />
      {error && (
        <div className='recovery-email__error'>
          Учетная запись с таким email не существует
        </div>
      )}
    </div>
  )
}
