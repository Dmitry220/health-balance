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
import { getStepsPerDay, getStepsPerWeekAndMonth, stepsPerDaySelector, stepsPerWeekAndMonthSelector } from '../../Redux/slice/appSlice'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const ActivityPage: FC = () => {

  const startDateDay = new Date()
  startDateDay.setDate(startDateDay.getDate() - 7)
  const startDateMonth = new Date()
  startDateMonth.setMonth(startDateMonth.getMonth() - 11)
  const [currentValueTab, setCurrentValueTab] = useState<number>(0)
  const [transparentHeader, setTransparentHeader] = useState<boolean>(true)
  const [stepsCount, setStepsCount] = useState<string>('-')
  const activityVisitCount = useAppSelector(activityVisitSelector)
  const steps = useAppSelector(stepsPerDaySelector)
  const stepsPerWeekAndMonth = useAppSelector(stepsPerWeekAndMonthSelector)
  const dispatch = useAppDispatch()
  const purpose = useAppSelector(purposeSelector)
  const namesTabsDynamics = ['Дни', 'Недели', 'Месяцы']
  const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const labelsMonth = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
  const labelsWeek = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']; 
  const itemCardActuals = [
    {
      id: 1,
      title: 'Как начать сегодня!',
      type: 'Мотивация',
      image: image
    },
    {
      id: 2,
      title: 'Что нас объединяет?',
      type: 'Интересное',
      image:
        'https://w-dog.ru/wallpapers/3/19/345083118206129/sportsmenka-devushka-begovaya-dorozhka.jpg'
    },
    {
      id: 3,
      title: 'Ежемесячный забег поддержки',
      type: 'Челлендж',
      image: image
    },
    {
      id: 4,
      title: 'Что нас объединяет?',
      type: 'Интересное',
      image: image
    },
    {
      id: 5,
      title: 'Ежемесячный забег поддержки',
      type: 'Челлендж',
      image:
        'https://w-dog.ru/wallpapers/3/19/345083118206129/sportsmenka-devushka-begovaya-dorozhka.jpg'
    }
  ]
  let intervalId:any
  useEffect(() => {
    const data = { end_date: new Date().toLocaleDateString(), start_date: startDateDay }
    const dataWeek = { end_date: new Date().toLocaleDateString(), start_date: "12.12.2022", type: 1 }
    const dataMonth = { end_date: new Date().toLocaleDateString(), start_date:startDateMonth, type: 2 }
    dispatch(getPersonalPurpose())
    dispatch(getStepsPerWeekAndMonth(dataMonth))
   
    console.log("111");
    intervalId = setInterval(() => {
      // console.log("456");
      dispatch(getStepsPerDay(data))
    }, 5000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

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
console.log(steps);


  const dataDay = {
    labels: steps ? steps.map((item) => item.date) : [],
    datasets: [
      {
        data: steps ? steps.map((item) => item.quantiny) : [],
        //backgroundColor: '#F2994A',
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
    labels: labels.map((item) => item),
    datasets: [
      {
        data: steps ? steps.map((item) => item.quantiny) : [],
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
    labels: labelsMonth.map((item) => item),
    datasets: [
      {
       // data: Object.keys(stepsPerWeekAndMonth).length ? Object.values(stepsPerWeekAndMonth["2022"]) : 0,
        data: steps ? steps.map((item) => item.quantiny) : [],
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
      {/* <div className='activity-page__card-actual'>
        {itemCardActuals.map((item) => (
          <CardActual
            key={item.id}
            title={item.title}
            path={MOTIVATION_ROUTE}
            image={item.image}
            type={item.type}
          />
        ))}
      </div> */}
      <div className='activity-page__title title'>Статистика</div>
      <div className='activity-page__target'>
        <Target purpose={purpose} currentSteps={parseInt(stepsCount)} steps={steps}/>
      </div>
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
              10 758 <br /> <span>шагов</span>
            </div>
            <div className='dynamics__value'>
              8,6 <br /> <span>км</span>
            </div>
            <div className='dynamics__value'>
              100% <br /> <span>от цели</span>
            </div>
          </div>
        </TabContent>
        <TabContent index={1} value={currentValueTab}>
          <div className='dynamics__chart'>
            <Bar options={optionsChartBar} data={dataWeek} />
          </div>
          <div className={'dynamics__info'}>
            <div className='dynamics__value'>
              10 758 <br /> <span>шагов</span>
            </div>
            <div className='dynamics__value'>
              8,6 <br /> <span>км</span>
            </div>
            <div className='dynamics__value'>
              100% <br /> <span>от цели</span>
            </div>
          </div>
        </TabContent>
        <TabContent index={2} value={currentValueTab}>
          <div className='dynamics__chart'>
            <Bar options={optionsChartBar} data={dataMonth} />
          </div>
          <div className={'dynamics__info'}>
            <div className='dynamics__value'>
              10 758 <br /> <span>шагов</span>
            </div>
            <div className='dynamics__value'>
              8,6 <br /> <span>км</span>
            </div>
            <div className='dynamics__value'>
              100% <br /> <span>от цели</span>
            </div>
          </div>
        </TabContent>
      </div>
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
