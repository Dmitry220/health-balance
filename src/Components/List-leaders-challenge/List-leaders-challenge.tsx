import { FC } from 'react'
import './list-leaders-challenge.scss'
import icon from '../../assets/image/icon_reward.svg'
import { roles } from '../../types/enums'

interface IListLeadersChallengeItem {
  reward: number
  place: number
  isYourCommand?: boolean
  avatar?: string
  title: string
  isYou?: boolean
}

interface IListLeadersChallenge {
  items?: IListLeadersChallengeItem[]
  role: number
}

export const ListLeadersChallenge: FC<IListLeadersChallenge> = ({
  items,
  role
}) => {
  const colorReward = (place: number) => {
    switch (place) {
      case 1:
        return 'item-leader__place_1'
      case 2:
        return 'item-leader__place_2'
      case 3:
        return 'item-leader__place_3'
      default:
        return ''
    }
  }

  return (
    <div className={'leader-challenge'}>
      <div className='leader-challenge__header'>
        <div className='leader-challenge__title'>{role}</div>
        <div className='leader-challenge__title'>Прогресс</div>
      </div>
      <div className='leader-challenge__items'>
        {items&&items.map((item, i) => (
          <article className='leader-challenge__item item-leader' key={i}>
            <div className='item-leader__column item-leader__column_1'>
              <div className={'item-leader__place ' + colorReward(item.place)}>
                {item.place}
              </div>
              <div
                className={
                  role === 3
                    ? 'item-leader__avatar item-leader__avatar_member'
                    : 'item-leader__avatar'
                }
              >
                {item.avatar && <img src={item.avatar} alt='avatar' />}
              </div>
              <div
                className={
                  item.isYourCommand || item.isYou
                    ? 'item-leader__title item-leader__title_yourCommand'
                    : 'item-leader__title'
                }
              >
                {item.title}
                {item.isYourCommand && (
                  <div className='item-leader__your-command'>Ваша команда</div>
                )}
              </div>
            </div>
            <div className='item-leader__column item-leader__column_2'>
              <div className='item-leader__icon'>
                <img src={icon} alt='icon' />
              </div>
              <div className='item-leader__reward'>{item.reward}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
