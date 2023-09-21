import {useParams} from 'react-router-dom'
import './product-screen.scss'
import Header from '../../Components/Header/Header'
import {ShopHead} from '../../Components/Shop/Shop-head'
import {ShopButton} from '../../Components/Shop/Shop-button'
import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {
    addBasket,
    basketSelector,
    getProductById,
    isLoadingSelector,
    productByIdSelector,
} from '../../Redux/slice/shopSlice'
import plug from '../../assets/image/plug.png'
import {IMAGE_URL} from '../../http'
import {Preloader} from '../../Components/Preloader/Preloader'
import {IShopProduct} from "../../models/IShop";

export const ProductScreen = () => {
    const params = useParams()
    const dispatch = useAppDispatch()
    const product = useAppSelector(productByIdSelector)
    const isLoading = useAppSelector(isLoadingSelector)
    const basket = useAppSelector(basketSelector)

    const addProductToBasket = async (product: IShopProduct) => dispatch(addBasket(product))

    useEffect(() => {
        dispatch(getProductById(Number(params.id)))
    }, [])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className={'product-screen'}>
            <Header title={'Награда'}/>
            <ShopHead marginBottom={42}/>
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
                            addProductToBasket(product)
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
