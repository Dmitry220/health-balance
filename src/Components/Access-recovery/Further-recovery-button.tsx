import { FC } from 'react'
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

  const changePassword = async () => {
    if (order === 0) {
      try {
        await AuthService.restorePassword(email)
        await showToast('Письмо с кодом отправлено на почту!')
        if (order < 1) {
          setOrder((prev) => prev + 1)
          dispatch(setDisabledButton(true))
          dispatch(setError(false))
        }
      } catch (error) {
        dispatch(setError(true))
      }
    }
    if (order === 1) {
      try {
        await AuthService.updatePassword(email, code, password)
        await showToast('Ваш пароль восстановлен!')
        navigate(LOGIN_ROUTE)
      } catch (error) {
        await showToast('Ошибка! ' + error)
      }
    }
  }

  return (
    <button
      className={
        'access-recovery__button _button-white' +
        (disabledButton ? ' disabled' : '')
      }
      disabled={disabledButton}
      onClick={changePassword}
    >
      {order === 1 ? 'Изменить пароль' : 'Далее'}
    </button>
  )
}
