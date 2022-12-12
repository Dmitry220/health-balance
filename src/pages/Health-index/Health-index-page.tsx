import { Navigation } from '../../Components/Navigation/Navigation'
import './health-index.scss'
import { Link, useNavigate } from 'react-router-dom'
import { QUESTIONNAIRE_ROUTE } from '../../provider/constants-route'
import chart from '../../assets/image/Static-chart.png'
import { useSelector } from 'react-redux'
import { HealthIndexResults } from '../Health-index-results/Health-index-results'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { getProgressAndIdPolls, idPolleSelector, interruptPoll, progressPollSelector } from '../../Redux/slice/healthIndexSlice'
import { Questionnaire } from '../Questionnaire/Questionnaire'
import { FC, useEffect, useState } from 'react'

export const HealthIndexPage = () => {

  const idPoll = useAppSelector(idPolleSelector)
  const progressPoll = useAppSelector(progressPollSelector)

  const [continuePassing, setContinuePassing] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProgressAndIdPolls())
  }, []);

  if (idPoll != 0 && progressPoll === 1 && !continuePassing) {
    return <StartQuestionaire setContinuePassing={setContinuePassing} />
  }

  if (idPoll != 0 && progressPoll != 1 && progressPoll != 0 && !continuePassing) {
    return <ContinueQuestionaire setContinuePassing={setContinuePassing} />
  }

  if (continuePassing) {
    return <Questionnaire />
  }

  return (
    <HealthIndexResults />
  )
}

interface IStartQuestionaire {
  setContinuePassing: Function
}

const StartQuestionaire: FC<IStartQuestionaire> = ({ setContinuePassing }) => {

  const startTesting = () => {
    setContinuePassing(true)
  }

  return (
    <div className={'health-index'}>
      <Navigation />
      <div className='health-index__body'>
        <Link to={QUESTIONNAIRE_ROUTE} className='health-index__image'>
          <img src={chart} alt='' />
        </Link>
        <div className='health-index__title main-title'>
          Индексы появятся после прохождения тестирования
        </div>
        <div className='health-index__text'>
          Результаты сохраняются, проходите опрос в любое удобное время
        </div>
      </div>

      <button
        onClick={startTesting}
        className='health-index__button _button-dark'
      >
        Пройти тестирование
      </button>
    </div>
  )
}

interface IContinueQuestionaire {
  setContinuePassing: Function
}

const ContinueQuestionaire: FC<IContinueQuestionaire> = ({ setContinuePassing }) => {

  const dispatch = useAppDispatch()
  const idPoll = useAppSelector(idPolleSelector)

  const continueTest = () => {
    setContinuePassing(true)
  }

  const resetTest = () => {
    dispatch(interruptPoll(idPoll))
  }

  return (
    <div className='continue-questionaire'>
      <Navigation />
      <div className='continue-questionaire__title title'>
        Продолжить <br /> тестирование?
      </div>
      <div className='continue-questionaire__text'>
        Ваши результаты были сохранены
      </div>
      <div className='_button-dark' onClick={continueTest}>
        Продолжить
      </div>
      <div
        className='_button-dark'
        onClick={resetTest}
        style={{ color: '#fff', marginTop: '16px' }}
      >
        Начать сначала
      </div>
    </div>
  )
}
