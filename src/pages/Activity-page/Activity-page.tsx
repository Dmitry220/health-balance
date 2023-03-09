import { FC, useEffect, useState, useRef } from 'react'
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
import { Capacitor } from '@capacitor/core'

import { Health } from '@awesome-cordova-plugins/health'
import Pedometer from '../../plugins/pedometer'

import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'

import { Steps } from '../../Components/Steps/Steps'
import { Navigation } from '../../Components/Navigation/Navigation'
import './activity-page.scss'
import { StepsData } from '../../Components/Steps-data/Steps-data'
import HeaderActive from '../../Components/Header-active/Header-active'
import { Target } from '../../Components/Target/Target'
import { TabContent, Tabs } from '../../Components/Tabs/Tabs'
import { TopRating } from '../../Components/Top-rating/Top-rating'
import {
  getGradient,
  optionsChartBar
} from '../../Components/Charts/Chart-options'
import { routesNavigation } from '../../utils/globalConstants'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import AppService from '../../services/AppService'
import { purposeSelector } from '../../Redux/slice/purposeSlice'
import {
  currentStepsCountSelector,
  getStepsPerDay,
  getStepsPerMonth,
  getStepsPerWeek,
  monthsSelector,
  setCurrentStepsCount,
  setMonths,
  setWeeks,
  stepsPerDaySelector,
  weeksSelector
} from '../../Redux/slice/appSlice'
import { nFormatter, showToast, sklonenie } from '../../utils/common-functions'
import { isGoogleFitSelector } from '../../Redux/slice/settingsSlice'
import { visitPagesSelector } from '../../Redux/slice/authSlice'
import PurposeService from '../../services/PurposeService'
import { ModalSuccess } from '../../Components/Modals/Modal-success'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const ActivityPage: FC = () => {
  const dispatch = useAppDispatch()

  const [transparentHeader, setTransparentHeader] = useState<boolean>(true)

  const interval: { current: NodeJS.Timer | null } = useRef(null)

  const purpose = useAppSelector(purposeSelector)
  const currentStepsCount = useAppSelector(currentStepsCountSelector)
  const isGoogleFit = useAppSelector(isGoogleFitSelector)

  useEffect(() => {
    if (Capacitor.getPlatform() === 'android') {
      if (isGoogleFit === 2) {
        authGoogleFit()
      } else {
        startPlugin()
      }
    } else if (Capacitor.getPlatform() === 'ios') {
      startHealthKit()
    }

    window.addEventListener('scroll', function () {
      let scroll = window.pageYOffset
      if (scroll >= 200) {
        setTransparentHeader(false)
      } else {
        setTransparentHeader(true)
      }
    })

    return () => {
      window.removeEventListener('stepEvent', updateSteps)
      clearInterval(interval.current as NodeJS.Timeout)
    }
  }, [])

  const authGoogleFit = async () => {
    // запрос на авторизацию для отправки шагов
    Health.isAvailable()
      .then((available) => {
        if (available) {
          Health.requestAuthorization([{ read: ['steps'] }])
            .then(() => {
              Health.promptInstallFit().then(() => {
                getStepsHistory()
              })
            })
            .catch((error) => console.error(error))
        }
      })
      .catch((error) => console.error(error))
  }

  const startPlugin = async () => {
    let endDate = new Date().toLocaleDateString()
    let savedData = await Pedometer.getSavedData()
    let steps = savedData['numberOfSteps'] || '0'

    dispatch(setCurrentStepsCount(steps))

    const params = new FormData()

    params.append('data', JSON.stringify([{ date: endDate, steps: steps }]))

    await AppService.updateSteps(params)

    window.addEventListener('stepEvent', updateSteps)
  }

  const updateSteps = async (event: any) => {
    let endDate = new Date().toLocaleDateString()

    const params = new FormData()

    params.append(
      'data',
      JSON.stringify([{ date: endDate, steps: event.numberOfSteps }])
    )

    await AppService.updateSteps(params)

    dispatch(setCurrentStepsCount(parseInt(event.numberOfSteps)))
  }

  const updateStepsPeriod = async (data: any) => {
    const params = new FormData()

    params.append('data', JSON.stringify(data))

    await AppService.updateSteps(params)

    dispatch(setCurrentStepsCount(parseInt(data[data.length - 1].steps)))
  }

  const startHealthKit = async () => {
    // запрос на авторизацию в Apple Health для отправки шагов
    Health.isAvailable()
      .then((available: any) => {
        if (available) {
          Health.requestAuthorization([{ read: ['steps'] }])
            .then(() => getStepsHistory())
            .catch((error: any) => console.error(error))
        }
      })
      .catch((error: any) => console.error(error))
  }

  const getStepsHistory = async () => {
    // каждые 5 секунд запрашиваем изменения шагов
    const id = setInterval(() => {
      // получение данных по шагам за последние 3 месяца
      Health.queryAggregated({
        startDate: subtractMonths(3),
        endDate: new Date(),
        dataType: 'steps',
        bucket: 'day'
      })
        .then((res: any) => {
          let steps = res.map((item: any) => {
            return {
              date: item.startDate.toLocaleDateString(),
              steps: item.value.toFixed()
            }
          })

          updateStepsPeriod(steps)
        })
        .catch((e: any) => console.log(e))
    }, 5000)

    interval.current = id
  }

  const subtractMonths = (numOfMonths: number, date = new Date()) => {
    date.setMonth(date.getMonth() - numOfMonths)
    return date
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
        <Steps
          maxStepsCount={purpose?.quantity || 0}
          userStepsCount={currentStepsCount}
        />
      </div>
      <div className='activity-page__steps-data'>
        <StepsData />
      </div>
      <div className='activity-page__title title'>Статистика</div>
      <div className='activity-page__target'>
        <Target />
      </div>
      <Graphs />
      {/* <div className='activity-page__important'>
        <ImportantBlock />
        <Banner title={'Стартовый опрос'} text={'Ответьте на 4 вопроса'} />
      </div> */}
      <div className='activity-page__top-rating top-rating'>
        <div className='top-rating__title title'>ТОП сегодня</div>
        <TopRating />
      </div>
      <div className='circle-gradient circle-gradient_top' />
    </div>
  )
}

