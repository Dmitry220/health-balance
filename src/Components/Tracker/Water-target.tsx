import './tracker.scss'
import { HabitsTargetItem } from './Habits-tracker-item'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import { isLoadingSelector, tracksSelector } from '../../Redux/slice/trackerSlice'
import { Preloader } from '../Preloader/Preloader'

export const WaterTarget = () => {

  const isLoading = useAppSelector(isLoadingSelector)
  const tracks = useAppSelector(tracksSelector)

  if(isLoading){
    return <Preloader height='auto'/>
  }

  return (
    <div className={'water-target'}>
      <div className='water-target__container'>
        {tracks.waterTrack.length ? tracks.waterTrack.map(item => <HabitsTargetItem key={item.id} track={item} />) : <h1>Данных нет</h1> }
      </div>
    </div>
  )
}
