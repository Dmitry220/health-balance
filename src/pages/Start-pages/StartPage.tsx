import { FC, useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from 'swiper/react'
import 'rmc-picker/assets/index.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import './start-page.scss'
import { Steps } from '../../Components/Steps/Steps'
import { Target } from '../../Components/Target/Target'
import { StepsData } from '../../Components/Steps-data/Steps-data'
import iconChat from '../../assets/image/icon_chat.svg'
import { ScrollPicker } from '../../Components/Scroll-picker/Scroll-picker'
import { ACTIVITY_ROUTE } from '../../provider/constants-route'
import { getItemsStep } from '../../utils/common-functions'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import { setVisitedActivityPage } from '../../Redux/slice/visitedPageSlice'
import { setPurposeSteps } from '../../Redux/slice/purposeSlice'

interface ISwiperNextButton {
  title: string,
  customClass: string,
  jumpToMain?: any
}

export const StartPage = () => {
  const starValueStep = 0
  const endValueStep = 20000

  const dispatch = useAppDispatch()

  const itemSteps = getItemsStep(starValueStep, endValueStep)
  const [stepValue, setStepValue] = useState<string>(
    (starValueStep + endValueStep) / 2 + ''
  )
  const dataUser = useAppSelector(dataUserSelector)
  const changeStep = (value: string) => setStepValue(value)
  const titles = ['Я в деле!', 'Просто', 'Дальше']

  const jumpToMain = async () => {
    const quantity = stepValue
    const type = 1
    console.log(type, quantity);

    //await dispatch(setPurposeSteps({ quantity, type }))
    //dispatch(setVisitedActivityPage(1))
  }

  console.log('dsasd');


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
              Здравствуйте, <br /> {dataUser.name}!
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
            <div className='preview__target'>
              <Target />
            </div>
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
          title={'Дальше'}
          customClass={'preview__button _button-dark'}
        />
      </Swiper>
    </div>
  )
}

export const SlideNextButton: FC<ISwiperNextButton> = ({
  customClass, jumpToMain
}) => {
  const swiper = useSwiper()
  const [title, setTitle] = useState<string>('Я в деле!')

  const next = () => {
    swiper.slideNext()
    switch (swiper.activeIndex) {
      case 1:
        setTitle('Просто!')
        break;
      case 2:
        setTitle('Дальше')
        break;
      case 3:
        setTitle('Дальше')
        break;
      case 4:
        setTitle('Дальше!')
       
        break
      case 5:
        setTitle('Дальше!!!!!!')
        break;
      default:
        break;
    }
  }


  return (
    <button className={customClass} onClick={next}>
      {title}
    </button>
  )
}
