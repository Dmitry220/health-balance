import { useEffect, useState } from 'react'

import './tracker.scss'

import { HabitsTargetItem } from './Habits-tracker-item'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import { trackerSelector } from '../../Redux/slice/trackerSlice'

export const FruitTarget = () => {
  const tracker = useAppSelector(trackerSelector)
  const [targetsFruit, setTargtesFruits] = useState<
    {
      id: number
      fruits: 'Фрукт'
      date: string
    }[]
  >([])

  useEffect(() => {
    setTargtesFruits([])
    if (tracker.fruits != 0) {
      for (let index = 0; index < tracker.fruits; index++) {
        setTargtesFruits((prev) => [
          ...prev,
          {
            id: index + 1,
            fruits: 'Фрукт',
            date:
              index < tracker.fruits / 3
                ? '12:30'
                : index < tracker.fruits * (2 / 3)
                ? '15:30'
                : '19:00'
          }
        ])
      }
    }
  }, [tracker])

  return (
    <div className={'fruit-target'}>
      <div className='fruit-target__container'>
        {/* {targetsFruit.map((item) => (
          <HabitsTargetItem
            key={item.id}
            value={item.fruits}
            date={item.date}
          />
        ))} */}
      </div>
    </div>
  )
}
