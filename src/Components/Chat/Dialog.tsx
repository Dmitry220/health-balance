import { Link } from 'react-router-dom'
import { DIALOG__ROUTE } from '../../provider/constants-route'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import './chat.scss'

export const Dialog = () => {
  const id = Number(localStorage.getItem('id'))

  const dataUser = useAppSelector(dataUserSelector)

  return (
    <Link to={DIALOG__ROUTE + '/' + 1} className='dialog'>
      <div className='dialog__row'>
        <div className='dialog__column'>
          <div className='dialog__img'>
            <img
              src='https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1'
              alt=''
            />
          </div>
          <div className='dialog__body'>
            <div className='dialog__title'>Чат с поддержкой</div>
            <div className='dialog__author'>
              Вы: <span>Сделайте так...</span>
            </div>
          </div>
        </div>
        <div className='dialog__column'>
          <div className='dialog__date'>2 месяца назад</div>
        </div>
      </div>
    </Link>
  )
}
