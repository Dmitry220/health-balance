import { FC, useEffect, useState } from 'react'
import './challenge.scss'
import {
  definitionColor,
  nFormatter,
  sklonenie,
  typeConversion
} from '../../utils/common-functions'
import { ProgressBar } from '../Progress-bar/Progress-bar'
import { Link } from 'react-router-dom'
import {
  ACTIVE_CHALLENGE_ROUTE,
  ACTIVITY_ROUTE
} from '../../provider/constants-route'
import { IChallenge } from '../../models/IChallenge'
import { IMAGE_URL } from '../../http'
import ChallengeService from '../../services/ChallengeService'
import plug from '../../assets/image/plug.png'
import { ModalStatus } from '../Modals/Modal-status'

interface ICardChallenge {
  challenge: IChallenge
  percent: number
}

export const CardChallenge: FC<ICardChallenge> = ({ challenge }) => {
  let percent =
    challenge.purpose &&
    +(
      ((challenge.purpose?.quantity - challenge.remains_to_pass) * 100) /
      challenge.purpose?.quantity
    ).toFixed(1)
  const [successChallenge, setSuccessChallenge] = useState<boolean>(false)

  useEffect(() => {
    async function asyncQuery() {
      if (
        challenge.purpose?.quantity - challenge.remains_to_pass >=
          challenge.purpose?.quantity &&
        challenge.homeworks === challenge.total_lessons
      ) {
        const response = await ChallengeService.completeChallenge(challenge.id)
        if (response.data.success) setSuccessChallenge(true)
      }
    }
    asyncQuery()
  }, [challenge.remains_to_pass])

  if (successChallenge) {
    return (
      <ModalStatus
        route={ACTIVITY_ROUTE}
        subTitle={`Вы успешно завершили\n${challenge.title}\n
        Получена награда: ${challenge.purpose.reward}`}
        textButton='Ок'
      />
    )
  }

  return (
    <Link
      to={ACTIVE_CHALLENGE_ROUTE + '/' + challenge.id}
      className={'card-challenge'}
    >
      <div className='card-challenge__container'>
        {/* <div className='card-challenge__dots'>
          <div className='card-challenge__dot' />
          <div className='card-challenge__dot' />
          <div className='card-challenge__dot' />
        </div> */}
        <div className='card-challenge__head'>
          <div className='card-challenge__img'>
            {challenge.image && (
              <img
                src={IMAGE_URL + 'challenges/' + challenge.image}
                alt={challenge.image}
              />
            )}
            {!challenge.image && <img src={plug} alt={challenge.image} />}
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
                  ? 'Вы в команде "' + challenge.customer_team_name + '"'
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
            {Math.ceil(
              Math.abs(
                challenge.end_date * 1000 - challenge.start_date * 1000
              ) /
                (1000 * 3600 * 24)
            )}
            <span>
              {sklonenie(
                Math.ceil(
                  Math.abs(
                    challenge.end_date * 1000 - challenge.start_date * 1000
                  ) /
                    (1000 * 3600 * 24)
                ),
                ['день', 'дня', 'дней']
              )}
            </span>
          </div>
          <div className='card-challenge__days'>
            {nFormatter(challenge.purpose?.quantity, 1)}{' '}
            <span>
              {}{' '}
              {sklonenie(challenge.purpose?.quantity, ['шаг', 'шага', 'шагов'])}
            </span>
          </div>
          <div className='card-challenge__days'>
            {challenge.homeworks}/{challenge.total_lessons} <span>Лекций</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
