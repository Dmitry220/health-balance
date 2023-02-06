import { FC } from 'react'
import './tracker.scss'
import { HabitsTargetItem } from './Habits-tracker-item'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { isLoadingSelector, tracksSelector } from '../../Redux/slice/trackerSlice'
import { Preloader } from '../Preloader/Preloader'

export const WaterTarget = () => {

  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(isLoadingSelector)
  const tracks = useAppSelector(tracksSelector)


  if(isLoading){
    return <Preloader height='auto'/>
  }

  return (
    <div className={'water-target'}>
      <div className='water-target__container'>
        {tracks.waterTrack.map(item => <HabitsTargetItem key={item.id} value={item.additional} date={item.send_time} />)}
      </div>
    </div>
  )
}
