import { useEffect } from 'react'
import { privateRoutes, publicRoutes } from './routes'
import { Routes, Route } from 'react-router-dom'
import { AuthPage } from '../pages/Authorization/Auth-page'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import {
  checkAuth,
  isAuthSelector,
  isLoadingSelector
} from '../Redux/slice/authSlice'
import { setUserData } from '../Redux/slice/profileSlice'
import { Preloader } from '../Components/Preloader/Preloader'
import { StartPage } from '../pages/Start-pages/StartPage'

const AppRouter = () => {
  const user = localStorage.getItem('token')
  const isAuth = useAppSelector(isAuthSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const dispatch = useAppDispatch()

  const idUser = Number(localStorage.getItem('id'))

  useEffect(() => {
    if (isAuth) {
      dispatch(setUserData(idUser))
    } else {
      dispatch(checkAuth())
    }
  }, [isAuth])

  if (isLoading) {
    return <Preloader />
  }

  return isAuth && user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }, index) => (
        <Route path={path} key={index} element={<Component />} />
      ))}
      <Route path={'*'} element={<StartPage />} />
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
