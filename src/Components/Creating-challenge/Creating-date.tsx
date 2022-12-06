import React, { useEffect, useState } from 'react'
import './creating-challenge.scss'
import { ScrollPicker } from '../Scroll-picker/Scroll-picker'
import {
  getItemsDays,
  getItemsMonth,
  getItemsYear
} from '../../utils/common-functions'
import DatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import arrowRight from '../../assets/image/Calendar/arrow-right.svg'
import arrowLeft from '../../assets/image/Calendar/arrow-left.svg'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import MultiPicker from 'rmc-picker/lib/MultiPicker'
import Picker from 'rmc-picker/lib/Picker'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  endDateCreatingChallengeSelector,
  setEndDateChallenge,
  setStartDateChallenge,
  startDateCreatingChallengeSelector
} from '../../Redux/slice/challengeSlice'
registerLocale('ru', ru)

export const CreatingDate = () => {
  const itemDays = getItemsDays()
  const itemMonths = getItemsMonth()
  const itemYears = getItemsYear(1970, 2020)

  const dispatch = useAppDispatch()

  const startDate = useAppSelector(startDateCreatingChallengeSelector)
  const endDate = useAppSelector(endDateCreatingChallengeSelector)

  const changePeriod = (dates: any) => {
    const [start, end] = dates
    dispatch(setStartDateChallenge(start))
    dispatch(setEndDateChallenge(end))
  }

  const [value, setValue] = useState(
    new Date(45456465 * 1000).toLocaleDateString().split('.')
  )

  const [day, setDay] = useState<string>('15')
  const [month, setMonth] = useState<string>('6')
  const [year, setYear] = useState<string>('1998')

  const onChange = (value: any) => {
    // setValue(value)
    console.log(value)

    // [value[1], value[3]] = [value[3], value[1]];
    const formatDate =
      Date.parse(value[1] + '.' + value[0] + '.' + value[2]) / 1000

    // dispatch(setBirthday(formatDate))
  }

  const onChangeDay = (value: string) => setDay(value)

  const onChangeMonth = (value: any) => setMonth(value)

  const onChangeYear = (value: string) => setYear(value)

  return (
    <div className={'creating-date'}>
      <div className='creating-date__title creating-title'>Даты</div>
      <div className='creating-date__sub-title creating-sub-title'>
        Начало регистрации
        <span>
          {day + '.' + (month.length === 1 ? '0' + month : month) + '.' + year}
        </span>
      </div>
      <div className={'creating-date__picker'}>
        <MultiPicker selectedValue={value} onValueChange={onChange}>
          <Picker
            indicatorClassName='my-picker-indicator'
            className={'registration__picker-item'}
          >
            {itemDays.map((item) => (
              <Picker.Item
                className='my-picker-view-item'
                value={item}
                key={+item}
              >
                {item}
              </Picker.Item>
            ))}
          </Picker>
          <Picker
            indicatorClassName='my-picker-indicator'
            className={'registration__picker-item'}
          >
            {itemMonths.map((item, i) => (
              <Picker.Item
                className='my-picker-view-item'
                value={i + 1 >= 10 ? i + 1 + '' : '0' + (i + 1)}
                key={i}
              >
                {item}
              </Picker.Item>
            ))}
          </Picker>
          <Picker
            indicatorClassName='my-picker-indicator'
            className={'registration__picker-item'}
          >
            {itemYears.map((item) => (
              <Picker.Item
                className='my-picker-view-item'
                value={item}
                key={+item}
              >
                {item}
              </Picker.Item>
            ))}
          </Picker>
        </MultiPicker>
      </div>
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
          //  peekNextMonth
          //  showMonthDropdown
          // showYearDropdown
          startDate={startDate}
          endDate={endDate}
          dateFormat='dd.MM.yyyy'
          // dropdownMode="select"
          locale={ru}
        />
      </div>
    </div>
  )
}
