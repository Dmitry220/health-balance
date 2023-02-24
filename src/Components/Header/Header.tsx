import { Capacitor } from '@capacitor/core'
import { FC, useEffect, useState } from 'react'
import './header.scss'
import { SafeArea } from 'capacitor-plugin-safe-area';


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

  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)

  const back = () => {
    window.history.back();  
  } 

  useEffect(() => {
    SafeArea.getStatusBarHeight().then(({statusBarHeight}) => {
      setStatusBarHeight(statusBarHeight)
      console.log(statusBarHeight, 'statusbarHeight');
    })
  }, [])
  



  return (
    <header className={'header ' + customClass} style={{top: Capacitor.getPlatform()==='ios' ? statusBarHeight:0}}>
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
