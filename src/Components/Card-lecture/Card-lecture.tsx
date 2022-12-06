import { FC } from 'react'
import './card-lecture.scss'
import icon from '../../assets/image/icon_reward.svg'
import { NavLink } from 'react-router-dom'
import { LECTURE_ROUTE } from '../../provider/constants-route'

interface ICardLecture {
  img: string
  title: string
  date: string
  reward: number
  id: number
}

const CardLecture: FC<ICardLecture> = ({ id, date, img, reward, title }) => {
  return (
    <NavLink to={LECTURE_ROUTE + '/' + id} className={'card-lecture'}>
      <div className='card-lecture__image'>
        <img src={img} alt='image' />
      </div>
      <div className='card-lecture__info'>
        <div className='card-lecture__title'>{title}</div>
        <div className='card-lecture__date'>Выполнить до {date}</div>
        <div className='card-lecture__reward reward'>
          Награда:
          <img className='reward__icon' src={icon} alt='icon' />
          <span className='reward__count'>{reward}</span>
        </div>
      </div>
    </NavLink>
  )
}

export default CardLecture
