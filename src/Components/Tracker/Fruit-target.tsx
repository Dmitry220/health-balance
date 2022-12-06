import './tracker.scss'
import { HabitsTargetItem } from './Habits-tracker-item'

export const FruitTarget = () => {
  return (
    <div className={'fruit-target'}>
      <div className='fruit-target__container'>
        <HabitsTargetItem data={'12:30'} value={'Фрукт'} />
        <HabitsTargetItem data={'15:00'} value={'Фрукт'} />
        <HabitsTargetItem data={'19:00'} value={'Фрукт'} />
        <HabitsTargetItem data={'19:30'} value={'Фрукт'} />
        <HabitsTargetItem data={'21:30'} value={'Фрукт'} />
      </div>
    </div>
  )
}
