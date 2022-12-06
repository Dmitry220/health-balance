import { FC } from 'react'
import './tracker.scss'
import { HabitsTargetItem } from './Habits-tracker-item'

export const WaterTarget = () => {
  return (
    <div className={'water-target'}>
      <div className='water-target__container'>
        <HabitsTargetItem value={'200 мл'} data={'7:30'} />
        <HabitsTargetItem value={'200 мл'} data={'8:30'} />
        <HabitsTargetItem value={'200 мл'} data={'9:30'} />
        <HabitsTargetItem value={'200 мл'} data={'10:30'} />
        <HabitsTargetItem value={'200 мл'} data={'11:30'} />
        <HabitsTargetItem value={'200 мл'} data={'12:30'} />
        <HabitsTargetItem value={'200 мл'} data={'13:30'} />
        <HabitsTargetItem value={'200 мл'} data={'14:30'} />
        <HabitsTargetItem value={'200 мл'} data={'15:30'} />
        <HabitsTargetItem value={'200 мл'} data={'16:30'} />
      </div>
    </div>
  )
}
