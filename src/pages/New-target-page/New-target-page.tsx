import { ChangeEvent, useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import { purposeSelector } from '../../Redux/slice/purposeSlice'
import PurposeService from '../../services/PurposeService'
import { range, showToast } from '../../utils/common-functions'
import { useAppSelector } from '../../hooks/redux-hooks'
import './new-target-page.scss'

export const NewTargetPage = () => {
  const purpose = useAppSelector(purposeSelector)
  const [noFinished, setNoFinished] = useState<boolean>(false)

  const [valueStep, setValueStep] = useState<string>('')

  const optionsSteps = range(1000, 25000, 500)

  const handlerSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setValueStep(e.target.value)

  const savePurpose = async () => {
    try {
      if (purpose?.id && noFinished) {
        await PurposeService.changePersonalPurpose(purpose.id, +valueStep)
        await showToast('Цель успешно изменена')
      } else {
        await showToast('На сегодня цель выполнена!')
      }
    } catch (error) {
      await showToast('Ошибка!')
    }
  }

  const isCompletedPurpose = async () => {
    const isCompletedPurposeResponse = await PurposeService.isCompletedPurpose()
    if (!isCompletedPurposeResponse.data.data.length) {
      setNoFinished(true)
    }
  }

  useEffect(() => {
    isCompletedPurpose()
  }, [])

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
