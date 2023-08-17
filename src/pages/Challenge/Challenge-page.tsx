import React, { useEffect } from 'react'
import { Navigation } from '../../Components/Navigation/Navigation'
import { CardChallenge } from '../../Components/Challenge/Card-challenge'
import { NewChallengeCard } from '../../Components/Challenge/New-challenge-card'
import './challenge-page.scss'
import { HeaderTwo } from '../../Components/Header-two/Header-two'
import { TabContent, Tabs } from '../../Components/Tabs/Tabs'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  activeChallengesSelector,
  getListChallenges,
  isLoadingSelector,
  newChallengesSelector
} from '../../Redux/slice/challengeSlice'
import { Link } from 'react-router-dom'
import { CREATING_CHALLENGE_ROUTE } from '../../provider/constants-route'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
// import { InstructionsChallenge } from '../../Components/Challenge/Instruction-challenge'
import { Preloader } from '../../Components/Preloader/Preloader'
// import { challengeVisitSelector } from '../../Redux/slice/visitedPageSlice'
import { Platform } from '../../Components/Platform/Platform'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faRedoAlt } from '@fortawesome/free-solid-svg-icons'



export const ChallengePage = () => {
  const [valueTab, setValueTab] = React.useState<number>(0)
  const labelsTabChallenge = ['Все', 'Общие', 'Командные', 'Личные']
  const dataUser = useAppSelector(dataUserSelector)
  const newChallenges = useAppSelector(newChallengesSelector)
  const activeChallenges = useAppSelector(activeChallengesSelector)
  // const visitChallenges = useAppSelector(challengeVisitSelector)

  const activeCommandChallenge = activeChallenges.filter(
    (item) => item.active === 1 && item.type === 2 && item
  )
  const activePersonalChallenge = activeChallenges.filter(
    (item) => item.active === 1 && item.type === 3 && item
  )
  const activeCommonChallenge = activeChallenges.filter(
    (item) => item.active === 1 && item.type === 1 && item
  )

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


  async function handleRefresh() {
    await dispatch(getListChallenges())
  }

  // if (visitChallenges === 0) {
  //   return <InstructionsChallenge />
  // }

  return (
    <div className={'challenge-page'}>
      <HeaderTwo title={'Челленджи'} marginBottom={40} />
      <Navigation />
      <PullToRefresh
        maxPullDownDistance={70}
        pullDownThreshold={67}
        fetchMoreThreshold={70}
        pullingContent={''}
        refreshingContent={<span id="loader"></span>}
        onRefresh={handleRefresh}
        className='pull-to-refresh'
      >
        <>
          <div className='challenge-page__platform'>
            <Platform />
          </div>
          {(dataUser.role === 1 || dataUser.role === 2) && (
            <Link
              to={CREATING_CHALLENGE_ROUTE}
              className='challenge-page__link _button-yellow'
            >
              Создать челлендж
            </Link>
          )}
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
            {newChallenges.length ? (
              newChallenges.map((item, i) => (
                <div className={'challenge-page__new-challenges'} key={i}>
                  <NewChallengeCard
                    type={item.type}
                    id={item.id}
                    description={item.description}
                    image={item.image}
                    title={item.title}
                  />
                </div>
              ))
            ) : (
              <div className='challenge-page__active-plug'>
                Нет новых челленджей
              </div>
            )}
          </TabContent>
          <TabContent index={3} value={valueTab}>
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
            {personalChallenge.length ? (
              personalChallenge.map((item, i) => (
                <div className={'challenge-page__new-challenges'} key={i}>
                  <NewChallengeCard
                    type={item.type}
                    id={item.id}
                    description={item.description}
                    image={item.image}
                    title={item.title}
                  />
                </div>
              ))
            ) : (
              <div className='challenge-page__active-plug'>
                Нет новых челленджей
              </div>
            )}
          </TabContent>
          <TabContent index={2} value={valueTab}>
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
            {commandsChallenge.length ? (
              commandsChallenge.map((item, i) => (
                <div className={'challenge-page__new-challenges'} key={i}>
                  <NewChallengeCard
                    type={item.type}
                    id={item.id}
                    description={item.description}
                    image={item.image}
                    title={item.title}
                  />
                </div>
              ))
            ) : (
              <div className='challenge-page__active-plug'>
                Нет новых челленджей
              </div>
            )}
          </TabContent>
          <TabContent index={1} value={valueTab}>
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
            {commonChallenge.length ? (
              commonChallenge.map((item, i) => (
                <div className={'challenge-page__new-challenges'} key={i}>
                  <NewChallengeCard
                    type={item.type}
                    id={item.id}
                    description={item.description}
                    image={item.image}
                    title={item.title}
                  />
                </div>
              ))
            ) : (
              <div className='challenge-page__active-plug'>
                Нет новых челленджей
              </div>
            )}
          </TabContent>
        </>
      </PullToRefresh>
    </div>
  )
}

export default ChallengePage
