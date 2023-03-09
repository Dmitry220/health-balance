import { Capacitor } from '@capacitor/core'
import { SafeArea } from 'capacitor-plugin-safe-area'
import { FC, useEffect, useState } from 'react'
import './header.scss'

interface HeaderProps {
  title: string
  customClass?: string
  additionalComponent?: any
  additionalOnClick?: any
  transparent?: boolean
}

export const Header: FC<HeaderProps> = ({
  title,
  customClass,
  additionalComponent,
  additionalOnClick,
  transparent
}) => {
  const [insetsHeight, setInsetsHeight] = useState<number>(0)
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)

  const back = () => {
    window.history.back()
  }

  useEffect(() => {
    SafeArea.getSafeAreaInsets().then((data) => {
      setInsetsHeight(data.insets.top)
    })
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      setStatusBarHeight(statusBarHeight)
    })
  }, [])

  return (
    <header
      className={'header ' + customClass}
      style={{
        background: transparent ? 'transparent' : '#121212',
        padding:
          Capacitor.getPlatform() === 'ios'
            ? `${insetsHeight + statusBarHeight + 20}px 16px 0 16px`
            : '0 16px',
        height:
          Capacitor.getPlatform() === 'ios'
            ? insetsHeight + statusBarHeight
            : 53
      }}
    >
      <div className='header__container'>
        <div
          className='header__back icon-icon_back'
          onClick={back}
          style={{
            top: Capacitor.getPlatform() === 'ios' ? '50%' : 21,
            transform:
              Capacitor.getPlatform() === 'ios'
                ? 'translateY(-50%)'
                : 'translateY(0)'
          }}
        />
        <div className='header__title'>{title}</div>
        {additionalComponent && (
          <div onClick={additionalOnClick}>{additionalComponent}</div>
        )}
      </div>
    </header>
  )
}

export default Header
