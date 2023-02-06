import { FC } from 'react'
import './tracker.scss'
import succesfully from '../../assets/image/tracker/successfully.svg'
import missed from '../../assets/image/tracker/missed.svg'

interface IWaterTargetItem {
  date: number
  value: string
}

export const HabitsTargetItem: FC<IWaterTargetItem> = ({ date, value }) => {
  return (
    <div className='habits-tracker-item'>
      {/* <img src={succesfully} alt="" style={{marginBottom:3}} width={34} height={34} /> */}
      <div className='habits-tracker-item__data'>
        {new Date(date*1000).getHours().toString().padStart(2, '0') + 
        ':' + 
        new Date(date*1000).getMinutes().toString().padStart(2, '0')}
        </div>
      <div className='habits-tracker-item__value'>{value}</div>
    </div>
  )
}
