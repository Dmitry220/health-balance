import { FC } from 'react'
import { Auth } from '../../Components/Authorization/Auth'
import './auth-page.scss'

export const AuthPage: FC = () => {
  return (
    <div className={'auth-page'}>
      <Auth />
    </div>
  )
}
