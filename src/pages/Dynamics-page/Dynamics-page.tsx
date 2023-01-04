import './dynamics-page.scss'
import { CardIndex } from '../../Components/Health-index-result/Card-index'
import Header from '../../Components/Header/Header'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import { dynamicsSelector } from '../../Redux/slice/healthIndexSlice'
import { Bar } from 'react-chartjs-2'
import { optionsChartBar, getGradient } from '../../Components/Charts/Chart-options'
import { SwiperSlide, Swiper } from 'swiper/react'
import { useEffect, useState } from 'react'
import { IDynamics } from '../../models/IHealthIndex'
import { Pagination } from 'swiper'

export const DynamicsPage = () => {

  const dynamics = useAppSelector(dynamicsSelector)
  const lastDynamic = dynamics[dynamics.length - 1]
  let titlesIndex = Object.keys(dynamics[0]).filter(item => item != 'id' && item != 'date' && item != 'poll_id')
  let months=[
       'Январь',
       'Февраль',
       'Март',
       'Апрель',
       'Май',
       'Июнь',
       'Июль',
       'Август',
       'Сентябрь',
       'Октябрь',
       'Ноябрь',
       'Декабрь',
    ];
    
  let translateIndex = {
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
    glucose_risk: 'Уровень глюкозы в крови',
  }

  const [indexCurrentMonth, setIndexCurrentMonth] = useState<number[]>([])

  const [labels, setLabels] = useState([
    {
      id: 1,
      month: 'Янв',
      biological_age: 0,
      body_mass_index: 0,
      physical_activity: 0,
      nutrition_risk: 0,
      cholesterol_risk: 0,
      alcohol_risk: 0,
      depression_risk: 0,
      stress_risk: 0,
      oncology_risk: 0,
      chronic_risk: 0,
      cardio_risk: 0,
      diabetes_risk: 0,
      burnout_risk: 0,
      presenteism: 0,
      glucose_risk: 0,
    },
    {
      id: 2,
      month: 'Фев',
      biological_age: 0,
      body_mass_index: 0,
      physical_activity: 0,
      nutrition_risk: 0,
      cholesterol_risk: 0,
      alcohol_risk: 0,
      depression_risk: 0,
      stress_risk: 0,
      oncology_risk: 0,
      chronic_risk: 0,
      cardio_risk: 0,
      diabetes_risk: 0,
      burnout_risk: 0,
      presenteism: 0,
      glucose_risk: 0,
    },
    {
      id: 3,
      month: 'Мар',
      biological_age: 0,
      body_mass_index: 0,
      physical_activity: 0,
      nutrition_risk: 0,
      cholesterol_risk: 0,
      alcohol_risk: 0,
      depression_risk: 0,
      stress_risk: 0,
      oncology_risk: 0,
      chronic_risk: 0,
      cardio_risk: 0,
      diabetes_risk: 0,
      burnout_risk: 0,
      presenteism: 0,
      glucose_risk: 0,
    },
    {
      id: 4,
      month: 'Апр',
      biological_age: 0,
      body_mass_index: 0,
      physical_activity: 0,
      nutrition_risk: 0,
      cholesterol_risk: 0,
      alcohol_risk: 0,
      depression_risk: 0,
      stress_risk: 0,
      oncology_risk: 0,
      chronic_risk: 0,
      cardio_risk: 0,
      diabetes_risk: 0,
      burnout_risk: 0,
      presenteism: 0,
      glucose_risk: 0,
    },
    {
      id: 5,
      month: 'Май',
      biological_age: 0,
      body_mass_index: 0,
      physical_activity: 0,
      nutrition_risk: 0,
      cholesterol_risk: 0,
      alcohol_risk: 0,
      depression_risk: 0,
      stress_risk: 0,
      oncology_risk: 0,
      chronic_risk: 0,
      cardio_risk: 0,
      diabetes_risk: 0,
      burnout_risk: 0,
      presenteism: 0,
      glucose_risk: 0,
    },
    {
      id: 6,
      month: 'Июн',
      biological_age: 0,
      body_mass_index: 0,
      physical_activity: 0,
      nutrition_risk: 0,
      cholesterol_risk: 0,
      alcohol_risk: 0,
      depression_risk: 0,
      stress_risk: 0,
      oncology_risk: 0,
      chronic_risk: 0,
      cardio_risk: 0,
      diabetes_risk: 0,
      burnout_risk: 0,
      presenteism: 0,
      glucose_risk: 0,
    },
    {
      id: 7,
      month: 'Июл',
      biological_age: 0,
      body_mass_index: 0,
      physical_activity: 0,
      nutrition_risk: 0,
      cholesterol_risk: 0,
      alcohol_risk: 0,
      depression_risk: 0,
      stress_risk: 0,
      oncology_risk: 0,
      chronic_risk: 0,
      cardio_risk: 0,
      diabetes_risk: 0,
      burnout_risk: 0,
      presenteism: 0,
      glucose_risk: 0,
    },
    {
      id: 8,
      month: 'Авг',
      biological_age: 0,
      body_mass_index: 0,
      physical_activity: 0,
      nutrition_risk: 0,
      cholesterol_risk: 0,
      alcohol_risk: 0,
      depression_risk: 0,
      stress_risk: 0,
      oncology_risk: 0,
      chronic_risk: 0,
      cardio_risk: 0,
      diabetes_risk: 0,
      burnout_risk: 0,
      presenteism: 0,
      glucose_risk: 0,
    },
    {
      id: 9,
      month: 'Сен',
      biological_age: 0,
      body_mass_index: 0,
      physical_activity: 0,
      nutrition_risk: 0,
      cholesterol_risk: 0,
      alcohol_risk: 0,
      depression_risk: 0,
      stress_risk: 0,
      oncology_risk: 0,
      chronic_risk: 0,
      cardio_risk: 0,
      diabetes_risk: 0,
      burnout_risk: 0,
      presenteism: 0,
      glucose_risk: 0,
    },
    {
      id: 10,
      month: 'Окт',
      biological_age: 0,
      body_mass_index: 0,
      physical_activity: 0,
      nutrition_risk: 0,
      cholesterol_risk: 0,
      alcohol_risk: 0,
      depression_risk: 0,
      stress_risk: 0,
      oncology_risk: 0,
      chronic_risk: 0,
      cardio_risk: 0,
      diabetes_risk: 0,
      burnout_risk: 0,
      presenteism: 0,
      glucose_risk: 0,
    },
    {
      id: 11,
      month: 'Ноя',
      biological_age: 0,
      body_mass_index: 0,
      physical_activity: 0,
      nutrition_risk: 0,
      cholesterol_risk: 0,
      alcohol_risk: 0,
      depression_risk: 0,
      stress_risk: 0,
      oncology_risk: 0,
      chronic_risk: 0,
      cardio_risk: 0,
      diabetes_risk: 0,
      burnout_risk: 0,
      presenteism: 0,
      glucose_risk: 0,
    },
    {
      id: 12,
      month: 'Дек',
      biological_age: 0,
      body_mass_index: 0,
      physical_activity: 0,
      nutrition_risk: 0,
      cholesterol_risk: 0,
      alcohol_risk: 0,
      depression_risk: 0,
      stress_risk: 0,
      oncology_risk: 0,
      chronic_risk: 0,
      cardio_risk: 0,
      diabetes_risk: 0,
      burnout_risk: 0,
      presenteism: 0,
      glucose_risk: 0,
    },
  ])

  useEffect(() => {
    dynamics.forEach((dynamic, dynamicIndex) => {
      setLabels(prev => prev.map((item, i) => {
        i === dynamics.length - 1 && setIndexCurrentMonth(prev => [...prev,
        dynamic.biological_age,
        dynamic.body_mass_index,
        dynamic.physical_activity,
        dynamic.nutrition_risk,
        dynamic.cholesterol_risk,
        dynamic.alcohol_risk,
        dynamic.depression_risk,
        dynamic.stress_risk,
        dynamic.oncology_risk,
        dynamic.cholesterol_risk,
        dynamic.cardio_risk,
        dynamic.diabetes_risk,
        dynamic.burnout_risk,
        dynamic.presenteism,
        dynamic.glucose_risk,
        ])
        if (new Date(dynamic.date * 1000).getMonth() === i) {
          return {
            ...item,
            biological_age: dynamic.biological_age,
            body_mass_index: dynamic.body_mass_index,
            physical_activity: dynamic.physical_activity,
            nutrition_risk: dynamic.nutrition_risk,
            cholesterol_risk: dynamic.cholesterol_risk,
            alcohol_risk: dynamic.alcohol_risk,
            depression_risk: dynamic.depression_risk,
            stress_risk: dynamic.stress_risk,
            oncology_risk: dynamic.oncology_risk,
            chronic_risk: dynamic.cholesterol_risk,
            cardio_risk: dynamic.cardio_risk,
            diabetes_risk: dynamic.diabetes_risk,
            burnout_risk: dynamic.burnout_risk,
            presenteism: dynamic.presenteism,
            glucose_risk: dynamic.glucose_risk,
          }
        } else {
          return item
        }
      }))
    })
  }, [])


  const getValueIndex = (param: any) => {
    return {
      labels: labels.map((item) => item.month),
      datasets: [
        {
          data: labels.map((item: any) => item[param]),
          //backgroundColor: '#F2994A',
          backgroundColor: function (context: any) {
            const chart = context.chart
            const { ctx, chartArea } = chart
            if (!chartArea) return null

            return getGradient(ctx, chartArea, '#00A62E', '#3CF470')
          },
          borderRadius: 5
        }
      ]
    }
  }


  

  return (
    <div className={'dynamics-page'}>
      <Header title={'Динамика'} />
      <div className='dynamics-page__title title-17'>Показатели вне нормы</div>
      <div className='dynamics-page__index'>
        {lastDynamic?.glucose_risk === 3 && <div className='dynamics-page__index-item'>
          {<CardIndex title={'Уровень глюкозы в крови'} value={lastDynamic?.glucose_risk} />}
        </div>}
        {lastDynamic?.body_mass_index > 25 && <div className='dynamics-page__index-item'>
          {<CardIndex title='Индексмассы тела' value={lastDynamic?.body_mass_index} />}
        </div>}
        {lastDynamic?.physical_activity === 3 && <div className='dynamics-page__index-item'>
          {<CardIndex title={'Физическая активность'} value={lastDynamic?.physical_activity} />}
        </div>}
        {lastDynamic?.nutrition_risk === 3 && <div className='dynamics-page__index-item'>
          {<CardIndex title='Правильное питание' value={lastDynamic?.nutrition_risk} />}
        </div>}
      </div>
      <div className='dynamics-page__main-title main-title'>Динамика</div>
      <Swiper
        spaceBetween={16} 
        slidesPerView={1.1}
        pagination={{ clickable: true,bulletClass: 'dynamic-bullet', bulletActiveClass:'dynamic-bullet_active',modifierClass:'mod' }}
        
        modules={[Pagination]}
        >
        {
          titlesIndex.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="dynamics-index">
                     <div className='dynamics-index__chart'>

                <h3>{//@ts-ignore
                  translateIndex[item]}</h3>
                <Bar options={optionsChartBar} data={getValueIndex(item)} />
              </div>
              <div className={'dynamics-index__info'}>
                <div className='dynamics-index__value'>
                  {indexCurrentMonth[i]}
                </div>
                <div className='dynamics-index__text'>
                  Показатель на <span>{months[new Date(lastDynamic.date*1000).getMonth()] + ' ' + new Date(lastDynamic.date*1000).getFullYear()}</span> 
                </div>
              </div>
              </div>
         
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
