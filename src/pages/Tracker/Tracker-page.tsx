import { useState } from 'react'
import { Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ScrollPicker } from '../../Components/Scroll-picker/Scroll-picker'
import { Link } from 'react-router-dom'
import { TRACKER_HABITS_ROUTE } from '../../provider/constants-route'
import { SlideNextButton } from '../Start-pages/StartPage'
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
  setVisitedTrackerPage,
  trackerVisitSelector
} from '../../Redux/slice/visitedPageSlice'

export const TrackerPage = () => {
  const visitCount = useAppSelector(trackerVisitSelector)
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

  const setVisitedTrackerPageHandler = () => {
    if (visitCount === 0) {
      dispatch(setVisitedTrackerPage(visitCount + 1))
    }
  }

  return (
    <div className={'tracker'}>
      {visitCount === 0 ? (
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
                Здесь мы будем приучаться хорошо спать, правильно пить воду и
                есть фрукты/овощи
              </div>
            </div>
            <SlideNextButton
              title={'Дальше'}
              customClass={'tracker__button _button-dark'}
            />
            <div className={'circle-gradient circle-gradient_green'} />
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
                <span className='text-blue'>22:30</span>
              </div>
            </div>
            <SlideNextButton
              title={'Дальше!'}
              customClass={'tracker__button _button-dark'}
            />
            <div className={'circle-gradient circle-gradient_green'} />
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
                <span className='text-blue'>2,1 литра</span>
              </div>
            </div>
            <SlideNextButton
              title={'Дальше'}
              customClass={'preview__button _button-dark'}
            />
            <div className={'circle-gradient circle-gradient_green'} />
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
            <div
              className={'preview__button _button-dark'}
              onClick={setVisitedTrackerPageHandler}
            >
              Дальше
            </div>
            <div className={'circle-gradient circle-gradient_green'} />
          </SwiperSlide>
        </Swiper>
      ) : (
        <TrackerHabitsPage />
      )}
    </div>
  )
}
