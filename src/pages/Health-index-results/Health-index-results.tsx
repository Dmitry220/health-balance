import React from 'react';
import {CardBiologyAge} from "../../Components/Health-index-result/Card-biology-age";
import {CardDisease} from "../../Components/Health-index-result/Card-Disease";
import {Link} from "react-router-dom";
import {CardIndex} from "../../Components/Health-index-result/Card-index";
import './health-index-results.scss'
import {Navigation} from "../../Components/Navigation/Navigation";
import {Retesting} from "../../Components/Health-index-result/Retesting";
import {DYNAMICS_ROUTE, INDIVIDUAL_REPORT_ROUTE} from "../../provider/constants-route";
import {HeaderTwo} from "../../Components/Header-two/Header-two";
import {routesNavigation, routesNavigationIndexResult} from "../../utils/globalConstants";

export const HealthIndexResults = () => {
    return (
        <div className={'health-index-results-page'}>
            <Navigation routes={routesNavigationIndexResult}/>
            <HeaderTwo title={'Индексы здоровья'} marginBottom={42} />
            <div className="health-index-results-page__retesting">
                <Retesting />
            </div>
            <div className="health-index-results-page__age">
                <CardBiologyAge />
            </div>
            <div className="health-index-results-page__title title-17">
                Показатели вне нормы
            </div>
            <div className="health-index-results-page__index">
                <div className="health-index-results-page__index-item">
                    <CardIndex />
                </div>
                <div className="health-index-results-page__index-item">
                    <CardIndex />
                </div>
                <div className="health-index-results-page__index-item">
                    <CardIndex />
                </div>
            </div>
            <Link to={DYNAMICS_ROUTE} className="health-index-results-page__link _button-dark">
                Динамика всех показателей
            </Link>
            <div className="health-index-results-page__title title-17">
                Риски возникновения заболеваний
            </div>
            <div className="health-index-results-page__disease">
                <div className="health-index-results-page__disease-item">
                    <CardDisease />
                </div>
                <div className="health-index-results-page__disease-item">
                    <CardDisease />
                </div>
                <div className="health-index-results-page__disease-item">
                    <CardDisease />
                </div>
            </div>
            <Link to={INDIVIDUAL_REPORT_ROUTE} className="health-index-results-page__link _button-dark">
                Изучите отчет
            </Link>
        </div>
    );
};

