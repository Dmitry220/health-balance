import { FC } from 'react'
import './tracker.scss'
import { HabitsTargetItem } from './Habits-tracker-item'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import { countWaterSelector, trackerSelector } from '../../Redux/slice/trackerSlice'
import { useEffect } from 'react'
import { useState } from 'react'

export const WaterTarget = () => {

  const tracker = useAppSelector(trackerSelector)
  const countWater = useAppSelector(countWaterSelector)
  let minutes = tracker.wake_up_time.split(':')[1].length === 2 ? tracker.wake_up_time.split(':')[1] : '0' + tracker.wake_up_time.split(':')[1]

  const [targets, setTargtes] = useState([
    {
      id: 1,
      value: '',
      date: ''
    },
    {
      id: 2,
      value: '',
      date: ''
    },
    {
      id: 3,
      value: '',
      date: ''
    },
    {
      id: 4,
      value: '',
      date: ''
    },
    {
      id: 5,
      value: '',
      date: ''
    },
    {
      id: 6,
      value: '',
      date: ''
    },
    {
      id: 7,
      value: '',
      date: ''
    },
    {
      id: 8,
      value: '',
      date: ''
    },
    {
      id: 9,
      value: '',
      date: ''
    },
    {
      id: 10,
      value: '',
      date: ''
    },
  ])

  useEffect(() => {
    setTargtes(prev => prev.map((item, i) => {
      return {
        ...item,
        date: Math.ceil(+tracker.wake_up_time.split(':')[0] + 1.6 * i) + ':' + minutes,
        value: countWater / 10 * 1000 + ' мл'
      }
    }))
  }, [tracker])

  return (
    <div className={'water-target'}>
      <div className='water-target__container'>
        {targets.map(item => <HabitsTargetItem key={item.id} value={item.value} date={item.date} />)}
      </div>
    </div>
  )
}
