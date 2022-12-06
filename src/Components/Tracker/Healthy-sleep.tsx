import { FC } from 'react'
import './tracker.scss'
import moon from '../../assets/image/tracker/akar-icons_moon-fill.png'
import sun from '../../assets/image/tracker/akar-icons_sun-fill.png'
import status_full from '../../assets/image/purpose__status_full_green.svg'
import { Link } from 'react-router-dom'
import { GOAL_SLEEP__ROUTE } from '../../provider/constants-route'

interface IHealthySleep {
  editProhibition?: boolean
}
export const HealthySleep: FC<IHealthySleep> = ({ editProhibition }) => {
  const weekDay = [
    {
      id: 1,
      day: 'Пн',
      completed: false
    },
    {
      id: 2,
      day: 'Вт',
      completed: false
    },
    {
      id: 3,
      day: 'Ср',
      completed: true
    },
    {
      id: 4,
      day: 'Чт',
      completed: true
    },
    {
      id: 5,
      day: 'Пт',
      completed: false
    },
    {
      id: 6,
      day: 'Сб',
      completed: false
    },
    {
      id: 7,
      day: 'Вс',
      completed: true
    }
  ]

  return (
    <div className={'healthy-sleep'}>
      <div className='healthy-sleep__head'>
        <div className='healthy-sleep__title title-17'>Здоровый сон</div>
        {!editProhibition && (
          <Link
            to={GOAL_SLEEP__ROUTE}
            className='healthy-sleep__link text-blue'
          >
            изменить цель
          </Link>
        )}
      </div>
      <div className='healthy-sleep__body'>
        <div className='healthy-sleep__row'>
          <div className='healthy-sleep__icon'>
            <img src={moon} alt='moon' />
            <div className='healthy-sleep__time'>22:12</div>
          </div>
          <div className='healthy-sleep__border-dashed' />
          <div className='healthy-sleep__text'>
            Вы спали <span> 8 часов</span>
          </div>
          <div className='healthy-sleep__border-dashed' />
          <div className='healthy-sleep__icon'>
            <img src={sun} alt='sun' />
            <div className='healthy-sleep__time'>06:30</div>
          </div>
        </div>
        <div className='healthy-sleep__days'>
          {weekDay.map((item) => (
            <div className='healthy-sleep__item-day' key={item.id}>
              {!item.completed ? (
                <div className='healthy-sleep__circle' />
              ) : (
                <img
                  className='healthy-sleep__icon-full'
                  src={status_full}
                  alt=''
                />
              )}
              <div className='healthy-sleep__day-text'>{item.day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
