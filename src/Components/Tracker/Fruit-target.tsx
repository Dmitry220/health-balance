import './tracker.scss'
import { HabitsTargetItem } from './Habits-tracker-item'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import { tracksSelector } from '../../Redux/slice/trackerSlice'

export const FruitTarget = () => {

  const tracks = useAppSelector(tracksSelector)

  return (
    <div className={'fruit-target'}>
      <div className='fruit-target__container'>
        {tracks.fruitTrack.map((item) => (
          <HabitsTargetItem
            key={item.id}
            track={item}         
          />
        ))}
      </div>
    </div>
  )
}
