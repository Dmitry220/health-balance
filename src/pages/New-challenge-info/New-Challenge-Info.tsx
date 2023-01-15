import { useEffect } from 'react'
import './new-challenge-info.scss'
import Header from '../../Components/Header/Header'
import { HeaderChallenge } from '../../Components/Challenge/Header-challenge'
import { ProgressBar } from '../../Components/Progress-bar/Progress-bar'
import { roles, typesChallenge } from '../../types/enums'
import icon_clock from '../../assets/image/Interesting/clock.svg'
import { TaskChallenge } from '../../Components/Challenge/Task-challenge'
import { RewardCount } from '../../Components/Reward/Reward-count'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  CHALLENGE_ROUTE,
  TEAM_SELECTION_ROUTE
} from '../../provider/constants-route'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  challengeSelector,
  getChallengeById
} from '../../Redux/slice/challengeSlice'
import { definitionColor, nFormatter } from '../../utils/common-functions'
import ChallengeService from '../../services/ChallengeService'
import { Preloader } from '../../Components/Preloader/Preloader'

export const NewChallengeInfo = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const challenge = useAppSelector(challengeSelector)

  const itemsTask = [
    {
      title: 'Шагов для завершения',
      value: 0,
      text: nFormatter(challenge?.purpose?.quantity || 0, 1) + '',
      id: 1
    },
    {
      title: 'Обучающий материал',
      value: challenge?.homeworks || 0,
      text: challenge?.total_lessons + ' лекций',
      id: 2
    }
  ]

  const enterIntoChallenge = async () => {
    const response = await ChallengeService.challengeJoin(Number(params.id))

    if (response.data.success) {
      navigate(CHALLENGE_ROUTE)
    }
  }

  useEffect(() => {
    dispatch(getChallengeById(Number(params.id)))
  }, [])

  return (
    <div className={'new-challenge-info'}>
      {challenge ? (
        <>
          <Header
            title={'Челлендж'}
            customClass={'new-challenge-info__header'}
          />
          <div className='new-challenge-info__main'>
            <HeaderChallenge
              image={challenge.image}
              title={challenge.title}
              type={challenge.type}
            />
          </div>
          <div className='new-challenge-info__description'>
            {challenge?.description}
          </div>
          <div className='new-challenge-info__row'>
            <div
              className={definitionColor(
                challenge.type,
                'new-challenge-info__data'
              )}
            >
              <img
                className={'new-challenge-info__data-clock'}
                src={icon_clock}
                alt=''
              />
              {new Date(challenge.start_date * 1000).toLocaleDateString() +
                ' - ' +
                new Date(challenge?.end_date * 1000).toLocaleDateString()}
            </div>
            <div className='new-challenge-info__reward'>
              <div className='new-challenge-info__reward-text'>Награда:</div>
              <RewardCount count={challenge.purpose?.reward || 0} />
            </div>
          </div>
          <div className='new-challenge-info__title-block block-title'>
            Задания
          </div>
          <div className='new-challenge-info__tasks'>
            <TaskChallenge type={challenge.type} tasks={itemsTask} />
          </div>
          {challenge.type === 2 && (
            <Link
              className='new-challenge-info__button _button-white'
              to={TEAM_SELECTION_ROUTE + '/' + challenge.id}
            >
              Принять участие
            </Link>
          )}
          {challenge.type === 3 && (
            <div
              className='new-challenge-info__button _button-white'
              onClick={enterIntoChallenge}
            >
              Принять участие
            </div>
          )}
          {challenge.type === 3 && (
            <>
              {/* {' '}
              <div className='new-challenge-info__title-block block-title'>
                Лидеры челленджа
              </div>
              <ListLeadersChallenge items={itemsLeaders} role={roles.members} /> */}
            </>
          )}
        </>
      ) : (
        <Preloader />
      )}
    </div>
  )
}
