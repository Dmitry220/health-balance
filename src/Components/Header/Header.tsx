import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import './header.scss'

interface HeaderProps {
  title: string
  customClass?: string
  additionalComponent?: any
  additionalOnClick?: any
}

export const Header: FC<HeaderProps> = ({
  title,
  customClass,
  additionalComponent,
  additionalOnClick
}) => {
  const navigate = useNavigate()

  const back = () => navigate(-1)

  return (
    <header className={'header ' + customClass}>
      <div className='header__container'>
        <div className='header__back icon-icon_back' onClick={back} />
        <div className='header__title'>{title}</div>
        {additionalComponent && (
          <div onClick={additionalOnClick}>{additionalComponent}</div>
        )}
      </div>
    </header>
  )
}

export default Header
