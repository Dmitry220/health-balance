import React, {useState} from 'react';
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide, useSwiper, useSwiperSlide} from 'swiper/react';
import {ScrollPicker} from "../../Components/Scroll-picker/Scroll-picker";
import {Steps} from "../../Components/Steps/Steps";
import {StepsData} from "../../Components/Steps-data/Steps-data";
import {Target} from "../../Components/Target/Target";
import iconChat from "../../assets/image/icon_chat.svg";
import {Link} from "react-router-dom";
import {ACTIVITY_ROUTE, TRACKER_HABITS_ROUTE} from "../../provider/constants";
import {SlideNextButton} from "../Start-pages/StartPage";
import icon_dream from '../../assets/image/tracker/icon-dream.svg'
import icon_fruit from '../../assets/image/tracker/icon-fruit.svg'
import icon_water from '../../assets/image/tracker/icon-water.svg'
import './tracker.scss'
import {getItemsStep, getItemsWeight} from "../../utils/common-functions";


export const TrackerPage = () => {

    const startValueWeight = 0
    const endValueWeight = 100

    const itemsWeight = getItemsWeight(startValueWeight, endValueWeight, 'кг')
    const [weightUser, setWeightUser] = useState<string>((startValueWeight+endValueWeight)/2+'')
    const [countFruits, setCountFruits] = useState<number>(0)

    const changeWeight = (value: string) => setWeightUser(value)
    const addCountFruits = () => setCountFruits((prev)=>prev+1)
    const decreaseCountFruits = () => {
        if(countFruits >0) {
            setCountFruits((prev) => prev - 1)
        }
    }

    return (
        <div className={'tracker'}>
            <Swiper
                modules={[Pagination, A11y]}
                className={'preview__swiper'}
                slidesPerView={1}
                pagination={{clickable: true}}
                spaceBetween={50}
            >

                <SwiperSlide>
                    <div className="tracker__body">
                        <div className="tracker__title tracker__title_start title-35">Это трекер <br/> полезных превычек</div>
                        <div className="tracker__text">Здесь мы будем приучаться хорошо спать, правильно пить воду и есть фрукты/овощи
                        </div>
                    </div>
                    <SlideNextButton title={'Дальше'} customClass={'tracker__button _button-dark'}/>
                    <div className={'circle-gradient circle-gradient_green'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tracker__body">
                        <div className="tracker__icon">
                            <img src={icon_dream} alt="dream"/>
                        </div>
                        <div className="tracker__sub-text-icon small-text">Здоровый сон</div>
                        <div className="tracker__title title-35">Во сколько вы просыпаетесь?</div>
                        <div className="tracker__clocks digits">
                            <div className="digits__square">
                                06
                            </div>
                            <div>:</div>
                            <div className="digits__square">
                                30
                            </div>
                        </div>
                        <div className="tracker__recommendation small-text">Оптимальное время засыпания: <span className='text-blue'>22:30</span></div>
                    </div>
                    <SlideNextButton title={'Дальше!'} customClass={'tracker__button _button-dark'}/>
                    <div className={'circle-gradient circle-gradient_green'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tracker__body">
                        <div className="tracker__icon">
                            <img src={icon_water} alt="dream"/>
                        </div>
                        <div className="tracker__sub-text-icon small-text">Водный баланс</div>
                        <div className="tracker__title title-35">Ваш текущий вес</div>
                        <div className="tracker__weight">
                            <ScrollPicker onChange={changeWeight} items={itemsWeight} value={weightUser} />
                        </div>
                        <div className="tracker__recommendation small-text">Количество воды в день: <span className='text-blue'>2,1 литра</span></div>
                    </div>
                    <SlideNextButton title={'Дальше'} customClass={'preview__button _button-dark'}/>
                    <div className={'circle-gradient circle-gradient_green'}/>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="tracker__body">
                        <div className="tracker__icon">
                            <img src={icon_fruit} alt="dream"/>
                        </div>
                        <div className="tracker__sub-text-icon small-text">Фрукты и овощи</div>
                        <div className="tracker__title title-35">Фрукты и овощи</div>
                        <div className="tracker__clocks digits">
                            <div onClick={decreaseCountFruits}>-</div>
                            <div className="digits__square">
                                {countFruits >=10 ? countFruits : '0'+countFruits}
                            </div>
                            <div onClick={addCountFruits}>+</div>
                        </div>
                        <div className="tracker__recommendation small-text">Количество фруктов в день <span className='text-blue'>5 оптимально</span></div>
                    </div>
                    <Link to={TRACKER_HABITS_ROUTE} className={'preview__button _button-dark'}>Дальше</Link>
                    <div className={'circle-gradient circle-gradient_green'}/>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

