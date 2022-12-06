import { IRoutesNavigation } from '../Components/Navigation/Navigation'
import {
  ACTIVITY_ROUTE,
  CHALLENGE_ROUTE,
  HEALTH_INDEX_RESULTS_ROUTE,
  HEALTH_INDEX_ROUTE,
  INTERESTING_ROUTE,
  TRACKER_HABITS_ROUTE,
  TRACKER_ROUTE
} from '../provider/constants-route'

export const routesNavigation: IRoutesNavigation[] = [
  {
    title: 'Активность',
    path: ACTIVITY_ROUTE,
    icon: 'icon-icon_fire',
    iconActive: 'icon-icon_fire_active'
  },
  {
    title: 'Трекер',
    path: TRACKER_ROUTE,
    icon: 'icon-icon_check-box',
    iconActive: 'icon-icon_check-box'
  },
  {
    title: 'Индексы',
    path: HEALTH_INDEX_ROUTE,
    icon: 'icon-icon_cardioelectric',
    iconActive: 'icon-icon_cardioelectric'
  },
  {
    title: 'Челленджи',
    path: CHALLENGE_ROUTE,
    icon: 'icon-icon-challenge',
    iconActive: 'icon-icon_energy-active'
  },
  {
    title: 'Интересное',
    path: INTERESTING_ROUTE,
    icon: 'icon-icon_hb_news',
    iconActive: 'icon-icon_hb_news'
  }
]
export const routesNavigationTracker: IRoutesNavigation[] = [
  {
    title: 'Активность',
    path: ACTIVITY_ROUTE,
    icon: 'icon-icon_fire',
    iconActive: 'icon-icon_fire_active'
  },
  {
    title: 'Трекер',
    path: TRACKER_HABITS_ROUTE,
    icon: 'icon-icon_check-box',
    iconActive: 'icon-icon_check-box'
  },
  {
    title: 'Индексы',
    path: HEALTH_INDEX_ROUTE,
    icon: 'icon-icon_cardioelectric',
    iconActive: 'icon-icon_cardioelectric'
  },
  {
    title: 'Челленджи',
    path: CHALLENGE_ROUTE,
    icon: 'icon-icon-challenge',
    iconActive: 'icon-icon_energy-active'
  },
  {
    title: 'Интересное',
    path: INTERESTING_ROUTE,
    icon: 'icon-icon_hb_news',
    iconActive: 'icon-icon_hb_news'
  }
]
export const routesNavigationIndexResult: IRoutesNavigation[] = [
  {
    title: 'Активность',
    path: ACTIVITY_ROUTE,
    icon: 'icon-icon_fire',
    iconActive: 'icon-icon_fire_active'
  },
  {
    title: 'Трекер',
    path: TRACKER_ROUTE,
    icon: 'icon-icon_check-box',
    iconActive: 'icon-icon_check-box'
  },
  {
    title: 'Индексы',
    path: HEALTH_INDEX_RESULTS_ROUTE,
    icon: 'icon-icon_cardioelectric',
    iconActive: 'icon-icon_cardioelectric'
  },
  {
    title: 'Челленджи',
    path: CHALLENGE_ROUTE,
    icon: 'icon-icon-challenge',
    iconActive: 'icon-icon_energy-active'
  },
  {
    title: 'Интересное',
    path: INTERESTING_ROUTE,
    icon: 'icon-icon_hb_news',
    iconActive: 'icon-icon_hb_news'
  }
]
