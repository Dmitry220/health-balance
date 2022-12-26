import React, { useEffect, useState } from 'react'
import { Navigation } from '../../Components/Navigation/Navigation'
import Header from '../../Components/Header/Header'
import { CardChallenge } from '../../Components/Challenge/Card-challenge'
import { typesChallenge } from '../../types/enums'
import { NewChallengeCard } from '../../Components/Challenge/New-challenge-card'
import './challenge-page.scss'
import { HeaderTwo } from '../../Components/Header-two/Header-two'
import { TabContent, Tabs } from '../../Components/Tabs/Tabs'
import { ModalInstructions } from '../../Components/Modal-instructions/Modal-instructions'
import { routesNavigation } from '../../utils/globalConstants'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  activeChallengesSelector,
  getListChallenges,
  isLoadingSelector,
  newChallengesSelector
} from '../../Redux/slice/challengeSlice'
import { Link } from 'react-router-dom'
import { CREATING_CHALLENGE_ROUTE } from '../../provider/constants-route'

export const ChallengePage = () => {
  const [valueTab, setValueTab] = React.useState<number>(0)
  const labelsTabChallenge = ['Личные', 'Командные', 'Общие', 'Архив']

  const newChallenges = useAppSelector(newChallengesSelector)
  const activeChallenges = useAppSelector(activeChallengesSelector)

  const commandsChallenge = newChallenges?.filter(
    (item) => item.type === 2 && item
  )
  const personalChallenge = newChallenges?.filter(
    (item) => item.type === 3 && item
  )
  const isLoading = useAppSelector(isLoadingSelector)

  const dispatch = useAppDispatch()

  console.log(newChallenges);
  

  useEffect(() => {
    dispatch(getListChallenges())
  }, [])

  if (isLoading) {
    return <h1>Загрузка...</h1>
  }

  return (
    <div className={'challenge-page'}>
      <Navigation routes={routesNavigation} />
      <HeaderTwo title={'Челленджи'} marginBottom={40} />

      <Link
        to={CREATING_CHALLENGE_ROUTE}
        className='challenge-page__link _button-yellow'
      >
        Создать челлендж
      </Link>

      <Tabs
        labels={labelsTabChallenge}
        onClick={setValueTab}
        value={valueTab}
        customClassParent={'scroll-tabs'}
        customClassChildren={'scroll-tabs-labels'}
      />
      <TabContent index={0} value={valueTab}>
        <div className='challenge-page__title-block block-title'>Активные</div>
        <div className='challenge-page__active'>
          {activeChallenges.length ? (
            activeChallenges.map((item) => (
              <CardChallenge key={item.id} challenge={item} percent={0} />
            ))
          ) : (
            <div className='challenge-page__active-plug'>
              Нет активных челленджей
            </div>
          )}
        </div>
        <div className='challenge-page__title-block block-title'>
          Новые челленджи
        </div>
        {personalChallenge.map((item, i) => (
          <div className={'challenge-page__new-challenges'} key={i}>
            <NewChallengeCard
              type={item.type}
              id={item.id}
              description={item.description}
              image={item.image}
              title={item.title}
            />
          </div>
        ))}
      </TabContent>
      <TabContent index={1} value={valueTab}>
        <div className='challenge-page__title-block block-title'>Командные</div>
        <div className='challenge-page__active'>
          <div className='challenge-page__active-plug active-plug'>
            Нет командных челленджей
          </div>
          {/* <CardChallenge type={typesChallenge.command} percent={12} id={3} />
                    <CardChallenge type={typesChallenge.command} percent={84} id={8} /> */}
        </div>
        <div className='challenge-page__title-block block-title'>
          Новые челленджи
        </div>
        {commandsChallenge.map((item, i) => (
          <div className={'challenge-page__new-challenges'} key={i}>
            <NewChallengeCard
              type={item.type}
              id={item.id}
              description={item.description}
              image={item.image}
              title={item.title}
            />
          </div>
        ))}
      </TabContent>
      <TabContent index={2} value={valueTab}>
        <div className='challenge-page__title-block block-title'>Общие</div>
        <div className='challenge-page__active'>
          {/* <CardChallenge type={typesChallenge.common} percent={55} id={9} />
                    <CardChallenge type={typesChallenge.common} percent={70} id={2} /> */}
                    <div className='challenge-page__active-plug'>
            Нет общих челленджей
          </div>
        </div>
      </TabContent>
      <TabContent index={3} value={valueTab}>
        <div className='challenge-page__title-block block-title'>Архив</div>
        <div className='challenge-page__active'>
          {/* <CardChallenge type={typesChallenge.personal} percent={74} id={4} />
                    <CardChallenge type={typesChallenge.command} percent={96} id={5} /> */}
                    <div className='challenge-page__active-plug'>
            Челленджей нет
          </div>
        </div>
      </TabContent>
    </div>
  )
}

export default ChallengePage
