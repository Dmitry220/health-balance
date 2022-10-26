import React from 'react';
import {Navigation} from "../../Components/Navigation/Navigation";
import './health-index.scss'
import {Link} from "react-router-dom";
import {QUESTIONNAIRE_ROUTE} from "../../provider/constants-route";
import chart from '../../assets/image/Static-chart.png'
import {routesNavigation} from "../../utils/globalConstants";

export const HealthIndexPage = () => {
    return (
        <div className={'health-index'}>
            <Navigation routes={routesNavigation}/>
            <div className="health-index__body">
                <Link to={QUESTIONNAIRE_ROUTE} className="health-index__image">
                    <img src={chart} alt=""/>
                </Link>
                <div className="health-index__title main-title">
                    Индексы появятся после прохождения тестирования
                </div>
                <div className="health-index__text">
                    Результаты сохраняются, проходите опрос в любое удобное время
                </div>
            </div>

            <Link to={QUESTIONNAIRE_ROUTE} className='health-index__button _button-dark'>Пройти тестирование</Link>
        </div>
    );
};

