import React from 'react';
import './dynamics-page.scss'
import {CardIndex} from "../../Components/Health-index-result/Card-index";
import Header from "../../Components/Header/Header";


export const DynamicsPage = () => {


    return (
        <div className={'dynamics-page'}>
            <Header title={'Динамика'} />
            <div className="dynamics-page__title title-17">Показатели вне нормы</div>
            <div className="dynamics-page__index">
                <div className="dynamics-page__index-item">
                    <CardIndex/>
                </div>
                <div className="dynamics-page__index-item">
                    <CardIndex/>
                </div>
                <div className="dynamics-page__index-item">
                    <CardIndex/>
                </div>
            </div>
            <div className="dynamics-page__main-title main-title">Динамика</div>

        </div>
    );
};
