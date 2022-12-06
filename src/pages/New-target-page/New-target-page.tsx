import { ChangeEvent, useState } from 'react'
import Header from '../../Components/Header/Header'
import { purposeSelector } from '../../Redux/slice/purposeSlice'
import PurposeService from '../../services/PurposeService'
import { showToast } from '../../utils/common-functions'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import './new-target-page.scss'

export const NewTargetPage = () => {
  const dispatch = useAppDispatch()

  const purpose = useAppSelector(purposeSelector)

  const range = function (start: number, stop: number, step: number) {
    if (stop === null) {
      stop = start || 0
      start = 0
    }
    step = step || 1

    let length = Math.max(Math.ceil((stop - start) / step), 0)
    let range = Array(length)

    for (let idx = 0; idx <= length; idx++, start += step) {
      range[idx] = start
    }
    return range
  }

  const [valueStep, setValueStep] = useState<string>('')

  const optionsSteps = range(500, 25000, 500)

  const handlerSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setValueStep(e.target.value)

  const savePurpose = async () => {
    try {
      if (purpose?.id) {
        await PurposeService.changePersonalPurpose(purpose.id, +valueStep)
        await showToast('Цель успешно изменина')
      }
    } catch (error) {
      await showToast('Ошибка!')
    }
  }

  return (
    <div className={'new-target-page'}>
      <Header title={'Новая цель'} />
      <div className='new-target-page__title main-title'>Выбери цель</div>
      <div className='new-target-page__select _custom-select'>
        <select onChange={handlerSelect} defaultValue={purpose?.quantity}>
          {optionsSteps.map((option, i) => (
            <option key={i} value={option}>
              {option} шагов
            </option>
          ))}
        </select>
      </div>
      <button
        className='new-target-page__button _button-white'
        onClick={savePurpose}
      >
        Сохранить
      </button>
    </div>
  )
}
