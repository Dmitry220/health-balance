import { useEffect } from 'react'
import { privateRoutes, publicRoutes } from './routes'
import { Routes, Route } from 'react-router-dom'
import { AuthPage } from '../pages/Authorization/Auth-page'
import { ActivityPage } from '../pages/Activity-page/Activity-page'
import { useAppDispatch, useAppSelector } from '../utils/hooks/redux-hooks'
import {
  checkAuth,
  isAuthSelector,
  isLoadingSelector
} from '../Redux/slice/authSlice'
import { setUserData } from '../Redux/slice/profileSlice'

const AppRouter = () => {
  const user = localStorage.getItem('token')
  const isAuth = useAppSelector(isAuthSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const dispatch = useAppDispatch()

  const idUser = Number(localStorage.getItem('id'))

  useEffect(() => {
    if (isAuth && !isLoading) {
      dispatch(setUserData(idUser))
    } else {
      dispatch(checkAuth())
    }
  }, [isAuth])

  if (isLoading) {
    return <h1>Загрузка...</h1>
  }

  return isAuth && user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }, index) => (
        <Route path={path} key={index} element={<Component />} />
      ))}
      <Route path={'*'} element={<ActivityPage />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }, index) => (
        <Route path={path} key={index} element={<Component />} />
      ))}
      <Route path={'*'} element={<AuthPage />} />
    </Routes>
  )
}

export default AppRouter
