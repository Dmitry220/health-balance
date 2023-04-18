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

  function isJsonString(str: string): string | string[] {
    try {
      const jsonParse: ITrackAdditional = JSON.parse(str)      
      if (track.type === 3) {
        return [jsonParse?.unit,jsonParse.time];
      }
      if (track.type === 2) {
         return [jsonParse.amount + ' ' + jsonParse?.unit,jsonParse.time];
      }
      return [str];
    } catch (e) {     
      return [str];
    }
  }

  console.log(additional);
  

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
          {additional[1]}
        </div>
      )}
      {!track.notification_send && !track.completed && (
        <div className={'habits-tracker-item__value'}>{additional[0]}</div>
      )}
      {track.notification_send && track.completed && (
        <div
          className={
            'habits-tracker-item__value habits-tracker-item__value_green'
          }
        >
          {additional[0]}
        </div>
      )}
      {track.notification_send && !track.completed && (
        <div
          className={
            'habits-tracker-item__value habits-tracker-item__value_yellow'
          }
        >
          {additional[0]}
        </div>
      )}
    </div>
  )
})

export default HabitsTargetItem



