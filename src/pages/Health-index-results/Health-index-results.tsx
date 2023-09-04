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
import { timeConverterUnix } from '../../utils/common-functions'
import React from 'react'
import { useAppSelector } from '../../hooks/redux-hooks'
import {
  currentResultIndexSelector,
  indicatorsSelector,
  riskOfDiseasesSelector
} from '../../Redux/slice/healthIndexSlice'

export const HealthIndexResults = () => {
  const currentResultIndex = useAppSelector(currentResultIndexSelector)
  const indicators = useAppSelector(indicatorsSelector)
  const riskOfDiseases = useAppSelector(riskOfDiseasesSelector)
  const check =
    currentResultIndex &&
    (timeConverterUnix(new Date().toLocaleDateString()) -
      currentResultIndex.date) /
      (24 * 60 * 60) >=
      180.0

  return (
    <div className={'health-index-results-page'}>
      <Navigation />
      <HeaderTwo title={'Индексы здоровья'} marginBottom={42} />
      {currentResultIndex && (
        <>
          {check && (
            <div className='health-index-results-page__retesting'>
              <Retesting />
            </div>
          )}
          <div className='health-index-results-page__age'>
            <CardBiologyAge age={currentResultIndex?.biological_age} />
          </div>
          <div className='health-index-results-page__title title-17'>
            Показатели
          </div>
          <div className='health-index-results-page__index'>
            {indicators?.map((item, index) => (
              <div
                className='health-index-results-page__index-item'
                key={index}
              >
                <CardIndex
                  title={item.title}
                  value={item.value || 0}
                  tag={item.tag}
                />
              </div>
            ))}
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
            {riskOfDiseases?.map((item, index) => (
              <div
                className='health-index-results-page__disease-item'
                key={index}
              >
                <CardDisease
                  risk={item?.value || 0}
                  title={item?.title}
                  tag={item.tag}
                />
              </div>
            ))}
          </div>
          <Link
            to={INDIVIDUAL_REPORT_ROUTE}
            className='health-index-results-page__link _button-dark'
          >
            Изучите отчет
          </Link>
        </>
      )}
    </div>
  )
}
