import { FC, useEffect, useState } from 'react'
import { Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import Pedometer from '../../plugins/pedometer'

import 'rmc-picker/assets/index.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import './start-page.scss'

import { Steps } from '../../Components/Steps/Steps'
import { StepsData } from '../../Components/Steps-data/Steps-data'
import iconChat from '../../assets/image/icon_chat.svg'
import { ScrollPicker } from '../../Components/Scroll-picker/Scroll-picker'
import { ACTIVITY_ROUTE } from '../../provider/constants-route'
import { getItemsStep } from '../../utils/common-functions'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import { setPurposeSteps } from '../../Redux/slice/purposeSlice'
import {
  setVisitedActivityPage,
  visitPagesSelector
} from '../../Redux/slice/authSlice'
import { Capacitor } from '@capacitor/core'
import PurposeService from '../../services/PurposeService'
import { Navigate } from 'react-router-dom'
import AppService from '../../services/AppService'

interface ISwiperNextButton {
  customClass: string
  quantity: string
}

export const StartPage = () => {
  const startValueStep = 1000
  const endValueStep = 20000

  const itemSteps = getItemsStep(startValueStep, endValueStep)
  const [stepValue, setStepValue] = useState<string>(
    (startValueStep + endValueStep) / 2 + ''
  )
  const dataUser = useAppSelector(dataUserSelector)
  const changeStep = (value: string) => setStepValue(value)
  const activityVisitCount = useAppSelector(visitPagesSelector)

  useEffect(() => {
    ;(async () => {
      if (Capacitor.getPlatform() === 'android') {
        const indexWeek = new Date().getDay() === 0 ? 7 : new Date().getDay()
        const startDateDay = new Date()
        startDateDay.setDate(startDateDay.getDate() - 7)
        const response = await AppService.getStepsPerDay(
          startDateDay.toLocaleDateString(),
          new Date().toLocaleDateString()
        )
        if (response.data.data.statistic) {
          await Pedometer.setData({
            numberOfSteps: response.data.data.statistic[indexWeek].quantity
          })
        }
      }
    })()
  }, [])

  if (activityVisitCount.activity === 1) {
    return <Navigate to={ACTIVITY_ROUTE} />
  }

  return (
    <div className='preview'>
      <Swiper
        modules={[Pagination, A11y]}
        className={'preview__swiper'}
        slidesPerView={1}
        pagination={{ clickable: true }}
        spaceBetween={50}
      >
        <SwiperSlide>
          <div className='preview__body'>
            <div className='preview__title'>
              Здравствуйте, <br /> {dataUser?.name}!
            </div>
            <div className='preview__text'>
              Это приложение созданно для тех кто хочет большего! Вы с нами?
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='preview__body'>
            <div className='preview__title preview__title_above-92'>
              Просто!
            </div>
            <div className='preview__text'>
              Поднять свою активность просто! Ставьте комфортную ежедневную
              цель. Больше активности - больше награда
            </div>
            <div className={'preview__scroll-picker-steps'}>
              <ScrollPicker
                items={itemSteps}
                value={stepValue}
                onChange={changeStep}
              />
            </div>
            <div className='preview__text small'>
              Можно изменить в любой момент
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='preview__body'>
            <div className='preview__title'>Вместе!</div>
            <div className='preview__text'>
              Учавствуйте во всероссийских челленджах. Объединяйтесь с
              коллегами, занимайте почетные места!
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='preview__body'>
            <div className='preview__title preview__title_above-75'>
              Следите
            </div>
            <div className='preview__sub-title'>За текущими шагами</div>
            <div className='preview__steps'>
              <Steps maxStepsCount={10000} userStepsCount={0} />
            </div>
            <div className='preview__steps-data'>
              <StepsData />
            </div>
            <div className='preview__sub-title'>Выполнением цели</div>
            <div className='preview__target'>{/* <Target /> */}</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='preview__body'>
            <div className='preview__title'>Вопросы?</div>
            <div className='preview__text' style={{ marginBottom: 11 }}>
              По любым вопросам пишите нам в чат
            </div>
            <div className='preview__text'>
              Это чат <img src={iconChat} alt='' />
            </div>
            {/* <div
              className={'preview__button _button-dark'}
              onClick={jumpToMain}
            >
              Дальше
            </div>            */}
          </div>
        </SwiperSlide>
        <div className={'circle-gradient'} />
        <SlideNextButton
          customClass={'preview__button _button-dark'}
          quantity={stepValue}
        />
      </Swiper>
    </div>
  )
}

export const SlideNextButton: FC<ISwiperNextButton> = ({
  customClass,
  quantity
}) => {
  const swiper = useSwiper()
  const [title, setTitle] = useState<string>('Я в деле!')
  const type = 1
  const dispatch = useAppDispatch()

  swiper.on('slideChange', function () {
    switch (swiper.activeIndex) {
      case 1:
        setTitle('Просто!')
        break
      case 2:
        setTitle('Дальше')
        break
      case 3:
        setTitle('Дальше')
        break
      case 4:
        setTitle('Наслаждайся!')
        break
      default:
        break
    }
  })

  const next = async () => {
    if (swiper.activeIndex === 4) {
      const isCompletedPurposeResponse =
        await PurposeService.isCompletedPurpose()
      if (!isCompletedPurposeResponse.data.data.length) {
        await dispatch(setPurposeSteps({ quantity, type }))
      }
      dispatch(setVisitedActivityPage(1))
    }
    swiper.slideNext()
  }

  return (
    <button className={customClass} onClick={next}>
      {title}
    </button>
  )
}
