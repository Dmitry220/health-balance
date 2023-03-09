import './exchange-history.scss'
import Header from '../../Components/Header/Header'
import { BasketCard } from '../../Components/Basket/Basket-card'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { getOrders, isLoadingSelector, ordersSelector } from '../../Redux/slice/shopSlice'
import { Preloader } from '../../Components/Preloader/Preloader'

export const ExchangeHistory = () => {

  const orders = useAppSelector(ordersSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getOrders())
  }, [])

  if (isLoading) {
    return <Preloader />
  }


  return (
    <div className={'exchange-history'}>
      <Header title={'История обмена'} />
      {
        orders.map(order => (
          <div className='exchange-history__item' key={order.id}>
            <div className='exchange-history__data'>{new Date(order.created_at * 1000).toLocaleDateString()}</div>
            {
              order.products.map(product => (
                <BasketCard id={product.id} image={product.image} price={product.price} title={product.title} key={product.id} />
              ))
            }
          </div>
        ))
      }
      {
        orders.length === 0 && <h1>Покупок нет!</h1>
      }
    </div>
  )
}
