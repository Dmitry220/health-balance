import { FC } from 'react'
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
  const back = () => {
    window.history.back()
  }

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
