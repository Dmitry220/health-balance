import { useState } from 'react'
import './goal-water.scss'
import { ScrollPicker } from '../../Components/Scroll-picker/Scroll-picker'
import { getItemsWeight } from '../../utils/common-functions'
import Header from '../../Components/Header/Header'

export const GoalWater = () => {
  const startValueWeight = 0
  const endValueWeight = 100

  const itemsWeight = getItemsWeight(startValueWeight, endValueWeight, 'кг')

  const [weightUser, setWeightUser] = useState<string>(
    (startValueWeight + endValueWeight) / 2 + ''
  )

  const changeWeight = (value: string) => setWeightUser(value)

  return (
    <div className={'goal-water'}>
      <Header title={'Цель вода'} />
      <div className='goal-water__title main-title'>Ваш текущий вес</div>
      <div className='goal-water__weight'>
        <ScrollPicker
          onChange={changeWeight}
          items={itemsWeight}
          value={weightUser}
        />
      </div>
      <div className='goal-water__recommendation small-text'>
        Количество воды в день: <span className='text-blue'>{(+weightUser*35/1000).toFixed(1)} литра</span>
      </div>
      <button className='goal-water__button _button-white'>Установить</button>
    </div>
  )
}