const Graphs = () => {
  const startDateDay = new Date()
  startDateDay.setDate(startDateDay.getDate() - 7)
  const startDateWeek = new Date()
  startDateWeek.setDate(startDateWeek.getDate() - 7 * 7)
  const startDateMonth = new Date()
  startDateMonth.setMonth(startDateMonth.getMonth() - 12)

  const dispatch = useAppDispatch()
  const [currentValueTab, setCurrentValueTab] = useState<number>(0)
  const namesTabsDynamics = ['Дни', 'Недели', 'Месяцы']
  const [showModal, setShowModal] = useState<boolean>(false)
  const currentStepsCount = useAppSelector(currentStepsCountSelector)
  const steps = useAppSelector(stepsPerDaySelector)
  const months = useAppSelector(monthsSelector)
  const weeks = useAppSelector(weeksSelector)
  const purpose = useAppSelector(purposeSelector)
  const indexWeek = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  const percent =
    purpose && steps.statistic
      ? steps.statistic[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
          ?.finished
        ? 100
        : (
            (steps.statistic[indexWeek]?.quantity * 100) /
            purpose?.quantity
          ).toFixed(2)
      : 0

  const dataDay = {
    labels: steps ? steps.statistic.map((item) => item.day) : [],
    datasets: [
      {
        data: steps ? steps.statistic.map((item) => item.quantity) : [],
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
    labels: weeks.map((item) => item.date).reverse(),
    datasets: [
      {
        data: weeks ? weeks.map((item) => item.count).reverse() : [],
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
    labels: months.map((item) => item.title),
    datasets: [
      {
        data: months ? months.map((item) => item.count) : [],
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
    const data = {
      end_date: new Date().toLocaleDateString(),
      start_date: startDateDay.toLocaleDateString()
    }
    const dataWeek = {
      end_date: new Date().toLocaleDateString(),
      start_date: startDateWeek.toLocaleDateString(),
      type: 1
    }
    const dataMonth = {
      end_date: new Date().toLocaleDateString(),
      start_date: startDateMonth.toLocaleDateString(),
      type: 2
    }

    async function asyncQuery() {
      await dispatch(getStepsPerDay(data))
      await dispatch(getStepsPerMonth(dataMonth))
      await dispatch(getStepsPerWeek(dataWeek))
      dispatch(setMonths())
      dispatch(setWeeks())
    }
    asyncQuery()
  }, [currentStepsCount])

  useEffect(() => {
    ;(async () => {
      const isCompletedPurposeResponse =
        await PurposeService.isCompletedPurpose()
      if (
        !isCompletedPurposeResponse.data.data.length &&
        purpose &&
        steps.statistic[indexWeek]?.quantity >= purpose.quantity
      ) {
        const response = await PurposeService.completePersonalPurpose(
          purpose?.id
        )
        if (response.data.success) {
          setShowModal(true)
        }
      }
    })()
  }, [steps])

  if (showModal) {
    return (
      <ModalSuccess
        updateActive={true}
        setShowModal={setShowModal}
        showModal={showModal}
        subTitle='Ваша награда'
        reward={purpose?.reward}
        title={'Личная цель на сегодня выполнена'}
      />
    )
  }

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
            {nFormatter(steps.statistic[indexWeek]?.quantity, 2)} <br />{' '}
            <span>
              {sklonenie(steps.statistic[indexWeek]?.quantity, [
                'шаг',
                'шага',
                'шагов'
              ])}
            </span>
          </div>
          <div className='dynamics__value'>
            {((steps.statistic[indexWeek]?.quantity * 0.7) / 1000).toFixed(2)}
            <br /> <span>км</span>
          </div>
          <div className='dynamics__value'>
            {percent}
            %<br /> <span>от цели</span>
          </div>
        </div>
      </TabContent>
      <TabContent index={1} value={currentValueTab}>
        <div className='dynamics__chart'>
          <Bar options={optionsChartBar} data={dataWeek} />
        </div>
        <div className={'dynamics__info'}>
          <div className='dynamics__value'>
            {nFormatter(weeks[0].count, 2)} <br />{' '}
            <span>{sklonenie(weeks[0].count, ['шаг', 'шага', 'шагов'])}</span>
          </div>
          <div className='dynamics__value'>
            {nFormatter(+((weeks[0].count * 0.7) / 1000).toFixed(2), 1)} <br />{' '}
            <span>км</span>
          </div>
          <div className='dynamics__value'>
            {percent}
            %<br /> <span>от цели</span>
          </div>
        </div>
      </TabContent>
      <TabContent index={2} value={currentValueTab}>
        <div className='dynamics__chart'>
          <Bar options={optionsChartBar} data={dataMonth} />
        </div>
        <div className={'dynamics__info'}>
          <div className='dynamics__value'>
            {nFormatter(months[new Date().getMonth()].count, 1)} <br />{' '}
            <span>
              {sklonenie(months[new Date().getMonth()].count, [
                'шаг',
                'шага',
                'шагов'
              ])}
            </span>
          </div>
          <div className='dynamics__value'>
            {nFormatter(
              +((months[new Date().getMonth()].count * 0.7) / 1000).toFixed(2),
              1
            )}
            <br /> <span>км</span>
          </div>
          <div className='dynamics__value'>
            {percent}
            %<br /> <span>от цели</span>
          </div>
        </div>
      </TabContent>
    </div>
  )
}
