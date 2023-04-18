import { FC } from 'react'
import './tracker.scss'
import succesfully from '../../assets/image/tracker/successfully.svg'
import missed from '../../assets/image/tracker/missed.svg'
import { ITrack, ITrackAdditional } from '../../models/ITracker'

interface IWaterTargetItem {
  track: ITrack
}

export const HabitsTargetItem: FC<IWaterTargetItem> = ({ track }) => {
  
 const additional:ITrackAdditional = JSON.parse(track.additional)

 const valueTrack = track.type === 3 ? additional.unit : additional.amount + ' ' + additional.unit
 
 
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
          {additional.time}
        </div>
      )}
      {!track.notification_send && !track.completed && (
        <div className={'habits-tracker-item__value'}>{valueTrack}</div>
      )}
      {track.notification_send && track.completed && (
        <div
          className={
            'habits-tracker-item__value habits-tracker-item__value_green'
          }
        >
          {valueTrack}
        </div>
      )}
      {track.notification_send && !track.completed && (
        <div
          className={
            'habits-tracker-item__value habits-tracker-item__value_yellow'
          }
        >
          {valueTrack}
        </div>
      )}
    </div>
  )
}
