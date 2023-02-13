import { TabContent, Tabs } from '../../Components/Tabs/Tabs'
import { useState } from 'react'
import Header from '../../Components/Header/Header'
import './statistic-tracker.scss'
import { HealthySleep } from '../../Components/Tracker/Healthy-sleep'
import { WaterTarget } from '../../Components/Tracker/Water-target'
import { FruitTarget } from '../../Components/Tracker/Fruit-target'
import DayStatistic from '../../Components/Tracker/Day-statistic'
import ReactDatePicker,{registerLocale} from 'react-datepicker'
import { useAppDispatch } from '../../utils/hooks/redux-hooks'
import { getTracks } from '../../Redux/slice/trackerSlice'
import ru from 'date-fns/locale/ru'

export const StatisticTracker = () => {
  const namesTabsDynamics = ['Сон', 'Вода', 'Фрукты']
  const [currentValueTab, setCurrentValueTab] = useState<number>(0)
  const [startDate, setStartDate] = useState<Date>(new Date());
  const dispatch = useAppDispatch()

  return (
    <div className='statistic-tracker'>
      <Header title='Статистика трекера' />
      <div className="statistic-tracker__calendar">
        <ReactDatePicker
          selected={startDate}
          onChange={(date: Date) => {
            setStartDate(date)
            dispatch(getTracks(date.toLocaleDateString()))
          }}
          locale={ru}
          inline
        />
      </div>
      <DayStatistic date={startDate.toLocaleDateString()} />
      <Tabs
        labels={namesTabsDynamics}
        onClick={setCurrentValueTab}
        value={currentValueTab}
      />
      <div style={{ height: '25px' }}></div>
      <TabContent index={0} value={currentValueTab}>
        <HealthySleep editProhibition />
      </TabContent>
      <TabContent index={1} value={currentValueTab}>
        <WaterTarget />
      </TabContent>
      <TabContent index={2} value={currentValueTab}>
        <FruitTarget />
      </TabContent>
    </div>
  )
}
