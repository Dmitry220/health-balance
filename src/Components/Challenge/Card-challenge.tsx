import { FC, useEffect } from 'react'
import './challenge.scss'
import { definitionColor, typeConversion } from '../../utils/common-functions'
import { ProgressBar } from '../Progress-bar/Progress-bar'
import { typesChallenge } from '../../types/enums'
import { Link } from 'react-router-dom'
import { ACTIVE_CHALLENGE_ROUTE } from '../../provider/constants-route'
import { IChallengeCard } from '../../models/IChallenge'
import { IMAGE_URL } from '../../http'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { getStepsPerDay, stepsPerDaySelector } from '../../Redux/slice/appSlice'
import { IStepsPerDay } from '../../models/IApp'
import ChallengeService from '../../services/ChallengeService'

interface ICardChallenge {
  challenge: IChallengeCard
  percent: number
}

export const CardChallenge: FC<ICardChallenge> = ({ challenge }) => {

  const dispatch = useAppDispatch()

  let percent = challenge.purpose && ((challenge.purpose?.quantity - challenge.remains_to_pass) * 100) / challenge.purpose?.quantity

  useEffect(() => {
    async function asyncQuery() {
      if((challenge.purpose.quantity - challenge.remains_to_pass) >= challenge.purpose.quantity && challenge.homeworks === challenge.total_lessons ){
        const response = await ChallengeService.completeChallenge(challenge.id)
        console.log(response);      
      }
    }
    asyncQuery()
  }, [challenge.remains_to_pass])

  console.log(challenge);

  return (
    <Link
      to={ACTIVE_CHALLENGE_ROUTE + '/' + challenge.id}
      className={'card-challenge'}
    >
      <div className='card-challenge__container'>
        <div className='card-challenge__dots'>
          <div className='card-challenge__dot' />
          <div className='card-challenge__dot' />
          <div className='card-challenge__dot' />
        </div>
        <div className='card-challenge__head'>
          <div className='card-challenge__img'>
            <img
              src={IMAGE_URL + 'challenges/' + challenge.image}
              alt='challenge-image'
            />
          </div>
          <div className='card-challenge__head-body'>
            <div
              className={definitionColor(
                challenge.type,
                'card-challenge__type'
              )}
            >
              {typeConversion(challenge.type)}
            </div>
            <div className='card-challenge__title'>
              {challenge.title}
              <div className='card-challenge__sub-title'>
                {challenge.type === 2
                  ? 'Вы в команде “Hardcore”'
                  : 'Личное задание'}
              </div>
            </div>
          </div>
        </div>
        <div className='card-challenge__progress-bar'>
          <ProgressBar percent={percent || 0} type={challenge.type} />
          <div className={'progress-bar__value'}>{percent}%</div>
        </div>
        <div className='card-challenge__data'>
          <div className='card-challenge__days'>
            {new Date(
              challenge.end_date * 1000 - challenge.start_date * 1000
            ).getDate()}{' '}
            <span>Дней</span>
          </div>
          <div className='card-challenge__days'>
            {challenge.purpose?.quantity} <span>{ } Шагов</span>
          </div>
          <div className='card-challenge__days'>
            {challenge.homeworks}/{challenge.total_lessons} <span>Лекций</span>
          </div>
          <div className='card-challenge__days'>
            {challenge.homeworks}/{challenge.total_lessons} <span>Заданий</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
