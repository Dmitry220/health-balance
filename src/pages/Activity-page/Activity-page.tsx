import { FC, useEffect, useRef, useState } from 'react'
import { Capacitor } from '@capacitor/core'

import { Health } from '@awesome-cordova-plugins/health'
import Pedometer from '../../plugins/pedometer'

import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import './../../assets/style/pullToRefresh.scss'

import { Steps } from '../../Components/Steps/Steps'
import { Navigation } from '../../Components/Navigation/Navigation'
import './activity-page.scss'
import { StepsData } from '../../Components/Steps-data/Steps-data'
import HeaderActive from '../../Components/Header-active/Header-active'
import { Target } from '../../Components/Target/Target'
import { TopRating } from '../../Components/Top-rating/Top-rating'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  getPersonalPurpose,
  purposeSelector
} from '../../Redux/slice/purposeSlice'
import {
  currentStepsCountSelector,
  getBalance,
  getStepsPerDay,
  getStepsPerMonth,
  getStepsPerWeek,
  setCurrentStepsCount,
  setMonths,
  setWeeks
} from '../../Redux/slice/appSlice'
import { isGoogleFitSelector } from '../../Redux/slice/settingsSlice'
import { Charts } from '../../Components/Charts/Charts'
import AppService from '../../services/AppService'
import { periodMonth, periodWeek } from '../../Components/Charts/Chart-options'
import { usePullToRefresh } from '../../hooks/usePulltoRefresh'
import { leaderboardApi } from '../../services/leaderboard.api'

export const ActivityPage: FC = () => {
  const dispatch = useAppDispatch()

  const [transparentHeader, setTransparentHeader] = useState<boolean>(true)

  const interval: { current: NodeJS.Timer | null } = useRef(null)

  const purpose = useAppSelector(purposeSelector)
  const currentStepsCount = useAppSelector(currentStepsCountSelector)
  const isGoogleFit = useAppSelector(isGoogleFitSelector)

  const pullToRefresh = useRef(null)

  useEffect(() => {
    startPluginFromPlatform()

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

  const startPluginFromPlatform = () => {
    if (Capacitor.getPlatform() === 'android') {
      if (isGoogleFit === 2) authGoogleFit()
      else startPlugin()
    } else if (Capacitor.getPlatform() === 'ios') {
      startHealthKit()
    }
  }

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
    let savedData = await Pedometer.getSavedData()
    let steps = savedData['numberOfSteps'] || '0'

    dispatch(setCurrentStepsCount(steps))

    window.addEventListener('stepEvent', updateSteps)
  }

  const updateSteps = async (event: any) => {
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

  const getDataCharts = async () => {
    await dispatch(getStepsPerDay())
    await dispatch(getStepsPerMonth(periodWeek))
    await dispatch(getStepsPerWeek(periodMonth))
    dispatch(setMonths())
    dispatch(setWeeks())
  }
  const [trigger] = leaderboardApi.endpoints.leaderboard.useLazyQuery()
  const handleRefresh = async () => {
    await dispatch(getPersonalPurpose())
    await dispatch(getBalance())
    await trigger(null)
    await getDataCharts()
  }

  usePullToRefresh(pullToRefresh, handleRefresh, 50)

  return (
    <div className='activity-page'>
      <HeaderActive transparent={transparentHeader} />
      <Navigation />
      <div className={'activity-page__pull-to-refresh'}>
        <div ref={pullToRefresh}>
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
          <Charts />
          {/*<div className='activity-page__important'>*/}
          {/*  <ImportantBlock />*/}
          {/*  <Banner title={'Стартовый опрос'} text={'Ответьте на 4 вопроса'} />*/}
          {/*</div>*/}
          <div className='activity-page__top-rating top-rating'>
            <div className='top-rating__title title'>ТОП сегодня</div>
            <TopRating />
          </div>
        </div>
      </div>
      <div className='circle-gradient circle-gradient_top' />
    </div>
  )
}
