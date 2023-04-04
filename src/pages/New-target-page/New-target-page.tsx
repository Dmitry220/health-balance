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
  const [isLoading, setIsLoading] = useState(false)
  const [valueStep, setValueStep] = useState<string>('')

  const optionsSteps = range(1000, 25000, 500)

  const handlerSelect = (e: ChangeEvent<HTMLSelectElement>) =>
    setValueStep(e.target.value)

  const savePurpose = async () => {
    setIsLoading(true)
    try {
      if (purpose?.id && noFinished) {
        const response = await PurposeService.changePersonalPurpose(purpose.id, +valueStep)
        response.data.success && await showToast('Цель успешно изменена')
      } else {
        await showToast('На сегодня цель выполнена!')
      }
    } catch (error) {
      await showToast('Ошибка!')
    } finally {
      setIsLoading(false)
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
    purpose && setValueStep(purpose?.quantity.toString())
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
        disabled={isLoading}
        onClick={savePurpose}
      >
        {isLoading ? (
          <span className='spinner'>
            <i className='fa fa-spinner fa-spin'></i> Загрузка
          </span>
        ) : 'Сохранить'}
      </button>
    </div>
  )
}
