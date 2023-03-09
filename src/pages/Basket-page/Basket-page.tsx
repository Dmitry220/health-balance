import Header from '../../Components/Header/Header'
import { BasketCard } from '../../Components/Basket/Basket-card'
import './basket-page.scss'
import { useNavigate } from 'react-router-dom'
import { MAKING_ORDER_ROUTE } from '../../provider/constants-route'
import { ShopButton } from '../../Components/Shop/Shop-button'
import { basketSelector } from '../../Redux/slice/shopSlice'
import { useAppSelector } from '../../hooks/redux-hooks'
import { balanceSelector } from '../../Redux/slice/appSlice'
import { showToast } from '../../utils/common-functions'

export const BasketPage = () => {
  const navigate = useNavigate()
  const basket = useAppSelector(basketSelector)
  const ballance = useAppSelector(balanceSelector)
  const sum = basket
    .filter((item) => item)
    .reduce((sum, current) => sum + current.price, 0)

  const exchange = async () => {
    if (ballance >= sum) {
      navigate(MAKING_ORDER_ROUTE)
    } else {
      await showToast('На вашем счете недостаточно монет')
    }
  }

  return (
    <div className={'basket-page'}>
      <Header title={'Корзина'} />
      <div className='basket-page__cards'>
        {basket.map((item) => (
          <div className='basket-page__card' key={item.id}>
            <BasketCard
              id={item.id}
              image={item.image}
              price={item.price}
              title={item.title}
            />
          </div>
        ))}
        {basket.length === 0 && <h1>Корзина пуста</h1>}
      </div>
      <div className='basket-page__button'>
        {ballance < sum && (
          <div className='basket-page__text-danger'>
            На вашем счете недостаточно монет
          </div>
        )}
        {basket.length !== 0 && (
          <ShopButton title={'Обменять'} rewardCount={sum} onClick={exchange} />
        )}
      </div>
    </div>
  )
}
