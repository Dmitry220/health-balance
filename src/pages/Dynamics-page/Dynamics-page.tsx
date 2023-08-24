import './dynamics-page.scss'
import {CardIndex} from '../../Components/Health-index-result/Card-index'
import Header from '../../Components/Header/Header'
import {useAppSelector} from '../../hooks/redux-hooks'
import {dynamicsSelector} from '../../Redux/slice/healthIndexSlice'
import {Bar} from 'react-chartjs-2'
import {getGradient, optionsChartBar} from '../../Components/Charts/Chart-options'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination} from 'swiper'
import {KeysDynamics} from "../../models/IHealthIndex";
import {months, monthsABBR} from '../../utils/globalConstants'

export const DynamicsPage = () => {

    const dynamics = useAppSelector(dynamicsSelector)
    const lastDynamic = dynamics[dynamics.length - 1]
    let titlesIndex = Object.keys(dynamics[0]).filter(
        (item) => item !== 'id' && item !== 'date' && item !== 'poll_id'
    )

    let translateIndex: { [key in KeysDynamics]?: string } = {
        biological_age: 'Биологический возраст',
        body_mass_index: 'Индекс массы тела',
        physical_activity: 'Физическая активность',
        nutrition_risk: 'Правильное питание',
        cholesterol_risk: 'Холестерин',
        alcohol_risk: 'Алколизм',
        depression_risk: 'Депрессия',
        stress_risk: 'Стресс',
        oncology_risk: 'Онкология',
        chronic_risk: 'Хронические заболевания',
        cardio_risk: 'Кардио риск',
        diabetes_risk: 'Диабет',
        burnout_risk: 'Уровень выгорания',
        presenteism: 'Презентизм',
        glucose_risk: 'Уровень глюкозы в крови'
    }

    const monthOfLastPassage = ` ${months[new Date(lastDynamic.date * 1000).getMonth()]} 
        ${new Date(lastDynamic.date * 1000).getFullYear()}`

    const getValueIndex = (param: KeysDynamics) => dynamics[dynamics.length - 1][param]

    const displayGraph = (param: KeysDynamics) => {
        const labelMonths = dynamics.map((item) => monthsABBR[new Date(item.date * 1000).getMonth()])
        return {
            labels: labelMonths,
            datasets: [
                {
                    data: dynamics.map((item) => item[param]),
                    //backgroundColor: '#F2994A',
                    backgroundColor: function (context: any) {
                        const chart = context.chart
                        const {ctx, chartArea} = chart
                        if (!chartArea) return null

                        return getGradient(ctx, chartArea, '#00A62E', '#3CF470')
                    },
                    borderRadius: 5
                }
            ]
        }
    }

    const indicators = [
        {
            title: 'Уровень глюкозы в крови',
            value: lastDynamic?.glucose_risk,
            criticalValue: 3,
            averageValue: 2,
            tag: 'glucose_risk'
        },
        {
            title: 'Индекс массы тела',
            value: lastDynamic?.body_mass_index,
            criticalValue: 30,
            averageValue: 16,
            tag: 'body_mass_index'
        },
        {
            title: 'Физическая активность',
            value: lastDynamic?.physical_activity,
            criticalValue: 1,
            averageValue: 2,
            tag: 'physical_activity'
        },
        {
            title: 'Правильное питание',
            value: lastDynamic?.nutrition_risk,
            criticalValue: 3,
            averageValue: 2,
            tag: 'nutrition_risk'
        },
    ]

    return (
        <div className={'dynamics-page'}>
            <Header title={'Динамика'}/>
            <div className='dynamics-page__title title-17'>Показатели вне нормы</div>
            <div className='dynamics-page__index'>
                {
                    indicators.map((item,index) => {
                        const condition = item.tag != 'body_mass_index' ?
                            item.value === item.averageValue || item.value === item.criticalValue :
                            item.value > item.criticalValue || item.value < item.averageValue
                        if (condition) {
                            return <div className='dynamics-page__index-item' key={index}>
                                <CardIndex
                                    title={item.title}
                                    value={item.value}
                                    tag={item.tag}/>
                            </div>
                        }
                        return
                    })
                }
            </div>
            <div className='dynamics-page__main-title main-title'>Динамика</div>
            <Swiper
                spaceBetween={16}
                slidesPerView={1.1}
                pagination={{
                    clickable: true,
                    bulletClass: 'dynamic-bullet',
                    bulletActiveClass: 'dynamic-bullet_active',
                    modifierClass: 'mod'
                }}
                modules={[Pagination]}
            >
                {titlesIndex.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className='dynamics-index'>
                            <div className='dynamics-index__chart'>
                                <h3>
                                    {translateIndex[item as KeysDynamics]}
                                </h3>
                                <Bar options={optionsChartBar} data={displayGraph(item as KeysDynamics)}/>
                            </div>
                            <div className={'dynamics-index__info'}>
                                <div className='dynamics-index__value'>
                                    {getValueIndex(item as KeysDynamics)}
                                </div>
                                <div className='dynamics-index__text'>
                                    Показатель на
                                    <span>
                    {monthOfLastPassage}
                  </span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
