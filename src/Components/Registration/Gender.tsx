import React from 'react'
import { useAppDispatch } from '../../utils/hooks/redux-hooks'
import { setGender } from '../../Redux/slice/authSlice'

export const Gender = () => {
  const dispatch = useAppDispatch()

  const handlerGender = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setGender(+e.target.value))

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
        defaultChecked={true}
      />
      <label htmlFor={'man'}>Мужской</label>
      <input type='radio' id={'woman'} name={'gender'} value={2} />
      <label htmlFor={'woman'}>Женский</label>
    </div>
  )
}
