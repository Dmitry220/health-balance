import { useState } from 'react'
import './goal-water.scss'
import { ScrollPicker } from '../../Components/Scroll-picker/Scroll-picker'
import { getItemsWeight, showToast } from '../../utils/common-functions'
import Header from '../../Components/Header/Header'
import TrackerService from '../../services/TrackerService'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import { trackerSelector } from '../../Redux/slice/trackerSlice'

export const GoalWater = () => {
  const startValueWeight = 0
  const endValueWeight = 100
  const tracker = useAppSelector(trackerSelector)
  const itemsWeight = getItemsWeight(startValueWeight, endValueWeight, 'кг')

  const [weightUser, setWeightUser] = useState<string>(tracker.weight+'')

  const changeWeight = (value: string) => setWeightUser(value)

  const save = async () => {  
    try {
      await TrackerService.updateTracker(tracker.id, 'weight', weightUser)
      const response = await TrackerService.getTracks(new Date().toLocaleDateString())
      response.data.data.forEach(async (item, i) => {
        if(item.type === 2){
          await TrackerService.updateTrack(
            {
              id:item.id, type:2,  
            additional: Math.ceil(+((+weightUser * 35) / 1000).toFixed(1) / 10 * 1000) + ' мл'
            }
          )
        }
   
      })
      await showToast('Изменено успешно!')
    } catch (error) {
      await showToast('Ошибка!')
    }  
   
   
  }


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
      <button className='goal-water__button _button-white' onClick={save}>Установить</button>
    </div>
  )
}
