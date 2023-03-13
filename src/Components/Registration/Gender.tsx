import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { genderSelector, setDisabledButton, setGender } from '../../Redux/slice/authSlice'

export const Gender = () => {
  const dispatch = useAppDispatch()
  const gender = useAppSelector(genderSelector)

  const handlerGender = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setGender(+e.target.value))

  useEffect(() => {
    dispatch(setDisabledButton(false))
  }, [])

  return (
    <div
      className={'registration__gender select-gender'}
      onChange={handlerGender}
    >
      <input
        type='radio'
        id={'man'}
        name={'gender'}
        value={1}
        defaultChecked={gender === 1}
      />
      <label htmlFor={'man'}>Мужской</label>
      <input type='radio' id={'woman'} name={'gender'} value={2} defaultChecked={gender === 2} />
      <label htmlFor={'woman'}>Женский</label>
    </div>
  )
}
