import './creating-challenge.scss'
import DatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import 'react-datepicker/dist/react-datepicker.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  endDateCreatingChallengeSelector,
  setEndDateChallenge,
  setStartDateChallenge,
  startDateCreatingChallengeSelector
} from '../../Redux/slice/challengeSlice'
registerLocale('ru', ru)

export const CreatingDate = () => {

  const dispatch = useAppDispatch()

  const startDate = useAppSelector(startDateCreatingChallengeSelector)
  const endDate = useAppSelector(endDateCreatingChallengeSelector)

  const changePeriod = (dates: any) => {
    const [start, end] = dates
    dispatch(setStartDateChallenge(start))
    dispatch(setEndDateChallenge(end))
  }

  return (
    <div className={'creating-date'}>
      <div className='creating-date__title creating-title'>Даты</div>
      <div className='creating-date__sub-title creating-sub-title'>
        Продолжительность челленджа
        <span>
          {startDate && startDate.toLocaleDateString()} -{' '}
          {endDate && endDate.toLocaleDateString()}
        </span>
      </div>
      <div className='creating-date__calendar'>
        <DatePicker
          onChange={changePeriod}
          selectsRange
          inline
          startDate={startDate}
          endDate={endDate}
          dateFormat='dd.MM.yyyy'
          locale={ru}
        />
      </div>
    </div>
  )
}
