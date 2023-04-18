import './tracker.scss'

import { useAppSelector } from '../../hooks/redux-hooks'
import {
  isLoadingSelector,
  tracksSelector
} from '../../Redux/slice/trackerSlice'
import { Preloader } from '../Preloader/Preloader'
import HabitsTargetItem from './Habits-tracker-item'

export const WaterTarget = () => {
  const isLoading = useAppSelector(isLoadingSelector)
  const tracks = useAppSelector(tracksSelector)

  if (isLoading) {
    return <Preloader height='auto' />
  }

  return (
    <div className={'water-target'}>
      <div className='water-target__container'>
        {tracks.waterTrack.length ? (
          tracks.waterTrack.map((item, index) => (
            <HabitsTargetItem key={index} track={item} />
          ))
        ) : (
          <h1>Данных нет</h1>
        )}
      </div>
    </div>
  )
}
