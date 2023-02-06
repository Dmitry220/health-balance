import { FC, useCallback, useEffect, useState } from 'react'
import './tracker.scss'
import moon from '../../assets/image/tracker/akar-icons_moon-fill.png'
import sun from '../../assets/image/tracker/akar-icons_sun-fill.png'
import status_full from '../../assets/image/purpose__status_full_green.svg'
import { Link } from 'react-router-dom'
import { GOAL_SLEEP__ROUTE } from '../../provider/constants-route'
import TrackerService from '../../services/TrackerService'
import { ITrack } from '../../models/ITracker'
import { datesSleepSelector, isLoadingSelector, setDateSleep, trackerSelector, tracksSelector } from '../../Redux/slice/trackerSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { Preloader } from '../Preloader/Preloader'

interface IHealthySleep {
  editProhibition?: boolean
}
export const HealthySleep: FC<IHealthySleep> = ({ editProhibition }) => {

  const dispacth = useAppDispatch()
  const tracker = useAppSelector(trackerSelector)
  const isloading = useAppSelector(isLoadingSelector)
  let hour = tracker.wake_up_time.split(':')[0]
  let minutes = tracker.wake_up_time.split(':')[1]
  const morning = tracker.wake_up_time
  const evening = (+hour - 8 < 0 ? 24 + (+hour - 8) : +hour - 8).toString().padStart(2, '0') + ':' + minutes
  const tracks = useAppSelector(tracksSelector)

  if (isloading) {
    return <Preloader height='auto' />
  }

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
            <div className='healthy-sleep__time'>{evening}</div>
          </div>
          <div className='healthy-sleep__border-dashed' />
          <div className='healthy-sleep__text'>
            Вы спали <span> 8 часов</span>
          </div>
          <div className='healthy-sleep__border-dashed' />
          <div className='healthy-sleep__icon'>
            <img src={sun} alt='sun' />
            <div className='healthy-sleep__time'>{morning}</div>
          </div>
        </div>
        <div className='healthy-sleep__days'>
          {tracks.sleepTrack.map((item) => (
            <div className='healthy-sleep__item-day' key={item.id}>
              {!item.completed ? (
                <div className='healthy-sleep__circle' />
              ) : (
                <img
                  className='healthy-sleep__icon-full'
                  src={status_full}
                  alt='status_full'
                />
              )}
              <div className='healthy-sleep__day-text'>{item.additional}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
