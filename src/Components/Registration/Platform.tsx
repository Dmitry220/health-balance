import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  getPlatforms,
  listPlatformSelector,
  platformSelector,
  setDisabledButton,
  setPlatform
} from '../../Redux/slice/authSlice'
import { DOC_URL } from '../../http'

export const Platform = () => {
  const dispatch = useAppDispatch()
  const listPLatforms = useAppSelector(listPlatformSelector)

  const platform = useAppSelector(platformSelector)
  const [agree, setAgree] = useState(false)

  const handlerAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgree((prev) => !prev)
    dispatch(setDisabledButton(platform === 0 ? true : agree))
  }

  const handlerPlatforms = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPlatform(+e.target.value))
    dispatch(setDisabledButton(+e.target.value === null ? true : !agree))
  }

  useEffect(() => {
    dispatch(getPlatforms())
    dispatch(setDisabledButton(true))
  }, [])

  return (
    <div className={'registration__platform'}>
      <div className='registration__select _custom-select'>
        <select 
        defaultValue={platform === 0 ? 'DEFAULT' : platform} 
        onChange={handlerPlatforms}
        >
          <option value={'DEFAULT'} disabled>Ваша платформа</option>
          {listPLatforms &&
            listPLatforms.map((p) => (
              <option value={p.id} key={p.id}>
                {p.title}
              </option>
            ))}
        </select>
      </div>
      <hr className={'registration__line'} />
      <div className='registration__necessarily'>Обязательно</div>
      <div className='registration__confidentiality confidentiality-block'>
        <div className='confidentiality-block__row custom-radio'>
          <input
            type='checkbox'
            id={'agree'}
            className={'custom-radio__checkbox'}
            onChange={handlerAgree}
          />
          <label htmlFor={'agree'} className='confidentiality-block__text'>
            Я принимаю Условия использования и Политику <br />
            конфиденциальности HealthBalance
          </label>
        </div>
        <a
          href={`${DOC_URL}terms.pdf`}
          className='confidentiality-block__text yellow'
          target='_blank'
          rel='noreferrer'
        >
          Условия использования
        </a>
        <a
          href={`${DOC_URL}privacy.pdf`}
          className='confidentiality-block__text yellow'
          target='_blank'
          rel='noreferrer'
        >
          Политика конфиденциальности
        </a>
      </div>
    </div>
  )
}
