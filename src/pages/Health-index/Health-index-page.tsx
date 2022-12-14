import { Navigation } from '../../Components/Navigation/Navigation'
import './health-index.scss'
import { Link, useNavigate } from 'react-router-dom'
import { QUESTIONNAIRE_ROUTE } from '../../provider/constants-route'
import chart from '../../assets/image/Static-chart.png'
import { useSelector } from 'react-redux'
import { HealthIndexResults } from '../Health-index-results/Health-index-results'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { dynamicsSelector, getDynamics, getProgressAndIdPolls, idPolleSelector, interruptPoll, isLoadingSelector, progressPollSelector } from '../../Redux/slice/healthIndexSlice'
import { Questionnaire } from '../Questionnaire/Questionnaire'
import { FC, useEffect, useState } from 'react'
import HealthIndexService from '../../services/HealthIndexService'
import { Preloader } from '../../Components/Preloader/Preloader'

export const HealthIndexPage = () => {

  const idPoll = useAppSelector(idPolleSelector)
  const progressPoll = useAppSelector(progressPollSelector)
  const dynamics = useAppSelector(dynamicsSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    async function asyncQueries() {
      await dispatch(getDynamics())
      await dispatch(getProgressAndIdPolls())
    }
    asyncQueries()
  }, []);


  if (isLoading) {
    return <Preloader />
  }

 
  if (dynamics.length) {
    if (idPoll && progressPoll) {
      return <ContinueQuestionaire />
    }
    return <HealthIndexResults />
  } else {

    if (idPoll && progressPoll) {
      return <ContinueQuestionaire />
    }
    if (idPoll && !progressPoll) {
      return <StartQuestionaire />
    }
  }

  return <StartQuestionaire />
}

export const StartQuestionaire: FC = () => {

  const navigate = useNavigate()

  const startTesting = () => {
    navigate(QUESTIONNAIRE_ROUTE)
  }

  return (
    <div className={'health-index'}>
      <Navigation />
      <div className='health-index__body'>
        <Link to={QUESTIONNAIRE_ROUTE} className='health-index__image'>
          <img src={chart} alt='' />
        </Link>
        <div className='health-index__title main-title'>
          ?????????????? ???????????????? ?????????? ?????????????????????? ????????????????????????
        </div>
        <div className='health-index__text'>
          ???????????????????? ??????????????????????, ?????????????????? ?????????? ?? ?????????? ?????????????? ??????????
        </div>
      </div>

      <button
        onClick={startTesting}
        className='health-index__button _button-dark'
      >
        ???????????? ????????????????????????
      </button>
    </div>
  )
}

export const ContinueQuestionaire: FC = () => {

  const dispatch = useAppDispatch()
  const idPoll = useAppSelector(idPolleSelector)
  const navigate = useNavigate()

  const continueTest = () => {
    navigate(QUESTIONNAIRE_ROUTE)
  }

  const resetTest = async () => {
    await dispatch(interruptPoll(idPoll))
    await dispatch(getProgressAndIdPolls())
    navigate(QUESTIONNAIRE_ROUTE)
  }

  return (
    <div className='continue-questionaire'>
      <Navigation />
      <div className='continue-questionaire__title title'>
        ???????????????????? <br /> ?????????????????????????
      </div>
      <div className='continue-questionaire__text'>
        ???????? ???????????????????? ???????? ??????????????????
      </div>
      <div className='_button-dark' onClick={continueTest}>
        ????????????????????
      </div>
      <div
        className='_button-dark'
        onClick={resetTest}
        style={{ color: '#fff', marginTop: '16px' }}
      >
        ???????????? ??????????????
      </div>
    </div>
  )
}
