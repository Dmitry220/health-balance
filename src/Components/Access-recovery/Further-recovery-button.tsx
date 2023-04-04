import { FC, useState } from 'react'
import { IFurtherButton } from '../Registration/FurtherButton'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  codeRecoverySelector,
  disableButtonSelector,
  emailRecoverySelector,
  passwordRecoverySelector,
  setDisabledButton,
  setError
} from '../../Redux/slice/accessRecoverySlice'
import './access-recovery.scss'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../provider/constants-route'
import AuthService from '../../services/AuthService'
import { showToast } from '../../utils/common-functions'

export const FurtherRecoveryButton: FC<IFurtherButton> = ({
  order,
  setOrder
}) => {
  const disabledButton = useAppSelector(disableButtonSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const email = useAppSelector(emailRecoverySelector)
  const password = useAppSelector(passwordRecoverySelector)
  const code = useAppSelector(codeRecoverySelector)
  const [isLoading, setIsLoading] = useState(false)

  const changePassword = async () => {

    if (order === 0) {
      setIsLoading(true)
      try {
        const response = await AuthService.restorePassword(email)
        if (response.data.success) {
          await showToast('Письмо с кодом отправлено на почту!')
          setOrder((prev) => prev + 1)
          dispatch(setDisabledButton(true))
          dispatch(setError(false))
        }

      } catch (error) {
        dispatch(setError(true))
      } finally {
        setIsLoading(false)
      }
    }
    if (order === 1) {
      try {
        setIsLoading(true)      
        const response = await AuthService.updatePassword(email, code, password)
        if(response.data.success){
         await showToast('Ваш пароль восстановлен!')
         navigate(LOGIN_ROUTE) 
        }      
      } catch (error) {
        await showToast('Не верный код из письма!')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <button
      className={
        'access-recovery__button _button-white' +
        ((disabledButton) ? ' disabled' : '')
      }
      disabled={disabledButton || isLoading}
      onClick={changePassword}
    >
      {isLoading ? (
        <span className='spinner'>
          <i className='fa fa-spinner fa-spin'></i> Загрузка
        </span>
      ) : order === 1 ? 'Изменить пароль' : 'Далее'}
    </button>
  )
}
