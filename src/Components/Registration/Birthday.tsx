import { useEffect, useState } from 'react'
import {
  getItemsDays,
  getItemsMonth,
  getItemsYear
} from '../../utils/common-functions'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import MultiPicker from 'rmc-picker/lib/MultiPicker'
import Picker from 'rmc-picker/lib/Picker'
import { birthdaySelector, setBirthday, setDisabledButton } from '../../Redux/slice/authSlice'

export const Birthday = () => {
  const itemDays = getItemsDays()
  const itemMonths = getItemsMonth()
  const itemYears = getItemsYear(new Date().getFullYear()-80, new Date().getFullYear()-18)

  const dispatch = useAppDispatch()
  const birhday = useAppSelector(birthdaySelector)

  const [value, setValue] = useState(
    new Date(birhday * 1000).toLocaleDateString().split('.')
  )

  const onChange = (value: any) => {
    setValue(value)
    // [value[1], value[3]] = [value[3], value[1]];
    const formatDate =
      Date.parse(value[1] + '.' + value[0] + '.' + value[2]) / 1000

    dispatch(setBirthday(formatDate))
  }

  useEffect(() => {
    dispatch(setDisabledButton(false))
  }, [])

  return (
    <div className={'registration__picker'}>
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
  )
}
