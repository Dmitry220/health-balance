import { FC, useEffect } from 'react'
import './header-challenge.scss'
import { definitionColor, typeConversion } from '../../utils/common-functions'
import logo from '../../assets/image/Logo-dark.svg'
import { typesChallenge } from '../../types/enums'
import demoImage from '../../assets/image/demo-challenge.jpg'
import { IMAGE_URL } from '../../http'

interface IHeaderChallenge {
  image: string
  title: string
  type: number
  newChallengeCategory?: boolean
}

export const HeaderChallenge: FC<IHeaderChallenge> = ({
  image,
  title,
  type,
  newChallengeCategory = false
}) => {
  return (
    <div className={'header-challenge'}>
      <div
        className={'header-challenge__image banner'}
        style={{
          backgroundImage: `url("${IMAGE_URL + 'challenges/' + image}")`
        }}
      />
      <div className='header-challenge__content'>
        <div className='header-challenge-card card-active-challenge'>
          <div className='card-active-challenge__icon'>
            <img src={IMAGE_URL + 'challenges/' + image} alt='logo' />
          </div>
          <div className='card-active-challenge__info'>
            <div
              className={definitionColor(type, 'card-active-challenge__type')}
            >
              {typeConversion(type)}
              {!newChallengeCategory && <span>Новый</span>}
            </div>
            <div className='card-active-challenge__title'>{title}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
