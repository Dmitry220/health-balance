import { FC, useEffect, useState } from 'react'
import './tracker.scss'
import moon from '../../assets/image/tracker/akar-icons_moon-fill.png'
import sun from '../../assets/image/tracker/akar-icons_sun-fill.png'
import status_full from '../../assets/image/purpose__status_full_green.svg'
import { useNavigate } from 'react-router-dom'
import { GOAL_SLEEP__ROUTE } from '../../provider/constants-route'
import { ITrack } from '../../models/ITracker'
import {
  isLoadingSelector,
  trackerSelector,
  tracksSelector
} from '../../Redux/slice/trackerSlice'
import { useAppSelector } from '../../hooks/redux-hooks'
import { Preloader } from '../Preloader/Preloader'
import { sklonenie } from '../../utils/common-functions'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

interface IHealthySleep {
  editProhibition?: boolean,
  date?: string
}
export const HealthySleep: FC<IHealthySleep> = ({ editProhibition,date=new Date().toLocaleDateString() }) => {

  const tracker = useAppSelector(trackerSelector)
  const tracks = useAppSelector(tracksSelector)
  const isloading = useAppSelector(isLoadingSelector)
  let hour = tracker.wake_up_time.split(':')[0]
  let minutes = tracker.wake_up_time.split(':')[1]
  const indexWeek = new Date(date.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3")).getDay() === 0 ? 6 : new Date(date.replace( /(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3")).getDay() - 1
  const daysAdditional = ['пн', 'пн', 'вт', 'вт', 'ср', 'ср', 'чт', 'чт', 'пт', 'пт', 'сб', 'сб', 'вс', 'вс']
  const daysWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
  const [currentDay, setCurrentDay] = useState<ITrack>()
  const morning = tracker.wake_up_time
  const evening =(+hour - 8 < 0 ? 24 + (+hour - 8) : +hour - 8).toString().padStart(2, '0') +':' +minutes
  const pushArray: ITrack[] = []
  const [outputArray, setOutputArray] = useState<ITrack[]>([])
  const navigate = useNavigate()

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

    let difference = daysAdditional.length - tracks.sleepTrack.length

    for (let i = difference - 1; i >= 0; i--) {  
        pushArray.unshift({
          id: outputArray.length - i,
          type: i === difference - 1 ? (tracks.sleepTrack[0]?.type === 4 ? 1 : 4) : (i%2 === 0 ? 4:1),
          additional: daysAdditional[i],
          completed: i === difference - 1 && i % 2 === 0,
          notification_send: i === difference - 1 && i % 2 === 0,
          send_time: 0         
        })      
    }
    setOutputArray(pushArray)
    setCurrentDay(tracks.sleepTrack.find(item => item.additional === daysWeek[indexWeek] && item.type === 1))
  }, [tracks])

  const redirectToChangeTrack = () => {
    confirmAlert({
      title: 'Вы уверены что хотите изменить цель?  Будет создан новый трекер и старые выполненные цели будут аннулированы!',
      buttons: [
        {
          label: 'Да',
          onClick: () => navigate(GOAL_SLEEP__ROUTE)
        },
        {
          label: 'Нет',
        }
      ]
    });
  }

  if (isloading) {
    return <Preloader height='auto' />
  }


  return (
    <div className={'healthy-sleep'}>
      <div className='healthy-sleep__head'>
        <div className='healthy-sleep__title title-17'>Здоровый сон</div>
        {!editProhibition && (
          <div
            className='healthy-sleep__link text-blue'
            onClick={redirectToChangeTrack}
          >
            изменить цель
          </div>
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
            <span style={{color: (currentDay?.sleep_time! >= 8)?'#00A62E':'#F4C119'}}>
              {' '}
              {(currentDay?.sleep_time! >= 8)
                ? currentDay?.sleep_time + sklonenie(currentDay?.sleep_time!, [' час', ' часа', ' часов'])
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
              if (item.type === 1) {
                return (
                  <div className='healthy-sleep__item-day' key={item.id}>
                    {array[index]?.sleep_time! >= 8 ? (
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