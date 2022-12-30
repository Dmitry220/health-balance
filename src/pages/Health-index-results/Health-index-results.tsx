import { CardBiologyAge } from '../../Components/Health-index-result/Card-biology-age'
import { CardDisease } from '../../Components/Health-index-result/Card-Disease'
import { Link } from 'react-router-dom'
import { CardIndex } from '../../Components/Health-index-result/Card-index'
import './health-index-results.scss'
import { Navigation } from '../../Components/Navigation/Navigation'
import { Retesting } from '../../Components/Health-index-result/Retesting'
import {
  DYNAMICS_ROUTE,
  INDIVIDUAL_REPORT_ROUTE
} from '../../provider/constants-route'
import { HeaderTwo } from '../../Components/Header-two/Header-two'
import {
  routesNavigation,
  routesNavigationIndexResult
} from '../../utils/globalConstants'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { dynamicsSelector, getDynamics, isLoadingSelector } from '../../Redux/slice/healthIndexSlice'

export const HealthIndexResults = () => {

  const dispatch = useAppDispatch()
  const dynamics = useAppSelector(dynamicsSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const lastDynamic = dynamics[dynamics.length-1]

  console.log(Object.values(lastDynamic), lastDynamic);
  

  if(isLoading){
    return <h1>Загрузка...</h1>
  }

  return (
    <div className={'health-index-results-page'}>
      <Navigation routes={routesNavigationIndexResult} />
      <HeaderTwo title={'Индексы здоровья'} marginBottom={42} />
      {new Date(lastDynamic.date *1000).getMonth() !== new Date().getMonth() && <div className='health-index-results-page__retesting'>
        <Retesting />
      </div>}
      <div className='health-index-results-page__age'>
        <CardBiologyAge age={lastDynamic?.biological_age}/>
      </div>
      <div className='health-index-results-page__title title-17'>
        Показатели вне нормы
      </div>
      <div className='health-index-results-page__index'>
        <div className='health-index-results-page__index-item'>
          <CardIndex title={'Уровень глюкозы в крови'} value={lastDynamic?.glucose_risk}/>
        </div>
        <div className='health-index-results-page__index-item'>
          <CardIndex title='Индексмассы тела' value={lastDynamic?.body_mass_index}/>
        </div>
        <div className='health-index-results-page__index-item'>
          <CardIndex title={'Физическая активность'} value={lastDynamic?.physical_activity}/>
        </div>
        <div className='health-index-results-page__index-item'>
          <CardIndex title='Правильное питание' value={lastDynamic?.nutrition_risk}/>
        </div>
      </div>
      <Link
        to={DYNAMICS_ROUTE}
        className='health-index-results-page__link _button-dark'
      >
        Динамика всех показателей
      </Link>
      <div className='health-index-results-page__title title-17'>
        Риски возникновения заболеваний
      </div>
      <div className='health-index-results-page__disease'>
        <div className='health-index-results-page__disease-item'>
          <CardDisease risk={lastDynamic.diabetes_risk} title={'Сахарный диабет'}/>
        </div>
        <div className='health-index-results-page__disease-item'>
          <CardDisease title='Онкология' risk={lastDynamic?.oncology_risk}/>
        </div>
        <div className='health-index-results-page__disease-item'>
        <CardDisease title='Алкоголизм' risk={lastDynamic?.alcohol_risk}/>
        </div>
        <div className='health-index-results-page__disease-item'>
        <CardDisease title='Депрессия' risk={lastDynamic?.depression_risk}/>
        </div>
        <div className='health-index-results-page__disease-item'>
        <CardDisease title='Сердечно-сосудистые' risk={lastDynamic?.cardio_risk}/>
        </div>
        <div className='health-index-results-page__disease-item'>
        <CardDisease title='Хронический' risk={lastDynamic?.chronic_risk}/>
        </div>
        <div className='health-index-results-page__disease-item'>
        <CardDisease title='Холестерин' risk={lastDynamic?.cholesterol_risk}/>
        </div>
        <div className='health-index-results-page__disease-item'>
        <CardDisease title='Стресс' risk={lastDynamic?.stress_risk}/>
        </div>
        <div className='health-index-results-page__disease-item'>
        <CardDisease title='Уровень выгорания' risk={lastDynamic?.burnout_risk}/>
        </div>
        <div className='health-index-results-page__disease-item'>
        <CardDisease title='Презентеизм ' risk={lastDynamic?.presenteism}/>
        </div>
      </div>
      <Link
        to={INDIVIDUAL_REPORT_ROUTE}
        className='health-index-results-page__link _button-dark'
      >
        Изучите отчет
      </Link>
    </div>
  )
}
