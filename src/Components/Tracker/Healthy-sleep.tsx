import { FC, useCallback, useEffect, useState } from 'react'
import './tracker.scss'
import moon from '../../assets/image/tracker/akar-icons_moon-fill.png'
import sun from '../../assets/image/tracker/akar-icons_sun-fill.png'
import status_full from '../../assets/image/purpose__status_full_green.svg'
import { Link } from 'react-router-dom'
import { GOAL_SLEEP__ROUTE } from '../../provider/constants-route'
import TrackerService from '../../services/TrackerService'
import { ITrack } from '../../models/ITracker'
import {
  datesSleepSelector,
  isLoadingSelector,
  setDateSleep,
  trackerSelector,
  tracksSelector
} from '../../Redux/slice/trackerSlice'
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
  const indexWeek = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  const morning = tracker.wake_up_time
  const evening =
    (+hour - 8 < 0 ? 24 + (+hour - 8) : +hour - 8).toString().padStart(2, '0') +
    ':' +
    minutes
  const tracks = useAppSelector(tracksSelector)

  const sleepDays: ITrack[] = [
    {
      id: 1,
      type: 1,
      additional: 'пн',
      notification_send: false,
      send_time: 0,
      completed: false
    },
    {
      id: 2,
      type: 1,
      additional: 'пн',
      notification_send: false,
      send_time: 0,
      completed: false
    },
    {
      id: 3,
      type: 1,
      additional: 'вт',
      notification_send: false,
      send_time: 0,
      completed: false
    },
    {
      id: 4,
      type: 1,
      additional: 'вт',
      notification_send: false,
      send_time: 0,
      completed: false
    },
    {
      id: 5,
      type: 1,
      additional: 'ср',
      notification_send: false,
      send_time: 0,
      completed: false
    },
    {
      id: 6,
      type: 1,
      additional: 'ср',
      notification_send: false,
      send_time: 0,
      completed: false
    },
    {
      id: 7,
      type: 1,
      additional: 'чт',
      notification_send: false,
      send_time: 0,
      completed: false
    },
    {
      id: 8,
      type: 1,
      additional: 'чт',
      notification_send: false,
      send_time: 0,
      completed: false
    },
    {
      id: 9,
      type: 1,
      additional: 'пт',
      notification_send: false,
      send_time: 0,
      completed: false
    },
    {
      id: 10,
      type: 1,
      additional: 'пт',
      notification_send: false,
      send_time: 0,
      completed: false
    },
    {
      id: 11,
      type: 1,
      additional: 'сб',
      notification_send: false,
      send_time: 0,
      completed: false
    },
    {
      id: 12,
      type: 1,
      additional: 'сб',
      notification_send: false,
      send_time: 0,
      completed: false
    },
    {
      id: 13,
      type: 1,
      additional: 'вс',
      notification_send: false,
      send_time: 0,
      completed: false
    },
    {
      id: 14,
      type: 1,
      additional: 'вс',
      notification_send: false,
      send_time: 0,
      completed: false
    }
  ]
  
  const pushArray: ITrack[] = []
  const [outputArray, setOutputArray] = useState<ITrack[]>([])
  const sameDays =  tracks.sleepTrack.length>=2&&(tracks.sleepTrack[0].additional === tracks.sleepTrack[1].additional)  
  const wake_up  = sameDays ? (tracks.sleepTrack[0]?.completed && tracks.sleepTrack[1]?.completed) : tracks.sleepTrack[0]?.completed
  useEffect(() => {
    tracks.sleepTrack.forEach((itemServer, index) => {
      pushArray.push({
        ...itemServer,
        id: index + 1,
        additional: itemServer.additional,
        completed: itemServer.completed,
        notification_send: itemServer.notification_send,
        send_time: itemServer.send_time,
        type: itemServer.type
      })
    })
    

    let difference = sleepDays.length - tracks.sleepTrack.length

    for (let i = difference - 1; i >= 0; i--) {
      if (i === difference - 1 && i % 2 === 0) {
        pushArray.unshift({
          id: outputArray.length - i,
          additional: sleepDays[i].additional,
          completed: true,
          notification_send: true,
          send_time: 0,
          type: 1
        })
      } else {
        pushArray.unshift({
          id: outputArray.length - i,
          additional: sleepDays[i].additional,
          completed: sleepDays[i].completed,
          notification_send: sleepDays[i].notification_send,
          send_time: sleepDays[i].send_time,
          type: sleepDays[i].type
        })
      }
    }
    setOutputArray(pushArray)
  }, [tracks])

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
            Вы спали{' '}
            <span>
              {' '}
              {wake_up
                ? '8 ' + sklonenie(8, ['час', 'часа', 'часов'])
                : 'менее 8 часов'}
            </span>
          </div>
          <div className='healthy-sleep__border-dashed' />
          <div className='healthy-sleep__icon'>
            <img src={sun} alt='sun' />
            <div className='healthy-sleep__time'>{morning}</div>
          </div>
        </div>
        <div className='healthy-sleep__days'>
          {tracks.sleepTrack.length ? (
            outputArray.map((item, index, array) => {
              if (index % 2 === 0) {
                return (
                  <div className='healthy-sleep__item-day' key={item.id}>
                    {array[index + 1].completed && array[index].completed ? (
                      <img
                        className='healthy-sleep__icon-full'
                        src={status_full}
                        alt='status_full'
                      />
                    ) : (
                      <div className='healthy-sleep__circle' />
                    )}
                    <div className='healthy-sleep__day-text'>
                      {item.additional}
                    </div>
                  </div>
                )
              }
            })
          ) : (
            <h1>Данных нет</h1>
          )}
        </div>
      </div>
    </div>
  )
}
