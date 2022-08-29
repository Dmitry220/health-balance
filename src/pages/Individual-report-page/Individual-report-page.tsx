import React from 'react';
import './individual-report-page.scss'
import Header from "../../Components/Header/Header";
import {Link} from "react-router-dom";
import {REPORT_ROUTE} from "../../provider/constants-route";

export const IndividualReportPage = () => {
    return (
        <div className={'individual-report-page'}>
            <Header title={'Индивидуальный отчет'} />
            <div className="individual-report-page__item">
                <div className="individual-report-page__title main-title">Отчет за 12.12.2022</div>
                <Link to={REPORT_ROUTE} className="individual-report-page__link text-blue">Открыть</Link>
            </div>
            <div className="individual-report-page__item">
                <div className="individual-report-page__title main-title">Отчет за 12.12.2022</div>
                <Link to={REPORT_ROUTE} className="individual-report-page__link text-blue">Открыть</Link>
            </div>
            <div className="individual-report-page__item">
                <div className="individual-report-page__title main-title">Отчет за 12.12.2022</div>
                <Link to={REPORT_ROUTE} className="individual-report-page__link text-blue">Открыть</Link>
            </div>
        </div>
    );
};


