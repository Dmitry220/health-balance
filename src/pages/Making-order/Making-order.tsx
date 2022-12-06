import './making-order.scss'
import Header from '../../Components/Header/Header'

export const MakingOrder = () => {
  return (
    <div className={'making-order'}>
      <Header title={'Оформление'} />
      <div className='making-order__title main-title'>Данные для доставки</div>
      <form className='making-order__form form-order'>
        <label htmlFor='email' className='form-order__label'>
          Эл. почта
        </label>
        <input type='text' className='form-order__field _field' />
        <label htmlFor='email' className='form-order__label'>
          Телефон
        </label>
        <input type='text' className='form-order__field _field' />
      </form>
      <button className='making-order__button _button-white'>Получить</button>
    </div>
  )
}
