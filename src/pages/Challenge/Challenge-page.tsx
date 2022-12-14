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
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import { InstructionsChallenge } from '../../Components/Challenge/Instruction-challenge'
import { challengeVisitSelector } from '../../Redux/slice/visitedPageSlice'
import { Preloader } from '../../Components/Preloader/Preloader'

export const ChallengePage = () => {
  const [valueTab, setValueTab] = React.useState<number>(0)
  const labelsTabChallenge = ['Личные', 'Командные', 'Общие']
  const dataUser = useAppSelector(dataUserSelector)
  const newChallenges = useAppSelector(newChallengesSelector)
  const activeChallenges = useAppSelector(activeChallengesSelector)
  const visitChallenges = useAppSelector(challengeVisitSelector)

  const activeCommandChallenge = activeChallenges.filter((item) => item.active === 1 && item.type === 2 && item)
  const activePersonalChallenge = activeChallenges.filter((item) => item.active === 1 && item.type === 3 && item)
  const activeCommonChallenge = activeChallenges.filter((item) => item.active === 1 && item.type === 1 && item)

  const commandsChallenge = newChallenges?.filter(
    (item) => item.type === 2 && item
  )
  const personalChallenge = newChallenges?.filter(
    (item) => item.type === 3 && item
  )
  const commonChallenge = newChallenges?.filter(
    (item) => item.type === 1 && item
  )
  const isLoading = useAppSelector(isLoadingSelector)

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(getListChallenges())
  }, [])

  if (isLoading) {
    return <Preloader />
  }

  if(visitChallenges===0){
    return <InstructionsChallenge />
  }

  return (
    <div className={'challenge-page'}>
      <Navigation routes={routesNavigation} />
      <HeaderTwo title={'Челленджи'} marginBottom={40} />
      {dataUser.role === 1 &&
        <Link
          to={CREATING_CHALLENGE_ROUTE}
          className='challenge-page__link _button-yellow'
        >
          Создать челлендж
        </Link>}

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
          {activePersonalChallenge.length ? (
            activePersonalChallenge.map((item) => (
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
        {personalChallenge.length ? personalChallenge.map((item, i) => (
          <div className={'challenge-page__new-challenges'} key={i}>
            <NewChallengeCard
              type={item.type}
              id={item.id}
              description={item.description}
              image={item.image}
              title={item.title}
            />
          </div>
        )): <div className='challenge-page__active-plug'>
        Нет новых челленджей
      </div>}
      </TabContent>
      <TabContent index={1} value={valueTab}>
        <div className='challenge-page__title-block block-title'>Командные</div>
        <div className='challenge-page__active'>         
          {activeCommandChallenge.length ? (
            activeCommandChallenge.map((item) => (
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
        {commandsChallenge.length ? commandsChallenge.map((item, i) => (
          <div className={'challenge-page__new-challenges'} key={i}>
            <NewChallengeCard
              type={item.type}
              id={item.id}
              description={item.description}
              image={item.image}
              title={item.title}
            />
          </div>
        )): <div className='challenge-page__active-plug'>
        Нет новых челленджей
      </div>}
      </TabContent>
      <TabContent index={2} value={valueTab}>
        <div className='challenge-page__title-block block-title'>Общие</div>
        <div className='challenge-page__active'>
          {activeCommonChallenge.length ? (
            activeCommonChallenge.map((item) => (
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
        {commonChallenge.length ? commonChallenge.map((item, i) => (
          <div className={'challenge-page__new-challenges'} key={i}>
            <NewChallengeCard
              type={item.type}
              id={item.id}
              description={item.description}
              image={item.image}
              title={item.title}
            />
          </div>
        )): <div className='challenge-page__active-plug'>
        Нет новых челленджей
      </div>}
      </TabContent>
    </div>
  )
}

export default ChallengePage
