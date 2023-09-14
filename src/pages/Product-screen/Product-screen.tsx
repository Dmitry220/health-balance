import {useParams} from 'react-router-dom'
import './product-screen.scss'
import Header from '../../Components/Header/Header'
import {ShopHead} from '../../Components/Shop/Shop-head'
import {ShopButton} from '../../Components/Shop/Shop-button'
import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {
    basketSelector,
    deleteBasket,
    getProductById,
    isLoadingSelector,
    productByIdSelector,
    setBasket
} from '../../Redux/slice/shopSlice'
import plug from '../../assets/image/plug.png'
import {IMAGE_URL} from '../../http'
import {showToast} from '../../utils/common-functions'
import {Preloader} from '../../Components/Preloader/Preloader'

export const ProductScreen = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const product = useAppSelector(productByIdSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const basket = useAppSelector(basketSelector)

  const addBasket = async (
    id: number,
    image: string,
    price: number,
    title: string
  ) => {
    const isExistProduct = basket.find((item) => item.id === id)
    if (isExistProduct) {
      dispatch(deleteBasket({ id, image, price, title }))
      await showToast('Товар удален из корзины!')
    } else {
      dispatch(setBasket({ id, image, price, title }))
      await showToast('Товар добавлен в корзину!')
    }
  }

  useEffect(() => {
    dispatch(getProductById(Number(params.id)))
  }, [])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={'product-screen'}>
      <Header title={'Награда'} />
      <ShopHead marginBottom={42} />
      <div className='product-screen__image'>
        <img
          src={product?.image ? IMAGE_URL + 'shop/' + product.image : plug}
          alt=''
        />
      </div>
      <div className='product-screen__title block-title'>{product?.title}</div>
      <div className='product-screen__description'>{product?.description}</div>
      <div className='product-screen__button'>
        {product && (
          <ShopButton
            title={
              basket.find((item) => item.id === product.id)
                ? 'Убрать из корзины'
                : 'Добавить в корзину'
            }
            rewardCount={product?.price || 0}
            onClick={() =>
              addBasket(
                product?.id,
                product?.image,
                product?.price,
                product?.title
              )
            }
          />
        )}
        <div className='product-screen__footnote'>
          В наличии {product?.quantity} шт.
        </div>
      </div>
    </div>
  )
}
