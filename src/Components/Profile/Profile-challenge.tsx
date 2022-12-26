import { FC } from 'react'
import './profile.scss'

interface IProfileChallenge{
  completed_challenges: number,
  challenges: number
}

export const ProfileChallenge:FC<IProfileChallenge> = ({challenges,completed_challenges}) => {
  return (
    <div className={'profile-challenge'}>
      <div className='profile-challenge__title title-17'>Челленджи</div>
      <div className='profile-challenge__statistics-challenges'>
        <div className='profile-challenge__card-statistics'>
          <div className='profile-challenge__value'>{challenges}</div>
          <div className='profile-challenge__items-text small-text'>
            Активные
          </div>
        </div>
        <div className='profile-challenge__card-statistics'>
          <div className='profile-challenge__value'>{completed_challenges}</div>
          <div className='profile-challenge__items-text small-text'>
            Пройдено
          </div>
        </div>
      </div>
    </div>
  )
}
