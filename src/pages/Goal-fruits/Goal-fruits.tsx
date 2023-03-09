import { useState } from 'react'
import Header from '../../Components/Header/Header'
import { trackerSelector } from '../../Redux/slice/trackerSlice'
import TrackerService from '../../services/TrackerService'
import { showToast } from '../../utils/common-functions'
import { useAppSelector } from '../../hooks/redux-hooks'
import './goal-fruits.scss'

export const GoalFruits = () => {
  const tracker = useAppSelector(trackerSelector)

  const [countFruits, setCountFruits] = useState<number>(tracker.fruits)

  const addCountFruits = () => setCountFruits((prev) => prev + 1)
  const decreaseCountFruits = () => {
    if (countFruits > 0) {
      setCountFruits((prev) => prev - 1)
    }
  }

  const save = async () => {
    try {
      await TrackerService.updateTracker(tracker.id, 'fruits', countFruits + '')
      await showToast('Изменения вступят в силу с завтрашнего дня!')
    } catch (error) {
      await showToast('Ошибка!')
    }
  }

  return (
    <div className={'goal-fruits'}>
      <Header title={'Цель фрукты'} />
      <div className='goal-fruits__title main-title'>
        Количество <br /> фруктов/овощей
      </div>
      <div className='goal-fruits__digits digits'>
        <div onClick={decreaseCountFruits}>-</div>
        <div className='digits__square'>
          {countFruits >= 10 ? countFruits : '0' + countFruits}
        </div>
        <div onClick={addCountFruits}>+</div>
      </div>
      <button className='goal-fruits__button _button-white' onClick={save}>
        Установить
      </button>
    </div>
  )
}
