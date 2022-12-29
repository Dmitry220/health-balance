import { FC, useEffect, useState } from 'react'
import { Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import 'rmc-picker/assets/index.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { setVisitedActivityPage } from '../../Redux/slice/visitedPageSlice'
import { setPurposeSteps } from '../../Redux/slice/purposeSlice'


interface ISwiperNextButton {
	customClass: string
	quantity: string
}

export const InstructionsChallenge = () => {

	const importAll = (r: any) => {
		let images: any = {};
		r.keys().map((item: any) => { images[item.replace('./', '')] = r(item); });
		return images;
	}
	//@ts-ignore
	const images: any = importAll(require.context('../../assets/image/instruction-challenges', false, /\.(png|jpe?g|svg)$/));
	const [labels,setLabels] = useState<any[]>([])
	// console.log(images);

	useEffect(()=>{
		for (const key in images) {
			console.log(key);
			
			setLabels(prev=>[...prev, images[key]])
				
			
		}
	}, [])
	
console.log(labels);

	return (
		<div className='preview'>
			<Swiper
				slidesPerView={1}
				spaceBetween={50}
			>

				{
					Object.values(images).map((path: any) => (
						<SwiperSlide>

							<img src={path} alt="" style={{height: '100vh',margin: -16}}/>

						</SwiperSlide>
					))
				}
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
			await dispatch(setPurposeSteps({ quantity, type }))
		}
		swiper.slideNext()
	}

	return (
		<button className={customClass} onClick={next}>
			{title}
		</button>
	)
}
