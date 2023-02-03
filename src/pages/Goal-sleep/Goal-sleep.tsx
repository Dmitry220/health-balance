import { useState } from 'react'
import {
  getItemsHour,
  getItemsMinutes,
  showToast
} from '../../utils/common-functions'
import Header from '../../Components/Header/Header'
import { ScrollPicker } from '../../Components/Scroll-picker/Scroll-picker'
import './goal-sleep.scss'
import TrackerService from '../../services/TrackerService'
import { getTracker, setChangeTrack, setDateSleep, trackerSelector } from '../../Redux/slice/trackerSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'

export const GoalSleep = () => {

  const dispatch = useAppDispatch()
  const tracker = useAppSelector(trackerSelector)
  const itemsHour = getItemsHour()
  const itemsMinutes = getItemsMinutes()
  const [hour, setHour] = useState<string>(
    tracker.wake_up_time.split(':')[0].length === 2
      ? tracker.wake_up_time.split(':')[0][1]
      : tracker.wake_up_time.split(':')[0] + ''
  )
  const [minutes, setMinutes] = useState<string>(
    tracker.wake_up_time.split(':')[1] + ''
  )

  const changeHour = (value: string) => setHour(value)
  const changeMinutes = (value: string) => setMinutes(value)

  let outputHour = +hour - 8 < 0 ? 24 + (+hour - 8) : +hour - 8

  const save = async () => {
    try {
      await TrackerService.updateTracker(
        tracker.id,
        'wake_up_time',
        hour + ':' + minutes
      )

      const response = await TrackerService.getTracks(new Date().toLocaleDateString())
      response.data.data.forEach(async (item, i) => {
        if(item.type === 1 || item.type === 3){
          await TrackerService.updateTrack(
            {
              id: item.id,
              time: Math.ceil(+(hour + ':' + minutes).split(':')[0] + 1.6 * i) + ':' + minutes,
              send_time: new Date().setHours(Math.ceil(+(hour + ':' + minutes).split(':')[0] + 1.6 * i), +minutes, 0, 0) / 1000,
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
    <div className={'goal-sleep'}>
      <Header title={'Цель сон'} />
      <div className='goal-sleep__title main-title'>
        Во сколько вы <br />
        просыпаетесь?
      </div>

      <div className='goal-sleep__digits'>
        <div className='goal-sleep__digits-item'>
          <ScrollPicker
            onChange={changeHour}
            items={itemsHour}
            value={hour}
            totalHeight={77}
            size={1}
            customClassname={'clock'}
            fontSize={44}
          />
        </div>
        <div className={''}>:</div>
        <div className='goal-sleep__digits-item'>
          <ScrollPicker
            onChange={changeMinutes}
            items={itemsMinutes}
            value={minutes}
            size={1}
            totalHeight={77}
            fontSize={44}
            customClassname={'clock'}
          />
        </div>
      </div>

      <div className='goal-sleep__recommendation small-text'>
        Оптимальное время засыпания:{' '}
        <span className='text-blue'>
          {outputHour.toLocaleString().length === 2
            ? outputHour
            : '0' + outputHour}
          :{minutes.length === 2 ? minutes : '0' + minutes}
        </span>
      </div>
      <button className='goal-sleep__button _button-white' onClick={save}>
        Установить
      </button>
    </div>
  )
}
