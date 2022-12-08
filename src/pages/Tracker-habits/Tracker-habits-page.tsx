import {
  IRoutesNavigation,
  Navigation
} from '../../Components/Navigation/Navigation'
import { WaterTarget } from '../../Components/Tracker/Water-target'
import { FruitTarget } from '../../Components/Tracker/Fruit-target'
import './tracker-habits_page.scss'
import icon_fruit from '../../assets/image/tracker/icon-fruit.svg'
import icon_water from '../../assets/image/tracker/icon-water.svg'
import { Link } from 'react-router-dom'
import {
  ACTIVITY_ROUTE,
  CHALLENGE_ROUTE,
  GOAL_FRUITS__ROUTE,
  GOAL_WATER__ROUTE,
  HEALTH_INDEX_ROUTE,
  INTERESTING_ROUTE,
  STATISTICS_TRACKER__ROUTE,
  TRACKER_HABITS_ROUTE,
  TRACKER_ROUTE
} from '../../provider/constants-route'
import { HeaderTwo } from '../../Components/Header-two/Header-two'
import { HealthySleep } from '../../Components/Tracker/Healthy-sleep'
import { routesNavigationTracker } from '../../utils/globalConstants'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { useEffect } from 'react'
import { getTracker, isLoadingSelector, trackerSelector } from '../../Redux/slice/trackerSlice'

export const TrackerHabitsPage = () => {

  const dispatch = useAppDispatch()
  const tracker = useAppSelector(trackerSelector)
 
  console.log(tracker);
  

  useEffect(() => {
    dispatch(getTracker())
  }, [])

  // if(isLoading){
  //   return <h1>Загрузка...</h1>
  // }

  const morning = tracker.wake_up_time.split(':')[0]
  const evening = +morning-8<0 ? 24+(+morning-8) :+morning-8
  console.log(morning);
  
  

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
        <HealthySleep evening={evening+''} morning={morning+''}/>
      </div>

      <div className='tracker-habits-page__task-title'>
        <div className='tracker-habits-page__task-column'>
          <img src={icon_water} alt='' />
          <span>2,1 л.</span>
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
          Съесть <span>{tracker?.fruits}</span> фрутков / овощей
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
    </div>
  )
}
