import { FC } from 'react'
import './tracker.scss'
import succesfully from '../../assets/image/tracker/successfully.svg'
import missed from '../../assets/image/tracker/missed.svg'
import { ITrack } from '../../models/ITracker'

interface IWaterTargetItem {
  track: ITrack
}

export const HabitsTargetItem: FC<IWaterTargetItem> = ({ track }) => {
  const timeZone = -new Date().getTimezoneOffset() / 60
  const send_time = -new Date().getTimezoneOffset() / 60 >= 3 ? (track.send_time-((timeZone -3)*3600)) : (track.send_time+((Math.abs(timeZone) -3)*3600))

 // new Date((track.send_time-((-new Date().getTimezoneOffset() / 60 - 3)*3600))*1000)
  
  return (
    <div className='habits-tracker-item'>
      {track.notification_send && track.completed && (
        <img
          src={succesfully}
          alt='succesfully'
          style={{ marginBottom: 3 }}
          width={34}
          height={34}
        />
      )}
      {track.notification_send && !track.completed && (
        <img
          src={missed}
          alt='missed'
          style={{ marginBottom: 3 }}
          width={34}
          height={34}
        />
      )}
      {!track.notification_send && !track.completed && (
        <div className='habits-tracker-item__data'>
          {new Date(send_time*1000)
            .getHours()
            .toString()
            .padStart(2, '0') +
            ':' +
            new Date(track.send_time * 1000)
              .getMinutes()
              .toString()
              .padStart(2, '0')}
        </div>
      )}
      {!track.notification_send && !track.completed && (
        <div className={'habits-tracker-item__value'}>{track.additional}</div>
      )}
      {track.notification_send && track.completed && (
        <div
          className={
            'habits-tracker-item__value habits-tracker-item__value_green'
          }
        >
          {track.additional}
        </div>
      )}
      {track.notification_send && !track.completed && (
        <div
          className={
            'habits-tracker-item__value habits-tracker-item__value_yellow'
          }
        >
          {track.additional}
        </div>
      )}
    </div>
  )
}
