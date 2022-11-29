import React, {FC, useState} from 'react';
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide, useSwiper, useSwiperSlide} from 'swiper/react';
import 'rmc-picker/assets/index.css';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import './start-page.scss'
import {Link, useNavigate} from "react-router-dom";
import {Steps} from "../../Components/Steps/Steps";
import {Target} from "../../Components/Target/Target";
import {StepsData} from "../../Components/Steps-data/Steps-data";
import iconChat from '../../assets/image/icon_chat.svg'
import {ScrollPicker} from "../../Components/Scroll-picker/Scroll-picker";
import {ACTIVITY_ROUTE} from "../../provider/constants-route";
import { getItemsStep } from '../../utils/common-functions';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks';
import { setPurposeSteps } from '../../Redux/slice/appSlice';
import { dataUserSelector } from '../../Redux/slice/profileSlice';
import { setVisitedActivityPage } from '../../Redux/slice/visitedPageSlice';




interface ISwiperNextButton {
    title: string,
    customClass: string
}


export const StartPage = () => {

    const starValueStep = 0
    const endValueStep = 20000

    const dispatch = useAppDispatch()

    const itemSteps = getItemsStep(starValueStep, endValueStep)
    const [stepValue, setStepValue] = useState<string>((starValueStep+endValueStep)/2+'')
    const dataUser = useAppSelector(dataUserSelector)
    const changeStep = (value: string) => setStepValue(value)

    const jumpToMain = async () => {
        const quantity = stepValue
        const type = 1
        //await dispatch(setPurposeSteps({quantity,type})) 
        dispatch(setVisitedActivityPage(1))  
    } 

    return (
        <div className="preview">
            <Swiper
                modules={[Pagination, A11y]}
                className={'preview__swiper'}
                slidesPerView={1}
                pagination={{clickable: true}}
                spaceBetween={50}
            >

                <SwiperSlide>
                    <div className="preview__body">
                        <div className="preview__title">Здравствуйте, <br/> {dataUser.name}!</div>
                        <div className="preview__text">Это приложение созданно для тех кто хочет большего! Вы с нами?
                        </div>
                    </div>
                    <SlideNextButton title={'Я в деле!'} customClass={'preview__button _button-dark'}/>
                    <div className={'circle-gradient'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="preview__body">
                        <div className="preview__title preview__title_above-92">Просто!</div>
                        <div className="preview__text">
                            Поднять свою активность просто!
                            Ставьте комфортную ежедневную цель. Больше активности - больше награда
                        </div>
                        <div className={'preview__scroll-picker-steps'}>
                            <ScrollPicker items={itemSteps} value={stepValue} onChange={changeStep}/>                           
                        </div>                        
                        <div className="preview__text small">
                            Можно изменить в любой момент
                        </div>
                    </div>
                    <SlideNextButton title={'Просто!'} customClass={'preview__button _button-dark'}/>
                    <div className={'circle-gradient'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="preview__body">
                        <div className="preview__title">Вместе!</div>
                        <div className="preview__text">
                            Учавствуйте во всероссийских челленджах. Объединяйтесь с коллегами, занимайте почетные
                            места!
                        </div>
                    </div>
                    <SlideNextButton title={'Дальше'} customClass={'preview__button _button-dark'}/>
                    <div className={'circle-gradient'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="preview__body">
                        <div className="preview__title preview__title_above-75">Следите</div>
                        <div className="preview__sub-title">За текущими шагами</div>
                        <div className="preview__steps">
                            <Steps maxStepsCount={10000} userStepsCount={0}/>
                        </div>
                        <div className="preview__steps-data">
                            <StepsData/>
                        </div>
                        <div className="preview__sub-title">Выполнением цели</div>
                        <div className="preview__target">
                            <Target/>
                        </div>
                    </div>
                    <SlideNextButton title={'Дальше'} customClass={'preview__button _button-dark'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="preview__body">
                        <div className="preview__title">Вопросы?</div>
                        <div className="preview__text" style={{marginBottom: 11}}>По любым вопросам пишите нам в чат
                        </div>
                        <div className="preview__text">Это чат <img src={iconChat} alt=""/></div>
                        <div className={'preview__button _button-dark'} onClick={jumpToMain}>Дальше</div>
                        <div className={'circle-gradient'}/>
                    </div>
                </SwiperSlide>
            </Swiper>

        </div>
    );
};


export const SlideNextButton: FC<ISwiperNextButton> = ({title, customClass}) => {   

    const swiper = useSwiper();

    return (
        <button className={customClass} onClick={()=>  swiper.slideNext()}>{title}</button>
    );
}

