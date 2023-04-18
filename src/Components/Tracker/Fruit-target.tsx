import './tracker.scss'

import { useAppSelector } from '../../hooks/redux-hooks'
import { tracksSelector,isLoadingSelector } from '../../Redux/slice/trackerSlice'
import { Preloader } from '../Preloader/Preloader'
import HabitsTargetItem from './Habits-tracker-item'


export const FruitTarget = () => {

  const tracks = useAppSelector(tracksSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  

  if (isLoading) {
    return <Preloader height='auto' />
  }

  return (
    <div className={'fruit-target'}>
      <div className='fruit-target__container'>
        {tracks.fruitTrack.length ? tracks.fruitTrack.map((item,index) => (
          <HabitsTargetItem
            key={index}
            track={item}         
          />
        )) : <h1>Данных нет</h1>}
      </div>
    </div>
  )
}
