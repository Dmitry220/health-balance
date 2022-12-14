import { FC, useEffect, useState } from 'react'
import { Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import './challenge.scss'
import 'rmc-picker/assets/index.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { setVisitedActivityPage, setVisitedChallengePage } from '../../Redux/slice/visitedPageSlice'
import { setPurposeSteps } from '../../Redux/slice/purposeSlice'
import inst0 from '../../assets/image/instruction-challenges/Инструкция челленджи 0.png'
import inst1 from '../../assets/image/instruction-challenges/Инструкция челленджи 1.png'
import inst2 from '../../assets/image/instruction-challenges/Инструкция челленджи 2.png'
import inst3 from '../../assets/image/instruction-challenges/Инструкция челленджи 3.png'
import inst4 from '../../assets/image/instruction-challenges/Инструкция челленджи 4.png'
import inst5 from '../../assets/image/instruction-challenges/Инструкция челленджи 5.png'
import inst6 from '../../assets/image/instruction-challenges/Инструкция челленджи 6.png'
import inst7 from '../../assets/image/instruction-challenges/Инструкция челленджи 7.png'
import inst8 from '../../assets/image/instruction-challenges/Инструкция челленджи 8.png'
import inst9 from '../../assets/image/instruction-challenges/Инструкция челленджи 9.png'
import inst10 from '../../assets/image/instruction-challenges/Инструкция челленджи 10.png'
import inst11 from '../../assets/image/instruction-challenges/Инструкция челленджи 11.png'
import inst12 from '../../assets/image/instruction-challenges/Инструкция челленджи 12.png'
import inst13 from '../../assets/image/instruction-challenges/Инструкция челленджи 13.png'
import inst14 from '../../assets/image/instruction-challenges/Инструкция челленджи 14.png'
import inst15 from '../../assets/image/instruction-challenges/Инструкция челленджи 15.png'
import inst16 from '../../assets/image/instruction-challenges/Инструкция челленджи 16.png'
import inst17 from '../../assets/image/instruction-challenges/Инструкция челленджи 17.png'


interface ISwiperNextButton {
	customClass: string
}

export const InstructionsChallenge = () => {

	// function importAll(r:any) {
	// 	return r.keys().map(r);
	//  }
	//  //@ts-ignore
	//  const images = importAll(require.context('../../assets/image/instruction-challenges/a', false, /\.(png|jpe?g|svg)$/));
	//  console.log(images);
	 
	return (
		<div className='challenge-instruction'>
			<Swiper
				modules={[Pagination, A11y]}
				slidesPerView={1}
				pagination={{ clickable: true }}
				spaceBetween={50}
				className={'challenge-instruction__swiper'}
			>
				<div className='challenge-instruction__title main-title'>Инструкция к челленджам</div>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst0} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst1} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst2} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst3} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst4} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst5} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst6} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst7} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst8} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst9} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst10} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst11} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst12} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst13} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst14} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst15} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst16} alt="" />
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="challenge-instruction__image">
						<img src={inst17} alt="" />
					</div>
				</SwiperSlide>
				<div className={'circle-gradient'} />
				<SlideNextButton customClass={'preview__button _button-dark'} />
			</Swiper>
		</div>
	)
}

export const SlideNextButton: FC<ISwiperNextButton> = ({
	customClass,
}) => {
	const swiper = useSwiper()
	const [title, setTitle] = useState<string>('Дальше!')
	const dispatch = useAppDispatch()

	swiper.on('slideChange', function () {
		switch (swiper.activeIndex) {
			case 17:
				setTitle('Вперед!')
				break
			default:
				setTitle('Дальше!')
				break
		}
	})

	const next = async () => {
		if (swiper.activeIndex === 17) {
			dispatch(setVisitedChallengePage(1))

		}
		swiper.slideNext()
	}

	return (
		<button className={customClass} onClick={next}>
			{title}
		</button>
	)
}
