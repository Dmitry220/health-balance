import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  emailSelector,
  setEmail,
  setStage
} from '../../Redux/slice/authSlice'
import AuthService from '../../services/AuthService'
import Button, { typesButton } from '../../UI-Components/Button/Button'
import { stageRegistration } from '../../utils/enums'


export const Email = () => {
  const email = useAppSelector(emailSelector)
  const [error, setError] = useState<boolean>(false)
  const [disable, setDisabled] = useState<boolean>(true)

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
      setDisabled(true)
      return
    }
    try {
      const response = await AuthService.checkEmail(email)
      if (response.status === 200) {
        setDisabled(response.data.success)
        setError(response.data.success)
      }
    } catch (error) {
      setError(true)
      setDisabled(true)
    }
  }

  const validateEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    const value = e.target.value
    setDisabled(true)
    dispatch(setEmail(value))
  }


  return (
    <>
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
      <Button
        disabled={disable}
        customClass='registration__button'
        view={typesButton.white}
        onClick={() => dispatch(setStage(stageRegistration.password))}
      >Далее</Button>
    </>

  )
}
