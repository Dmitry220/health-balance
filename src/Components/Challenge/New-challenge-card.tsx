import { FC } from 'react'
import logo from '../../assets/image/Logo-dark.svg'
import { definitionColor, typeConversion } from '../../utils/common-functions'
import { Link } from 'react-router-dom'
import { NEW_CHALLENGE_INFO_ROUTE } from '../../provider/constants-route'
import { IMAGE_URL } from '../../http'

interface INewChallengeCard {
  type: number
  title: string
  description: string
  image: string
  id: number
}

export const NewChallengeCard: FC<INewChallengeCard> = ({
  type,
  id,
  description,
  title,
  image
}) => {
  return (
    <Link to={NEW_CHALLENGE_INFO_ROUTE + '/' + id} className={'new-board'}>
      <div className='new-board__image'>
        <div className={definitionColor(type, '_hint')}>
          {typeConversion(type)}
        </div>
        <img
          src={
            image
              ? IMAGE_URL + 'challenges/' + image
              : 'https://a.d-cd.net/55199ads-1920.jpg'
          }
          alt='image-new-board'
        />
      </div>
      <div className='new-board__body'>
        <div className={definitionColor(type, 'new-board__icon')}>
          <img
            src={
              image
                ? IMAGE_URL + 'challenges/' + image
                : 'https://a.d-cd.net/55199ads-1920.jpg'
            }
            alt='icon'
          />
        </div>
        <div className='new-board__description'>
          <div className='new-board__title'>{title}</div>
          <div className='new-board__text'>{description}</div>
        </div>
      </div>
    </Link>
  )
}
