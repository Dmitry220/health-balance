import { FC } from 'react'
import './tracker.scss'
import { HabitsTargetItem } from './Habits-tracker-item'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { countWaterSelector, isChangeTrackSelector, isLoadingSelector, setChangeTrack, trackerSelector } from '../../Redux/slice/trackerSlice'
import { useEffect } from 'react'
import { useState } from 'react'
import TrackerService from '../../services/TrackerService'
import { ITrack } from '../../models/ITracker'
import { Preloader } from '../Preloader/Preloader'

export const WaterTarget = () => {

  const dispatch = useAppDispatch()

  const tracker = useAppSelector(trackerSelector)
  const isChangeTrack = useAppSelector(isChangeTrackSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const countWater = useAppSelector(countWaterSelector)
  let minutes = tracker.wake_up_time.split(':')[1].length === 2 ? tracker.wake_up_time.split(':')[1] : '0' + tracker.wake_up_time.split(':')[1]

  const [targets, setTargtes] = useState<ITrack[]>()

  const installPush = async () => {
    for (let i = 0; i < 10; i++) {
      await TrackerService.installPushTracker(2,
        Math.ceil(+tracker.wake_up_time.split(':')[0] + 1.6 * i) + ':' + minutes,
        new Date().setHours(Math.ceil(+tracker.wake_up_time.split(':')[0] + 1.6 * i), 0, 0, 0) / 1000, ''
      )
    }
  }

  const createTrack = async () => {
    for (let i = 0; i < 10; i++) {
      await TrackerService.createTrack(2,
        Math.ceil(+tracker.wake_up_time.split(':')[0] + 1.6 * i) + ':' + minutes, ''
      )
      dispatch(setChangeTrack(false))
    }
  }
console.log(targets);

  useEffect(() => {
    (async () => {
      // if(tracker.id){
      //   const response = await TrackerService.complteteTrack(tracker.id)
      //   console.log(response);
      // }       
      if (isChangeTrack && tracker.id) {           
        await createTrack()
        await installPush()
      }
      const response = await TrackerService.getTracks(new Date().toLocaleDateString())
      setTargtes(response.data.data.filter(item=>item.type === 2))
    })()
  }, [tracker])

  if(isLoading){
    return <Preloader height='auto'/>
  }

  return (
    <div className={'water-target'}>
      <div className='water-target__container'>
        {targets?.map(item => <HabitsTargetItem key={item.id} value={Math.ceil(countWater / 10 * 1000) + ' мл'} date={item.time} />)}
      </div>
    </div>
  )
}
