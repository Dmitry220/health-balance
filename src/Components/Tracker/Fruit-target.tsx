import { useEffect, useState } from 'react'

import './tracker.scss'

import { HabitsTargetItem } from './Habits-tracker-item'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import { trackerSelector } from '../../Redux/slice/trackerSlice'
import TrackerService from '../../services/TrackerService'
import { ITrack } from '../../models/ITracker'

export const FruitTarget = () => {
  const tracker = useAppSelector(trackerSelector)
  const [targetsFruit, setTargtesFruits] = useState<ITrack[]>([])

  const installPush = async () => {
    for (let i = 0; i < tracker.fruits; i++) {
      let time = i < tracker.fruits / 3
      ? '12:30'
      : i < tracker.fruits * (2 / 3)
      ? '15:30'
      : '19:00'
      await TrackerService.installPushTracker(3,
        time,
        new Date().setHours(Math.ceil(+time.split(':')[0]), Math.ceil(+time.split(':')[1]), 0, 0) / 1000, 
        'Фрукт'
      )     
    }
  }

  useEffect(() => {
    (async () => {
      const response = await TrackerService.getTracks(new Date().toLocaleDateString())
      if(!response.data.data.find(item=>item.type === 3) && tracker.id){     
        //await installPush()
      }else{
        const response = await TrackerService.getTracks(new Date().toLocaleDateString())
        setTargtesFruits(response.data.data.filter(item=>item.type === 3))
      }  
    })()
  }, [tracker])

  return (
    <div className={'fruit-target'}>
      <div className='fruit-target__container'>
        {targetsFruit.map((item) => (
          <HabitsTargetItem
            key={item.id}
            value={item.additional}
            date={item.time}
          />
        ))}
      </div>
    </div>
  )
}
