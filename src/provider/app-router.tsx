import {useEffect} from 'react'
import {privateRoutes, publicRoutes} from './routes'
import {Route, Routes} from 'react-router-dom'
import {AuthPage} from '../pages/Authorization/Auth-page'
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks'
import {checkAuth, isAuthSelector, isLoadingSelector} from '../Redux/slice/authSlice'
import {Preloader} from '../Components/Preloader/Preloader'
import {StartPage} from '../pages/Start-pages/StartPage'
import {userApi} from "../services/user.api";
import {ID_USER} from "../utils/globalConstants";


const AppRouter = () => {
  const user = localStorage.getItem('token')
  const isAuth = useAppSelector(isAuthSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const dispatch = useAppDispatch()

  const [getProfile] = userApi.endpoints.getUserDataOnId.useLazyQuery()

  useEffect(() => {
    if (isAuth) {
      getProfile(ID_USER)
    } 
    else {      
      dispatch(checkAuth())
    }
  }, [isAuth])

  if (isLoading) {
    return <Preloader />
  }

  return user ? (
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
