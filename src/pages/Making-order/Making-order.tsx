import './making-order.scss'
import Header from '../../Components/Header/Header'
import { useEffect, useState } from 'react'
import { ModalStatus } from '../../Components/Modals/Modal-status'
import { SHOP_ROUTE } from '../../provider/constants-route'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { basketSelector, clearBasket } from '../../Redux/slice/shopSlice'
import ShopService from '../../services/ShopService'
import { showToast } from '../../utils/common-functions'


export const MakingOrder = () => {

  const [showModal, setShowModal] = useState<boolean>(false)
  const basket = useAppSelector(basketSelector)
  const dispatch = useAppDispatch()


  const sendOrder = async () => {
    try {
      console.log( basket.map(item=>item.id));
      const response = await ShopService.sendOrder(basket.map(item=>item.id))
      console.log(response);  
      dispatch(clearBasket())    
      setShowModal(true)
    } catch (error) {
      setShowModal(false)
      await showToast('Произошла ошибка!')
    }    
  }
 

  if(showModal){
    return <ModalStatus route={SHOP_ROUTE} 
    subTitle={'Ожидайте письмо на email,проверьте папку “Спам” '} 
    textButton={'Ок! Перейти в магазин'} />
  }


  return (
    <div className={'making-order'}>
      <Header title={'Оформление'} />
      <div className='making-order__title main-title'>Данные для доставки: почта и телефон, будут браться из вашего профиля</div>
      {/* <form className='making-order__form form-order'>
        <label htmlFor='email' className='form-order__label'>
          Эл. почта
        </label>
        <input type='text' className='form-order__field _field' />
        <label htmlFor='email' className='form-order__label'>
          Телефон
        </label>
        <input type='text' className='form-order__field _field' />
      </form> */}
      <button className='making-order__button _button-white' onClick={sendOrder}>Получить</button>
    </div>
  )
}
