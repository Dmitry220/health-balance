import React, {FC, useEffect, useRef, useState} from 'react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import {Steps} from "../../Components/Steps/Steps";
import {INavigation, IRoutesNavigation, Navigation} from "../../Components/Navigation/Navigation";
import './activity-page.scss'
import {StepsData} from "../../Components/Steps-data/Steps-data";
import {CardActual} from "../../Components/Card-actual/Card-actual";
import image from '../../assets/image/lecture/lecture_img.jpg'
import HeaderActive from "../../Components/Header-active/Header-active";
import {Target} from "../../Components/Target/Target";
import {TabContent, Tabs} from "../../Components/Tabs/Tabs";
import {TopRating} from "../../Components/Top-rating/Top-rating";
import {ImportantBlock} from "../../Components/Important-block/Important-block";
import {Bar} from 'react-chartjs-2';
import {getGradient, optionsChartBar} from "../../Components/Charts/Chart-options";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Banner} from "../../Components/Banner/Banner";
import {
    ACTIVITY_ROUTE,
    CHALLENGE_ROUTE,
    HEALTH_INDEX_ROUTE,
    INTERESTING_ROUTE,
    TRACKER_ROUTE
} from "../../provider/constants-route";
import {routesNavigation} from "../../utils/globalConstants";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const ActivityPage: FC = () => {

    console.log('main')
    const itemCardActuals = [
        {
            id: 1,
            title: 'Как начать сегодня!',
            type: 'Мотивация',
            image: image
        },
        {
            id: 2,
            title: 'Что нас объединяет?',
            type: 'Интересное',
            image: 'https://w-dog.ru/wallpapers/3/19/345083118206129/sportsmenka-devushka-begovaya-dorozhka.jpg'
        },
        {
            id: 3,
            title: 'Ежемесячный забег поддержки',
            type: 'Челлендж',
            image: image
        },
        {
            id: 4,
            title: 'Что нас объединяет?',
            type: 'Интересное',
            image: image
        },
        {
            id: 5,
            title: 'Ежемесячный забег поддержки',
            type: 'Челлендж',
            image: 'https://w-dog.ru/wallpapers/3/19/345083118206129/sportsmenka-devushka-begovaya-dorozhka.jpg'
        }
    ]
    const namesTabsDynamics = ['Дни', 'Недели', 'Месяцы']
    const [currentValueTab, setCurrentValueTab] = useState<number>(0)
    const [transparentHeader, setTransparentHeader] = useState<boolean>(true)
    const labels = [
        {
            day: "Пн",
            value: 1500
        },
        {
            day: "Вт",
            value: 5000
        },
        {
            day: "Cр",
            value: 7000
        },
        {
            day: "Чт",
            value: 10000
        },
        {
            day: "Пь",
            value: 7000
        },
        {
            day: "Сб",
            value: 7000
        },
        {
            day: "Вс",
            value: 100
        }
    ];
    const dataDay = {
        labels: labels.map((item) => item.day),
        datasets: [
            {
                data: labels.map((item) => item.value),
                //backgroundColor: '#F2994A',
                backgroundColor: function (context: any) {
                    const chart = context.chart
                    const {ctx, chartArea} = chart
                    if (!chartArea) return null

                    return getGradient(ctx, chartArea, '#F2994A', '#F4C119')
                },
                borderRadius: 5
            },
        ],
    };
    const dataWeek = {
        labels: labels.map((item) => item.day),
        datasets: [
            {
                data: labels.map((item) => item.value),
                //backgroundColor: '#F2994A',
                backgroundColor: function (context: any) {
                    const chart = context.chart
                    const {ctx, chartArea} = chart
                    if (!chartArea) return null

                    return getGradient(ctx, chartArea, '#56CCF2', '#CCE0F7')
                },
                borderRadius: 5
            },
        ],
    };
    const dataMonth = {
        labels: labels.map((item) => item.day),
        datasets: [
            {
                data: labels.map((item) => item.value),
                //backgroundColor: '#F2994A',
                backgroundColor: function (context: any) {
                    const chart = context.chart
                    const {ctx, chartArea} = chart
                    if (!chartArea) return null

                    return getGradient(ctx, chartArea, '#56CCF2', '#CCE0F7')
                },
                borderRadius: 5
            },
        ],
    };

    useEffect(() => {
        window.addEventListener("scroll", function () {
            let scroll = window.pageYOffset;
            let step: any = document.querySelector("#step");
            step.style.transform =
                "translate3d(0," +
                scroll / 5 +
                "%,0) scale(" +
                (1 - scroll / 250) + ")";
            if (scroll >= 200) {
                step.style.transform =
                    "translate3d(0, 42.2222%,0) scale(0.24)";
                setTransparentHeader(false)
            }
                else{
                setTransparentHeader(true)
            }
        });

    }, [])

    return (
        <div className={'activity-page'}>

            <HeaderActive transparent={transparentHeader}/>
            <Navigation routes={routesNavigation}/>
            <div className="activity-page__steps" id={'step'} style={{backgroundAttachment: 'fixed'}}>
                <Steps maxStepsCount={1000} userStepsCount={500}/>
            </div>
            <div className="activity-page__steps-data">
                <StepsData/>
            </div>
            <div className="activity-page__card-actual">
                {
                    itemCardActuals.map(item => <CardActual key={item.id} title={item.title} path={item.title}
                                                            image={item.image} type={item.type}/>)
                }
            </div>
            <div className="activity-page__title title">Статистика</div>
            <div className="activity-page__target">
                <Target/>
            </div>
            <div className="activity-page__dynamics dynamics">
                <div className="dynamics__title">Динамика</div>
                <Tabs labels={namesTabsDynamics} onClick={setCurrentValueTab} value={currentValueTab}/>
                <TabContent index={0} value={currentValueTab}>
                    <div className="dynamics__chart">
                        <Bar options={optionsChartBar} data={dataDay}/>
                    </div>
                    <div className={'dynamics__info'}>
                        <div className="dynamics__value">10 758 <br/> <span>шагов</span></div>
                        <div className="dynamics__value">8,6 <br/> <span>км</span></div>
                        <div className="dynamics__value">100% <br/> <span>от цели</span></div>
                    </div>
                </TabContent>
                <TabContent index={1} value={currentValueTab}>
                    <div className="dynamics__chart">
                        <Bar options={optionsChartBar} data={dataWeek}/>
                    </div>
                    <div className={'dynamics__info'}>
                        <div className="dynamics__value">10 758 <br/> <span>шагов</span></div>
                        <div className="dynamics__value">8,6 <br/> <span>км</span></div>
                        <div className="dynamics__value">100% <br/> <span>от цели</span></div>
                    </div>
                </TabContent>
                <TabContent index={2} value={currentValueTab}>
                    <div className="dynamics__chart">
                        <Bar options={optionsChartBar} data={dataMonth}/>
                    </div>
                    <div className={'dynamics__info'}>
                        <div className="dynamics__value">10 758 <br/> <span>шагов</span></div>
                        <div className="dynamics__value">8,6 <br/> <span>км</span></div>
                        <div className="dynamics__value">100% <br/> <span>от цели</span></div>
                    </div>

                </TabContent>
            </div>
            <div className="activity-page__important">
                <ImportantBlock/>
                <Banner title={'Стартовый опрос'} text={'Ответьте на 4 вопроса'}/>
            </div>

            <div className="activity-page__top-rating top-rating">
                <div className="top-rating__title title">Топ рейтинг</div>
                <TopRating/>
            </div>
            <div className="circle-gradient circle-gradient_top" />
        </div>
    );
};
