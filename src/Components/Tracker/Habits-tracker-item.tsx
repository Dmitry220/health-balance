import { FC } from 'react'
import './tracker.scss'

interface IWaterTargetItem {
  date: string
  value: string
}

export const HabitsTargetItem: FC<IWaterTargetItem> = ({ date, value }) => {
  return (
    <div className='habits-tracker-item'>
      <div className='habits-tracker-item__data'>{date}</div>
      <div className='habits-tracker-item__value'>{value}</div>
    </div>
  )
}
