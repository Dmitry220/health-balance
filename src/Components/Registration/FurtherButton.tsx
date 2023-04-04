import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  avatarSelector,
  birthdaySelector,
  disableButtonSelector,
  emailSelector,
  genderSelector,
  nameUserSelector,
  passwordSelector,
  platformSelector,
  resetFieldRegistration,
  setDisabledButton,
  surNameSelector,
  telephoneSelector
} from '../../Redux/slice/authSlice'
import { Device } from '@capacitor/device'
import './registration.scss'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../provider/constants-route'
import AuthService from '../../services/AuthService'
import { AxiosError } from 'axios'
import { showToast } from '../../utils/common-functions'

export interface IFurtherButton {
  order: number
  setOrder: Dispatch<SetStateAction<number>>
}

export const FurtherButton: FC<IFurtherButton> = ({ order, setOrder }) => {
  const disabledButton = useAppSelector(disableButtonSelector)

  const indexIdenticalButtons = [0, 1, 2, 3, 4, 5, 6, 7]

  return (
    <div className='registration__nav'>
      {indexIdenticalButtons.includes(order) && (
        <button
          className={
            'registration__button _button-white' +
            (disabledButton ? ' disabled' : '')
          }
          disabled={disabledButton}
          onClick={() => setOrder((prev) => prev + 1)}
        >
          {order !== 7 ? 'Далее' : 'Завершить регистрацию'}
        </button>
      )}
      {order === 8 && <ButtonSubmit order={order} setOrder={setOrder} />}
    </div>
  )
}

const ButtonSubmit: FC<IFurtherButton> = ({ order, setOrder }) => {
  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const disabledButton = useAppSelector(disableButtonSelector)
  const email = useAppSelector(emailSelector)
  const password = useAppSelector(passwordSelector)
  const phone = useAppSelector(telephoneSelector)
  const avatar = useAppSelector(avatarSelector)
  const name = useAppSelector(nameUserSelector)
  const surname = useAppSelector(surNameSelector)
  const gender = useAppSelector(genderSelector)
  const birthday = useAppSelector(birthdaySelector)
  const platform = useAppSelector(platformSelector)

  const submitRegistration = async () => {
    dispatch(setDisabledButton(true))
    setIsLoading(true)
    const uuid = await Device.getId()

    const device_token = uuid.uuid
    const timezone = -new Date().getTimezoneOffset()/60 
    try {
      const response = await AuthService.registration(
        name,
        surname,
        birthday,
        gender,
        avatar,
        phone,
        email,
        password,
        device_token,
        platform,
        timezone
      )
      if(response.data.success){
        await showToast('Регистрация прошла успешно!')
        dispatch(resetFieldRegistration())
        navigate(LOGIN_ROUTE)
      }else{
        await showToast('Ошибка!')
      } 
    } catch (e) {
      setOrder(0)
      const error = e as AxiosError<any>
      if (error.response?.data.errors?.email) {
        await showToast('Пользователь с таким email уже существует!')
      } else {
        await showToast('Ошибка!')
      }
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        className={
          'registration__button _button-white' +
          (disabledButton ? ' disabled' : '')
        }
        disabled={disabledButton}
        onClick={submitRegistration}
      >
        {isLoading ? (
          <span className='spinner'>
            <i className='fa fa-spinner fa-spin'></i> Загрузка
          </span>
        ) : 'Сохранить'}
      </button>
      <span
        className='registration__link text-yellow'
        onClick={submitRegistration}
      >
        {isLoading ? (
          <span className='spinner'>
            <i className='fa fa-spinner fa-spin'></i> Загрузка
          </span>
        ) : 'Пропустить'}
      </span>
    </div>
  )
}
