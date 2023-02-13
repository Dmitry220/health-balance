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
import { sklonenie } from '../../utils/common-functions'

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
  const wake_up  = (tracks.waterTrack.length>2&&tracks.waterTrack[0].completed && tracks.waterTrack[1].completed)
  // const aaa = [
  //   {
  //     "id": 123,
  //     "type": 1,
  //     "additional": null,
  //     "notification_send": true,
  //     "send_time": 1675984500,
  //     "completed": true
  //   },
  //   {
  //     "id": 124,
  //     "type": 1,
  //     "additional": null,
  //     "notification_send": true,
  //     "send_time": 1676042100,
  //     "completed": true
  //   },
  //   {
  //     "id": 125,
  //     "type": 1,
  //     "additional": null,
  //     "notification_send": true,
  //     "send_time": 1675984500,
  //     "completed": true
  //   },
  //   {
  //     "id": 126,
  //     "type": 1,
  //     "additional": null,
  //     "notification_send": true,
  //     "send_time": 1676042100,
  //     "completed": false
  //   },
  //   {
  //     "id": 127,
  //     "type": 1,
  //     "additional": null,
  //     "notification_send": false,
  //     "send_time": 1675984500,
  //     "completed": false
  //   },
  //   {
  //     "id": 128,
  //     "type": 1,
  //     "additional": null,
  //     "notification_send": false,
  //     "send_time": 1676042100,
  //     "completed": false
  //   },
  //   {
  //     "id": 129,
  //     "type": 1,
  //     "additional": null,
  //     "notification_send": false,
  //     "send_time": 1675984500,
  //     "completed": false
  //   },
  //   {
  //     "id": 130,
  //     "type": 1,
  //     "additional": null,
  //     "notification_send": false,
  //     "send_time": 1676042100,
  //     "completed": false
  //   },
  //   {
  //     "id": 131,
  //     "type": 1,
  //     "additional": null,
  //     "notification_send": false,
  //     "send_time": 1675984500,
  //     "completed": false
  //   },
  //   {
  //     "id": 132,
  //     "type": 1,
  //     "additional": null,
  //     "notification_send": false,
  //     "send_time": 1676042100,
  //     "completed": false
  //   },
  //   {
  //     "id": 133,
  //     "type": 1,
  //     "additional": null,
  //     "notification_send": false,
  //     "send_time": 1675984500,
  //     "completed": false
  //   },
  //   {
  //     "id": 134,
  //     "type": 1,
  //     "additional": null,
  //     "notification_send": false,
  //     "send_time": 1676042100,
  //     "completed": false
  //   },
  //   {
  //     "id": 135,
  //     "type": 1,
  //     "additional": 'Вс',
  //     "notification_send": false,
  //     "send_time": 1675984500,
  //     "completed": false
  //   },
  //   {
  //     "id": 136,
  //     "type": 1,
  //     "additional": 'Вс',
  //     "notification_send": false,
  //     "send_time": 1676042100,
  //     "completed": false
  //   }
  // ]

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
            Вы спали <span> {wake_up ? sklonenie(8,['час','часа','часов']) : 'менее 8 часов'}</span>
          </div>
          <div className='healthy-sleep__border-dashed' />
          <div className='healthy-sleep__icon'>
            <img src={sun} alt='sun' />
            <div className='healthy-sleep__time'>{morning}</div>
          </div>
        </div>
        <div className='healthy-sleep__days'>
          {tracks.sleepTrack.length ? tracks.sleepTrack.map((item, index, array) => {
            if (index % 2 === 0) {              
              return <div className='healthy-sleep__item-day' key={item.id}>
                {(array[index + 1].completed && array[index].completed) ? (
                  <img
                    className='healthy-sleep__icon-full'
                    src={status_full}
                    alt='status_full'
                  />
                ) : (
                  <div className='healthy-sleep__circle' />
                )}
                <div className='healthy-sleep__day-text'>{item.additional}</div>
              </div>
            }
          }
          ) : <h1>Данных нет</h1>}
        </div>
      </div>
    </div>
  )
}
