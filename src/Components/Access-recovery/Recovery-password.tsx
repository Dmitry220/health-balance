import { ChangeEvent, useEffect, useState } from 'react'
import { passwordRecoverySelector, setCode, setDisabledButton, setRecoveryPassword } from '../../Redux/slice/accessRecoverySlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import './access-recovery.scss'

export const RecoveryPassword = () => {

  const password = useAppSelector(passwordRecoverySelector)
  const dispatch = useAppDispatch()

  const [repeatPassword, setRepeatPassword] = useState<string | number>('')
  // const [error, setError] = useState<string>('')

  const handlerCode = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCode(+e.target.value.replace(/\D/, '')))
  }

  const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRecoveryPassword(e.target.value))
    // if(+e.target.value.length<8 && +e.target.value.length>0){
    //   setError('Неверная длина пароля!!!')
    // }else{
    //   setError('')
    // }
    
  }
  const handlerRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => setRepeatPassword(e.target.value)

  useEffect(() => {
    if ((repeatPassword === password) && password.length >= 8) {
      dispatch(setDisabledButton(false))
      // setError('')
    } else {
      // if (repeatPassword > 0 && password.length>=8) {
      //   setError('Пароли не совпадают')
      // }
      dispatch(setDisabledButton(true))
    }
  }, [repeatPassword, password])


  return (
    <div className={'recovery-password'}>
      <div className='recovery-password__title main-title'>Код из письма</div>
      <input
        type='number'
        className='recovery-password__field _field'
        onChange={handlerCode}
      />
      <div className='recovery-password__title main-title'>Новый пароль</div>
      <input
        type='password'
        className='recovery-password__field _field'
        onChange={handlerPassword}
      />
      <div className='recovery-password__title main-title'>
        Повторите пароль
      </div>
      <input
        type='password'
        value={repeatPassword}
        className='recovery-password__field _field'
        onChange={handlerRepeatPassword}
      />
      {/* <span className={'recovery-password__error'}>
        {error}
      </span> */}
    </div>
  )
}
