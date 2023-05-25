import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  emailSelector,
  setDisabledButton,
  setEmail
} from '../../Redux/slice/authSlice'
import AuthService from '../../services/AuthService'


export const Email = () => {
  const email = useAppSelector(emailSelector)
  const [error, setError] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const validRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      checkEmail()
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [email])

  async function checkEmail() {
    if (!email.match(validRegex)) {
      dispatch(setDisabledButton(true))
      return
    }
    try {
      const response = await AuthService.checkEmail(email)
      if (response.status === 200) {
        dispatch(setDisabledButton(response.data.success))
        setError(response.data.success)
      }
    } catch (error) {
      setError(true)
      dispatch(setDisabledButton(true))
    }
  }

  const validateEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    const value = e.target.value
    dispatch(setDisabledButton(true))
    dispatch(setEmail(value))
  }


  return (
    <div style={{ position: 'relative' }}>
      <input
        autoComplete='off'
        className={
          error
            ? 'registration__field _field error'
            : 'registration__field _field'
        }
        value={email}
        name='email'
        onChange={validateEmail}
      />
      {error && (
        <div className='registration__field-error'>
          Учетная запись с таким email уже существует
        </div>
      )}
    </div>

  )
}
