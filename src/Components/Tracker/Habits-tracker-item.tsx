import { useState, memo } from 'react'
import './tracker.scss'
import succesfully from '../../assets/image/tracker/successfully.svg'
import missed from '../../assets/image/tracker/missed.svg'
import { ITrack, ITrackAdditional } from '../../models/ITracker'
import React from 'react'

interface IWaterTargetItem {
  track: ITrack
}

const HabitsTargetItem = memo<IWaterTargetItem>(({ track }) => {

  let additional = isJsonString(track.additional)

  function isJsonString(str: string): string {
    try {
      const jsonParse: ITrackAdditional = JSON.parse(str)      
      if (track.type === 3) {
        return jsonParse?.unit;
      }
      if (track.type === 2) {
         return jsonParse.amount + ' ' + jsonParse?.unit
      }
      return str;
    } catch (e) {     
      return str;
    }
  }

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
         {new Date(track.send_time*1000)
            .getHours()
            .toString()
            .padStart(2, '0') +
            ':' +
            new Date(track.send_time * 1000)
              .getMinutes()
              .toString()
              .padStart(2, '0')}
          {/* {track.additional} */}
        </div>
      )}
      {!track.notification_send && !track.completed && (
        <div className={'habits-tracker-item__value'}>{additional}</div>
      )}
      {track.notification_send && track.completed && (
        <div
          className={
            'habits-tracker-item__value habits-tracker-item__value_green'
          }
        >
          {additional}
        </div>
      )}
      {track.notification_send && !track.completed && (
        <div
          className={
            'habits-tracker-item__value habits-tracker-item__value_yellow'
          }
        >
          {additional}
        </div>
      )}
    </div>
  )
})

export default HabitsTargetItem



