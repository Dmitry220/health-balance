import { FC, useState } from 'react'
import { Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { ScrollPicker } from '../../Components/Scroll-picker/Scroll-picker'

import icon_dream from '../../assets/image/tracker/icon-dream.svg'
import icon_fruit from '../../assets/image/tracker/icon-fruit.svg'
import icon_water from '../../assets/image/tracker/icon-water.svg'

import './tracker.scss'
import {
  getItemsHour,
  getItemsMinutes,
  getItemsWeight
} from '../../utils/common-functions'
import { TrackerHabitsPage } from '../Tracker-habits/Tracker-habits-page'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  trackerVisitSelector
} from '../../Redux/slice/visitedPageSlice'
import TrackerService from '../../services/TrackerService'
import { setVisitedTrackerPage, visitPagesSelector } from '../../Redux/slice/authSlice'

export const TrackerPage = () => {
  const trackerVisitCount = useAppSelector(visitPagesSelector)
  const dispatch = useAppDispatch()

  const startValueWeight = 0
  const endValueWeight = 100

  const itemsWeight = getItemsWeight(startValueWeight, endValueWeight, 'кг')
  const [weightUser, setWeightUser] = useState<string>(
    (startValueWeight + endValueWeight) / 2 + ''
  )
  const [countFruits, setCountFruits] = useState<number>(0)

  const changeWeight = (value: string) => setWeightUser(value)
  const addCountFruits = () => setCountFruits((prev) => prev + 1)
  const decreaseCountFruits = () => {
    if (countFruits > 0) {
      setCountFruits((prev) => prev - 1)
    }
  }

  const itemsHour = getItemsHour()
  const itemsMinutes = getItemsMinutes()
  const [hour, setHour] = useState<string>(12 + '')
  const [minutes, setMinutes] = useState<string>(30 + '')

  const changeHour = (value: string) => setHour(value)
  const changeMinutes = (value: string) => setMinutes(value)


  if (trackerVisitCount.tracker === 1) {
    return <TrackerHabitsPage />
  }

  return (
    <div className={'tracker'}>
      <Swiper
        modules={[Pagination, A11y]}
        className={'preview__swiper'}
        slidesPerView={1}
        pagination={{ clickable: true }}
        spaceBetween={50}
      >
        <SwiperSlide>
          <div className='tracker__body'>
            <div className='tracker__title tracker__title_start title-35'>
              Это трекер <br /> полезных превычек
            </div>
            <div className='tracker__text'>
              Здесь мы будем приучаться хорошо спать, правильно пить воду и есть
              фрукты/овощи
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='tracker__body'>
            <div className='tracker__icon'>
              <img src={icon_dream} alt='dream' />
            </div>
            <div className='tracker__sub-text-icon small-text'>
              Здоровый сон
            </div>
            <div className='tracker__title title-35'>
              Во сколько вы просыпаетесь?
            </div>

            <div className='tracker__clocks'>
              <div className='tracker__clocks-item'>
                <ScrollPicker
                  onChange={changeHour}
                  items={itemsHour}
                  value={hour}
                  totalHeight={77}
                  size={1}
                  customClassname={'clock'}
                  fontSize={44}
                />
              </div>
              <div className={''}>:</div>
              <div className='tracker__clocks-item'>
                <ScrollPicker
                  onChange={changeMinutes}
                  items={itemsMinutes}
                  value={minutes}
                  size={1}
                  totalHeight={77}
                  fontSize={44}
                  customClassname={'clock'}
                />
              </div>
            </div>

            <div className='tracker__recommendation small-text'>
              Оптимальное время засыпания:{' '}
              <span className='text-blue'>
                {(+hour - 8 < 0 ? 24 + (+hour - 8) : +hour - 8).toString().padStart(2, '0')} :{minutes.padStart(2, '0')}
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='tracker__body'>
            <div className='tracker__icon'>
              <img src={icon_water} alt='dream' />
            </div>
            <div className='tracker__sub-text-icon small-text'>
              Водный баланс
            </div>
            <div className='tracker__title title-35'>Ваш текущий вес</div>
            <div className='tracker__weight'>
              <ScrollPicker
                onChange={changeWeight}
                items={itemsWeight}
                value={weightUser}
              />
            </div>
            <div className='tracker__recommendation small-text'>
              Количество воды в день:{' '}
              <span className='text-blue'>
                {((+weightUser * 35) / 1000).toFixed(1)} литра
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='tracker__body'>
            <div className='tracker__icon'>
              <img src={icon_fruit} alt='dream' />
            </div>
            <div className='tracker__sub-text-icon small-text'>
              Фрукты и овощи
            </div>
            <div className='tracker__title title-35'>Фрукты и овощи</div>
            <div className='tracker__clocks digits'>
              <div onClick={decreaseCountFruits}>-</div>
              <div className='digits__square'>
                {countFruits >= 10 ? countFruits : '0' + countFruits}
              </div>
              <div onClick={addCountFruits}>+</div>
            </div>
            <div className='tracker__recommendation small-text'>
              Количество фруктов в день{' '}
              <span className='text-blue'>5 оптимально</span>
            </div>
          </div>
          {/* <div
              className={'preview__button _button-dark'}
              onClick={setVisitedTrackerPageHandler}
            >
              Дальше
            </div> */}
        </SwiperSlide>
        <SlideNextButton
          customClass={'preview__button _button-dark'}
          fruits={JSON.stringify(countFruits)}
          wake_up_time={hour.padStart(2, '0') + ':' + minutes.padStart(2, '0')}
          weight={weightUser}
        />
        <div className={'circle-gradient circle-gradient_green'} />
      </Swiper>
    </div>
  )
}

interface ISwiperNextButton {
  customClass: string
  weight: string
  fruits: string
  wake_up_time: string
}

const SlideNextButton: FC<ISwiperNextButton> = ({
  customClass,
  fruits,
  wake_up_time,
  weight
}) => {
  const swiper = useSwiper()

  const dispatch = useAppDispatch()

  const next = async () => {
    switch (swiper.activeIndex) {
      case 3:
        console.log(wake_up_time);        
        const formData = new FormData()
        formData.append('wake_up_time', wake_up_time)
        formData.append('weight', weight)
        formData.append('fruits', fruits)
        await TrackerService.creatingTracker(formData)
        dispatch(setVisitedTrackerPage(1))
        break
      default:
        break
    }
    swiper.slideNext()
  }

  return (
    <button className={customClass} onClick={next}>
      Дальше
    </button>
  )
}
