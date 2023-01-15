import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  setDisabledButton,
  setTelephone,
  telephoneSelector
} from '../../Redux/slice/authSlice'
import InputMask from 'react-input-mask'

export const Telephone = () => {
  const telephone = useAppSelector(telephoneSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (telephone.length && !telephone.includes('_')) {
      dispatch(setDisabledButton(false))
    } else {
      dispatch(setDisabledButton(true))
    }
  }, [])

  const validateTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setTelephone(value))
    const isFullTelephone = value.includes('_')
    isFullTelephone
      ? dispatch(setDisabledButton(true))
      : dispatch(setDisabledButton(false))
  }

  return (
    <InputMask
      className='registration__field _field'
      mask='+7 (999) 999-99-99'
      placeholder='+7 (---) --------'
      type={'tel'}
      onChange={validateTelephone}
      value={telephone}
    />
  )
}
