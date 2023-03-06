import { Navigation } from '../../Components/Navigation/Navigation'
import { WaterTarget } from '../../Components/Tracker/Water-target'
import { FruitTarget } from '../../Components/Tracker/Fruit-target'
import './tracker-habits_page.scss'
import icon_fruit from '../../assets/image/tracker/icon-fruit.svg'
import icon_water from '../../assets/image/tracker/icon-water.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ACTIVITY_ROUTE,
  GOAL_FRUITS__ROUTE,
  GOAL_WATER__ROUTE,
  STATISTICS_TRACKER__ROUTE
} from '../../provider/constants-route'
import { HeaderTwo } from '../../Components/Header-two/Header-two'
import { HealthySleep } from '../../Components/Tracker/Healthy-sleep'
import { routesNavigationTracker } from '../../utils/globalConstants'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { useEffect, useState } from 'react'
import {
  countWaterSelector,
  getTracker,
  getTracks,
  trackerSelector
} from '../../Redux/slice/trackerSlice'
import { showToast, sklonenie } from '../../utils/common-functions'
import { setVisitedTrackerPage } from '../../Redux/slice/authSlice'
import TrackerService from '../../services/TrackerService'

export const TrackerHabitsPage = () => {
  const dispatch = useAppDispatch()
  const tracker = useAppSelector(trackerSelector)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const countWater = useAppSelector(countWaterSelector)
  const location = useLocation()
  const navigate = useNavigate()

  const deleteTracker = async () => {
    try {
      setIsLoading(true)
      const response = await TrackerService.deleteTracker()
      if (response?.data?.success) {
        await showToast('Трекер успешно удален')
        dispatch(setVisitedTrackerPage(0))
        navigate(ACTIVITY_ROUTE)
      } else {
        await showToast('Произошла ошибка')
      }
    } catch (error) {
      await showToast('Произошла ошибка')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    dispatch(getTracker())
    dispatch(getTracks(new Date().toLocaleDateString()))
  }, [location.key])

  return (
    <div className={'tracker-habits-page'}>
      <Navigation routes={routesNavigationTracker} />
      <HeaderTwo title={'Трекер привычек'} marginBottom={20} />
      <div className='tracker-habits-page__statistical-btn-wrapper'>
        <NavLink
          to={STATISTICS_TRACKER__ROUTE}
          style={{ color: '#fff' }}
          className='_button-dark'
        >
          Смотреть статистику
        </NavLink>
      </div>
      <div className='tracker-habits-page__target'>
        <HealthySleep />
      </div>

      <div className='tracker-habits-page__task-title'>
        <div className='tracker-habits-page__task-column'>
          <img src={icon_water} alt='icon_water' />
          <span>{countWater} л.</span>
          воды сегодня
        </div>
        <div className='tracker-habits-page__task-column'>
          <Link to={GOAL_WATER__ROUTE} className='text-blue'>
            изменить цель
          </Link>
        </div>
      </div>
      <div className='tracker-habits-page__target'>
        <WaterTarget />
      </div>
      <div className='tracker-habits-page__task-title'>
        <div className='tracker-habits-page__task-column'>
          <img src={icon_fruit} alt='' />
          Съесть <span>{tracker?.fruits}</span>{' '}
          {sklonenie(tracker?.fruits, ['фрукт', 'фрукта', 'фруктов'])} /{' '}
          {sklonenie(tracker?.fruits, ['овощ', 'овоща', 'овощей'])}
        </div>
        <div className='tracker-habits-page__task-column'>
          <Link to={GOAL_FRUITS__ROUTE} className='text-blue'>
            изменить цель
          </Link>
        </div>
      </div>
      <div className='tracker-habits-page__target'>
        <FruitTarget />
      </div>
      <div className='tracker-habits-page__statistical-btn-wrapper'>
        <button
          style={{ color: '#fff' }}
          disabled={isLoading}
          onClick={deleteTracker}
          className='_button-dark'
        >
          {isLoading ? (
            <span className='spinner'>
              <i className='fa fa-spinner fa-spin'></i> Загрузка
            </span>
          ) : (
            'Отключить трекер'
          )}
        </button>
      </div>
    </div>
  )
}
