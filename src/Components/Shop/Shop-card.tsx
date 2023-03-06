import { FC, useEffect } from 'react'
import icon_reward from '../../assets/image/icon_reward.svg'
import {
  basketSelector,
  getProductsCategory,
  setBasket,
  shopProductsSelector,
  deleteBasket,
  isLoadingSelector
} from '../../Redux/slice/shopSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import './shop.scss'
import plug from '../../assets/image/plug.png'
import plus from '../../assets/image/plus.svg'
import { IMAGE_URL } from '../../http'
import { Link } from 'react-router-dom'
import { PRODUCT_SCREEN_ROUTE } from '../../provider/constants-route'
import { showToast } from '../../utils/common-functions'
import { Preloader } from '../Preloader/Preloader'

interface IShopCards {
  idCategory: number
}

export const ShopCards: FC<IShopCards> = ({ idCategory }) => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(shopProductsSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const basket = useAppSelector(basketSelector)
  const addBasket = (
    id: number,
    image: string,
    price: number,
    title: string
  ) => {
    const isExistProduct = basket.find((item) => item.id === id)
    if (isExistProduct) {
      dispatch(deleteBasket({ id, image, price, title }))
      showToast('Товар удален из корзины!')
    } else {
      dispatch(setBasket({ id, image, price, title }))
      showToast('Товар добавлен в корзину!')
    }
  }

  useEffect(() => {
    dispatch(getProductsCategory(idCategory))
  }, [])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={'shop-cards'}>
      {products.map((product) => (
        <div className={'shop-card'} key={product.id}>
          <div className={'shop-card__container'}>
            <Link
              to={PRODUCT_SCREEN_ROUTE + '/' + product.id}
              className='shop-card__img'
            >
              <img
                src={product.image ? IMAGE_URL + 'shop/' + product.image : plug}
                alt='product'
              />
            </Link>

            <div className='shop-card__row'>
              <Link
                to={PRODUCT_SCREEN_ROUTE + '/' + product.id}
                className='shop-card__title'
              >
                {product.title}
              </Link>
              <div className='shop-card__footer'>
                <div className='shop-card__footer-column'>
                  <img
                    src={icon_reward}
                    alt='reward'
                    className='shop-card__icon-reward'
                  />
                  <div className='shop-card__count-reward'>{product.price}</div>
                </div>
                <div className='shop-card__footer-column'>
                  <div className='shop-card__count-product'>
                    {product.quantity} шт.
                  </div>
                  <div className='shop-card__icon-add'>
                    <img
                      alt={'product'}
                      src={plus}
                      style={{
                        transform: basket.find((item) => item.id === product.id)
                          ? 'rotate(45deg)'
                          : 'rotate(0deg)'
                      }}
                      onClick={() =>
                        addBasket(
                          product.id,
                          product.image,
                          product.price,
                          product.title
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
