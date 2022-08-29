import React, {FC, useEffect} from 'react';
import './header-challenge.scss'
import {definitionColor} from "../../utils/common-functions";
import logo from '../../assets/image/Logo-dark.svg'
import {typesChallenge} from "../../types/enums";
import demoImage from '../../assets/image/demo-challenge.jpg'



export const HeaderChallenge:FC = () => {



    return (
        <div className={'header-challenge'}>
            <div className={'header-challenge__image banner'}
                 style={{backgroundImage: `url("${demoImage}")`}}
            />
            <div className="header-challenge__content">
                <div className="header-challenge-card card-active-challenge">
                    <div className="card-active-challenge__icon">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="card-active-challenge__info">
                        <div className={definitionColor(typesChallenge.personal, 'card-active-challenge__type')}>Личный <span>Новый</span></div>
                        <div className="card-active-challenge__title">Начало 2.0. В форме до весны!</div>
                    </div>
                </div>

            </div>

        </div>
    );
};
