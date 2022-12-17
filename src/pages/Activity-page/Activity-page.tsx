import { FC, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import Pedometer from '../../plugins/pedometer'



import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'

import { Steps } from '../../Components/Steps/Steps'
import { Navigation } from '../../Components/Navigation/Navigation'
import './activity-page.scss'
import { StepsData } from '../../Components/Steps-data/Steps-data'
import image from '../../assets/image/lecture/lecture_img.jpg'
import HeaderActive from '../../Components/Header-active/Header-active'
import { Target } from '../../Components/Target/Target'
import { TabContent, Tabs } from '../../Components/Tabs/Tabs'
import { TopRating } from '../../Components/Top-rating/Top-rating'
import { ImportantBlock } from '../../Components/Important-block/Important-block'
import {
  getGradient,
  optionsChartBar
} from '../../Components/Charts/Chart-options'
import { Banner } from '../../Components/Banner/Banner'
import { routesNavigation } from '../../utils/globalConstants'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { activityVisitSelector } from '../../Redux/slice/visitedPageSlice'
import { StartPage } from '../Start-pages/StartPage'
import AppService from '../../services/AppService'
import { getPersonalPurpose, purposeSelector } from '../../Redux/slice/purposeSlice'
import { daysWeekSelector, getStepsPerDay, getStepsPerMonth, monthSelector, setMonth, setWeeks, stepsPerDaySelector, stepsPerWeekAndMonthSelector, weeksSelector } from '../../Redux/slice/appSlice'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const ActivityPage: FC = () => {

  const [transparentHeader, setTransparentHeader] = useState<boolean>(true)
  const [stepsCount, setStepsCount] = useState<string>('-')
  const activityVisitCount = useAppSelector(activityVisitSelector)
  const purpose = useAppSelector(purposeSelector)

  useEffect(() => {
    startPlugin()

    window.addEventListener('scroll', function () {
      let scroll = window.pageYOffset
      // let step: any = document.querySelector('#step')
      // step.style.transform =
      //   'translate3d(0,' + scroll / 5 + '%,0) scale(' + (1 - scroll / 250) + ')'
      if (scroll >= 200) {
        //step.style.transform = 'translate3d(0, 42.2222%,0) scale(0.24)'
        setTransparentHeader(false)
      } else {
        setTransparentHeader(true)
      }
    })

    return () => {
      window.removeEventListener('stepEvent', updateSteps)
    }
  }, [])

  const startPlugin = async () => {
    Pedometer.start()

    let savedData = await Pedometer.getSavedData()
    let steps = savedData['numberOfSteps'] || '0'

    setStepsCount(steps)

    window.addEventListener('stepEvent', updateSteps)
  }

  const updateSteps = async (event: any) => {

    let endDate = new Date().toISOString()

    console.log(endDate, event.numberOfSteps)

    const params = new FormData()
    params.append("data", JSON.stringify([{ date: endDate, steps: event.numberOfSteps }]))
    const response = await AppService.updateSteps(params)
    console.log(response);

    setStepsCount(event.numberOfSteps)
  }

  console.log('render app');

  if (activityVisitCount === 0) {
    return <StartPage />
  }

  return (
    <div className={'activity-page'}>
      <HeaderActive transparent={transparentHeader} />
      <Navigation routes={routesNavigation} />
      <div
        className='activity-page__steps'
        id={'step'}
        style={{ backgroundAttachment: 'fixed' }}
      >
        <Steps maxStepsCount={purpose?.quantity || 0} userStepsCount={parseInt(stepsCount)} />
      </div>
      <div className='activity-page__steps-data'>
        <StepsData />
      </div>
      <div className='activity-page__title title'>Статистика</div>
      <div className='activity-page__target'>
        <Target />
      </div>
      <Graphis />
      <div className='activity-page__important'>
        <ImportantBlock />
        <Banner title={'Стартовый опрос'} text={'Ответьте на 4 вопроса'} />
      </div>
      <div className='activity-page__top-rating top-rating'>
        <div className='top-rating__title title'>Топ рейтинг</div>
        <TopRating />
      </div>
      <div className='circle-gradient circle-gradient_top' />
    </div>
  )
}


const Graphis = () => {

  const startDateDay = new Date()
  startDateDay.setDate(startDateDay.getDate() - 7)
  const startDateMonth = new Date()
  startDateMonth.setMonth(startDateMonth.getMonth() - 11)
  const dispatch = useAppDispatch()
  const [currentValueTab, setCurrentValueTab] = useState<number>(0)
  const namesTabsDynamics = ['Дни', 'Недели', 'Месяцы']
  const steps = useAppSelector(stepsPerDaySelector)
  const daysWeek = useAppSelector(daysWeekSelector)
  const month = useAppSelector(monthSelector)
  const weeks = useAppSelector(weeksSelector)
  const purpose = useAppSelector(purposeSelector)
  let intervalId: any

  const dataDay = {
    labels: daysWeek ? daysWeek.map((item) => item.title) : [],
    datasets: [
      {
        data: steps ? daysWeek.map((item) => item.quantiny) : [],
        backgroundColor: function (context: any) {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return null
          return getGradient(ctx, chartArea, '#F2994A', '#F4C119')
        },
        borderRadius: 5
      }
    ]
  }

  const dataWeek = {
    labels: weeks.map((item) => item.date),
    datasets: [
      {
        data: weeks ? weeks.map((item) => item.count) : [],
        // data: Object.keys(stepsPerWeekAndMonth).length ? Object.values(stepsPerWeekAndMonth : 0),
        //backgroundColor: '#F2994A',
        backgroundColor: function (context: any) {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return null

          return getGradient(ctx, chartArea, '#56CCF2', '#CCE0F7')
        },
        borderRadius: 5
      }
    ]
  }

  const dataMonth = {
    labels: month.map((item) => item.title),
    datasets: [
      {
        data: month ? month.map((item) => item.count) : [],
        backgroundColor: function (context: any) {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return null

          return getGradient(ctx, chartArea, '#56CCF2', '#CCE0F7')
        },
        borderRadius: 5
      }
    ]
  }

  useEffect(() => {
    const data = { end_date: new Date().toLocaleDateString(), start_date: startDateDay }
    const dataWeek = { end_date: new Date().toLocaleDateString(), start_date: "11.12.2022", type: 1 }
    const dataMonth = { end_date: new Date().toLocaleDateString(), start_date: startDateMonth, type: 2 }

    async function asyncQuery() {
      await dispatch(getStepsPerDay(data))
      await dispatch(getStepsPerMonth(dataMonth))
      dispatch(setMonth())
      // dispatch(setWeeks())
    }
    asyncQuery()
    intervalId = setInterval(() => {
      dispatch(getStepsPerDay(data))
    }, 5000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  console.log('render graph');


  return (
    <div className='activity-page__dynamics dynamics'>
      <div className='dynamics__title'>Динамика</div>
      <Tabs
        labels={namesTabsDynamics}
        onClick={setCurrentValueTab}
        value={currentValueTab}
      />
      <TabContent index={0} value={currentValueTab}>
        <div className='dynamics__chart'>
          <Bar options={optionsChartBar} data={dataDay} />
        </div>
        <div className={'dynamics__info'}>
          <div className='dynamics__value'>
            {steps && steps[steps.length - 1]?.quantiny} <br /> <span>шагов</span>
          </div>
          <div className='dynamics__value'>
            {steps && (steps[steps.length - 1]?.quantiny * 0.7 / 1000).toFixed(2)} <br /> <span>км</span>
          </div>
          <div className='dynamics__value'>
            {(purpose && steps) ? (steps[steps.length - 1]?.quantiny * 100 / purpose?.quantity).toFixed(2) : 0}%<br /> <span>от цели</span>
          </div>
        </div>
      </TabContent>
      <TabContent index={1} value={currentValueTab}>
        <div className='dynamics__chart'>
          <Bar options={optionsChartBar} data={dataWeek} />
        </div>
        <div className={'dynamics__info'}>
          <div className='dynamics__value'>
            0 <br /> <span>шагов</span>
          </div>
          <div className='dynamics__value'>
            0 <br /> <span>км</span>
          </div>
          <div className='dynamics__value'>
            0% <br /> <span>от цели</span>
          </div>
        </div>
      </TabContent>
      <TabContent index={2} value={currentValueTab}>
        <div className='dynamics__chart'>
          <Bar options={optionsChartBar} data={dataMonth} />
        </div>
        <div className={'dynamics__info'}>
          <div className='dynamics__value'>
            {month[month.length - 1].count} <br /> <span>шагов</span>
          </div>
          <div className='dynamics__value'>
            {(month[month.length - 1].count * 0.7 / 1000).toFixed(2)} <br /> <span>км</span>
          </div>
          <div className='dynamics__value'>
            {(purpose && steps) ? (steps[steps?.length - 1]?.quantiny * 100 / purpose?.quantity).toFixed(2) : 0}%<br /> <span>от цели</span>
          </div>
        </div>
      </TabContent>
    </div>
  )
}