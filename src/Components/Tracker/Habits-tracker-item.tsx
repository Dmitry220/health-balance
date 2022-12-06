import { FC } from 'react'
import './tracker.scss'

interface IWaterTargetItem {
  data: string
  value: string
}

export const HabitsTargetItem: FC<IWaterTargetItem> = ({ data, value }) => {
  return (
    <div className='habits-tracker-item'>
      <div className='habits-tracker-item__data'>{data}</div>
      <div className='habits-tracker-item__value'>{value}</div>
    </div>
  )
}
