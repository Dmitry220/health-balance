import './exchange-history.scss'
import Header from '../../Components/Header/Header'
import { BasketCard } from '../../Components/Basket/Basket-card'

export const ExchangeHistory = () => {
  return (
    <div className={'exchange-history'}>
      <Header title={'История обмена'} />
      <div className='exchange-history__item'>
        <div className='exchange-history__data'>12.12.2021</div>
        <BasketCard />
      </div>
      <div className='exchange-history__item'>
        <div className='exchange-history__data'>12.12.2021</div>
        <BasketCard />
      </div>
      <div className='exchange-history__item'>
        <div className='exchange-history__data'>12.12.2021</div>
        <BasketCard />
      </div>
    </div>
  )
}
