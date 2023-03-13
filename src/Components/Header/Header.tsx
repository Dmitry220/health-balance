import { Capacitor } from '@capacitor/core'
import { SafeArea } from 'capacitor-plugin-safe-area'
import { FC, useEffect, useState } from 'react'
import { useStatusBar } from '../../hooks/useStatusBar'
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

  const statusBar = useStatusBar()  

  const back = () => {
    window.history.back()
  }

  return (
    <header className={'header ' + customClass} 
    style={{ padding: Capacitor.getPlatform() === 'ios' ? `${(statusBar + 20)}px 16px 0 16px` : '0 16px',
    height: Capacitor.getPlatform() === 'ios' ? statusBar : 53
   }}
    >
      <div className='header__container'>
        <div className='header__back icon-icon_back' onClick={back} 
         style={{ top: Capacitor.getPlatform() === 'ios' ? '50%' : 21, transform:Capacitor.getPlatform() === 'ios' ? 'translateY(-50%)' : 'translateY(0)'}}/>
        <div className='header__title'>{title}</div>
        {additionalComponent && (
          <div onClick={additionalOnClick}>{additionalComponent}</div>
        )}
      </div>
    </header>
  )
}

export default Header
