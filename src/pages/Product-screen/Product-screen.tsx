import { useParams } from 'react-router-dom'
import './product-screen.scss'
import Header from '../../Components/Header/Header'
import { ShopHead } from '../../Components/Shop/Shop-head'
import { ShopButton } from '../../Components/Shop/Shop-button'

export const ProductScreen = () => {
  const params = useParams()

  const addBasket = () => {
    console.log('Add')
  }

  console.log(params)

  return (
    <div className={'product-screen'}>
      <Header title={'Награда'} />
      <ShopHead marginBottom={42} />
      <div className='product-screen__image'>
        <img
          src='https://i.pinimg.com/originals/d3/0d/33/d30d339ef6bfa4e9eed8c131f33dd17c.jpg'
          alt=''
        />
      </div>
      <div className='product-screen__title block-title'>
        3 мес. подписки на Яндекс.Плюс
      </div>
      <div className='product-screen__description'>
        Проведите незабываемые январские праздники: смотрите кинопремьеры на
        Кинопоиске и слушайте новогодние хиты на Яндекс.Музыке
      </div>
      <div className='product-screen__button'>
        <ShopButton
          title={'Добавить в корзину'}
          rewardCount={10}
          onClick={addBasket}
        />
        <div className='product-screen__footnote'>В наличии 12 шт.</div>
      </div>
    </div>
  )
}
