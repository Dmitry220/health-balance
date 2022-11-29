import React from 'react';
import { IRoutesNavigation, Navigation } from "../../Components/Navigation/Navigation";
import { WaterTarget } from "../../Components/Tracker/Water-target";
import { FruitTarget } from "../../Components/Tracker/Fruit-target";
import './tracker-habits_page.scss'
import icon_fruit from '../../assets/image/tracker/icon-fruit.svg'
import icon_water from '../../assets/image/tracker/icon-water.svg'
import { Link } from "react-router-dom";
import {
    ACTIVITY_ROUTE, CHALLENGE_ROUTE,
    GOAL_FRUITS__ROUTE,
    GOAL_WATER__ROUTE,
    HEALTH_INDEX_ROUTE, INTERESTING_ROUTE, STATISTICS_TRACKER__ROUTE, TRACKER_HABITS_ROUTE,
    TRACKER_ROUTE
} from "../../provider/constants-route";
import { HeaderTwo } from "../../Components/Header-two/Header-two";
import { HealthySleep } from "../../Components/Tracker/Healthy-sleep";
import { routesNavigationTracker } from "../../utils/globalConstants";
import { NavLink } from 'react-router-dom';

export const TrackerHabitsPage = () => {



    return (
        <div className={'tracker-habits-page'}>
            <Navigation routes={routesNavigationTracker} />
            <HeaderTwo title={'Трекер привычек'} marginBottom={20} />
            <div className="tracker-habits-page__statistical-btn-wrapper">
                <NavLink
                    to={STATISTICS_TRACKER__ROUTE}
                    style={{ color: "#fff" }}
                    className="_button-dark"
                >
                    Смотреть статистику
                </NavLink>
            </div>
            <div className="tracker-habits-page__target">
                <HealthySleep />
            </div>

            <div className="tracker-habits-page__task-title">
                <div className="tracker-habits-page__task-column">
                    <img src={icon_water} alt="" />
                    <span>2,1 л.</span>
                    воды сегодня
                </div>
                <div className="tracker-habits-page__task-column">
                    <Link to={GOAL_WATER__ROUTE} className='text-blue'>изменить цель</Link>
                </div>
            </div>
            <div className="tracker-habits-page__target">
                <WaterTarget />
            </div>
            <div className="tracker-habits-page__task-title">
                <div className="tracker-habits-page__task-column">
                    <img src={icon_fruit} alt="" />
                    Съесть <span>5</span> фрутков / овощей
                </div>
                <div className="tracker-habits-page__task-column">
                    <Link to={GOAL_FRUITS__ROUTE} className='text-blue'>изменить цель</Link>
                </div>
            </div>
            <div className="tracker-habits-page__target">
                <FruitTarget />
            </div>

        </div>
    );
};
