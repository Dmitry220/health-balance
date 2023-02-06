import { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import { HeaderChallenge } from '../../Components/Challenge/Header-challenge'
import { ListLeadersChallenge } from '../../Components/List-leaders-challenge/List-leaders-challenge'
import { roles, typesChallenge } from '../../types/enums'
import './active-challenge-page.scss'
import { TaskChallenge } from '../../Components/Challenge/Task-challenge'
import { ProgressBar } from '../../Components/Progress-bar/Progress-bar'
import { RewardCount } from '../../Components/Reward/Reward-count'
import { Link, useParams } from 'react-router-dom'
import { LECTURES_ROUTE } from '../../provider/constants-route'
import icon_clock from '../../assets/image/Interesting/clock.svg'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  challengeSelector,
  getChallengeById
} from '../../Redux/slice/challengeSlice'
import { definitionColor, nFormatter } from '../../utils/common-functions'

export const ActiveChallengePage = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const challenge = useAppSelector(challengeSelector)
  const [transparentHeader, setTransparentHeader] = useState<boolean>(true)
  let percent =
    challenge?.purpose &&
    ((challenge.purpose?.quantity - challenge.remains_to_pass) * 100) /
      challenge.purpose?.quantity
  const itemsTask = [
    {
      title: 'Шагов для завершения',
      value: challenge?.purpose
        ? nFormatter(challenge.purpose.quantity - challenge.remains_to_pass, 1)
        : 0,
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

  useEffect(() => {
    dispatch(getChallengeById(Number(params.id)))
    window.addEventListener('scroll', function () {
      let scroll = window.pageYOffset
      // let step: any = document.querySelector('#step')
      // step.style.transform =
      //   'translate3d(0,' + scroll / 5 + '%,0) scale(' + (1 - scroll / 250) + ')'
      if (scroll >= 230) {
        //step.style.transform = 'translate3d(0, 42.2222%,0) scale(0.24)'
        setTransparentHeader(false)
      } else {
        setTransparentHeader(true)
      }
    })
  }, [])

  return (
    <div className={'active-challenge-page'}>
      <Header
        title={'Челлендж'}
        customClass={transparentHeader?'active-challenge-page__header':""}
      />
      <div className='active-challenge-page__main'>
        <HeaderChallenge
          type={challenge?.type || 1}
          image={challenge?.image || ''}
          title={challenge?.title || ''}
          newChallengeCategory
        />
      </div>
      <div className='active-challenge-page__progress'>
        <div
          className={
            definitionColor(
              challenge?.type || 1,
              'active-challenge-page__title-17'
            ) + ' title-17'
          }
        >
          Общий прогресс <span>{percent?.toFixed(1) || 100}%</span> / 100%
        </div>
        <ProgressBar percent={percent || 0} type={challenge?.type || 1} />
      </div>
      <div className='active-challenge-page__tasks tasks-active-challenge'>
        <div className='tasks-active-challenge__head'>
          <div className='tasks-active-challenge__title-17 title-17'>
            Челлендж закончится:
          </div>
          <div className='tasks-active-challenge__data'>
            <img src={icon_clock} alt='' />
            {challenge?.end_date &&
              new Date(challenge?.end_date * 1000).toLocaleDateString()}
          </div>
        </div>
        <TaskChallenge type={challenge?.type || 1} tasks={itemsTask} />
      </div>
      <div className='active-challenge-page__reward'>
        Награда: <RewardCount count={challenge?.purpose?.reward || 0} />
      </div>
      <Link
        to={LECTURES_ROUTE + '/' + params.id}
        className='active-challenge-page__button _button-yellow'
      >
        Лекции и домашнее задание
      </Link>
      <div className='active-challenge-page__title-block block-title'>
        Лидеры челленджа
      </div>
      {challenge?.type && (
        <ListLeadersChallenge
          type={challenge?.type}
          idChallenge={challenge?.id}
        />
      )}
    </div>
  )
}
