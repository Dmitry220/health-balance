import { Dispatch, FC, SetStateAction } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  avatarSelector,
  birthdaySelector,
  disableButtonSelector,
  emailSelector,
  genderSelector,
  nameUserSelector,
  passwordSelector,
  platformSelector,
  requestRegistration,
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

    const uuid = await Device.getId()

    const device_token = uuid.uuid

    try {
      await AuthService.registration(
        name,
        surname,
        birthday,
        gender,
        avatar,
        phone,
        email,
        password,
        device_token,
        platform
      ) 
      console.log('успекх');
      
      navigate(LOGIN_ROUTE)    
    } 
    catch (e) {       
      setOrder(0)       
      const error = e as AxiosError<any>         
      if(error.response?.data.errors?.email){
        await showToast('Пользователь с таким email уже существует!')      
      }else{     
        await showToast('Ошибка!')    
      }         
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
        Сохранить
      </button>
      <span
        className='registration__link text-yellow'
        onClick={submitRegistration}
      >
        Пропустить
      </span>
    </div>
  )
}
