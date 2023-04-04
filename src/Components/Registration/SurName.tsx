import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  setDisabledButton,
  setSurname,
  surNameSelector
} from '../../Redux/slice/authSlice'

export const SurName = () => {
  const surName = useAppSelector(surNameSelector)
  const dispatch = useAppDispatch()
  const validationRegex = surName.length >= 2 && surName.length <= 20 && surName.match("^[a-zA-Z0-9]*$")
  useEffect(() => {
    validationRegex ? dispatch(setDisabledButton(false)) : dispatch(setDisabledButton(true))
  }, [surName])

  const validateSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setSurname(value.trim()))
  }
  return (
    <div style={{ position: 'relative' }}>
      <input
        type='text'
        className='registration__field _field'
        value={surName}
        onChange={validateSurname}
      />
      <span className={'registration__sub-text-input'}>
        Это обязательное поле
      </span>
    </div>
  )
}
