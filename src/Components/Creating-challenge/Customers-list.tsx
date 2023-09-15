import React, {ChangeEvent, useEffect} from 'react'
import {
    creatingChallengeSelector,
    customersPersonalChallengeSelector,
    getCustomersPersonalChallenge,
    isLoadingSelector,
    setDataChallenge,
    setDisabledButton
} from '../../Redux/slice/challengeSlice'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import avatar from '../../assets/image/avatar.jpeg'
import './creating-challenge.scss'
import {IMAGE_URL} from '../../http'
import {Preloader} from '../Preloader/Preloader'

export const CustomersList = () => {

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(isLoadingSelector)
  const customers = useAppSelector(customersPersonalChallengeSelector)
  const {customers : checkedCustomers} = useAppSelector(creatingChallengeSelector)

  useEffect(() => {
    dispatch(getCustomersPersonalChallenge())
  }, [])

  useEffect(() => {
    dispatch(setDisabledButton(!checkedCustomers?.length))
  }, [checkedCustomers])

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(setDataChallenge({
        name: e.target.name,
        value: +e.target.value
      }))

  if (isLoading) return <Preloader height='auto' />

  if (!customers.length) return <h1>Участников нет</h1>

  return (
    <div className={'customers-list'}>
      <div className='customers-list__title'>
        Выберите участников личного челленджа
      </div>
      <div className='customers-list__checkbox custom-checkbox'>
        {(customers)?.map((customer, i) => (
          <div key={customer.id.toString()}>
            <input
              type={'checkbox'}
              id={customer.id.toString()}
              className={'custom-checkbox__radio'}
              onChange={handlerChange}
              defaultChecked={(checkedCustomers as number[])?.includes(customer.id)}
              value={customer.id}
            />
            <label
              htmlFor={customer.id.toString()}
              className={'customers-list__label'}
            >
              <div className='customers-list__info'>
                <div className='customers-list__img'>
                  <img
                    src={
                      customer.avatar
                        ? IMAGE_URL + 'avatars/' + customer.avatar
                        : avatar
                    }
                    alt={customer.avatar}
                  />
                </div>
                <div className='customers-list__text'>{customer.name}</div>
                <div className='customers-list__text'>{customer.surname}</div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
