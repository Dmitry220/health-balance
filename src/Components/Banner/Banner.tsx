import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import icon_banner from '../../assets/image/banner/icon-banner.svg'
import { INTERVIEW_PAGE } from '../../provider/constants-route'
import './banner.scss'

interface IBanner {
  title: string
  text: string
}

export const Banner: FC<IBanner> = ({ text, title }) => {
  const [bannerActive, setBannerActive] = useState<boolean>(true)

  if (!bannerActive) return null

  return (
    <NavLink to={INTERVIEW_PAGE} className={'banner'}>
      <div className='banner__cross' onClick={() => setBannerActive(false)}>
        &#10006;
      </div>
      <div className='banner__img'>
        <img src={icon_banner} alt='icon-banner' />
      </div>
      <div className='banner__info'>
        <div className='banner__title'>{title}</div>
        <div className='banner__text'>{text}</div>
      </div>
    </NavLink>
  )
}
