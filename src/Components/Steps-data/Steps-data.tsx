import React from 'react';
import './steps-data.scss'
import arrow from '../../assets/image/Arrow.svg'

export const StepsData = () => {
    return (
        <div className={'steps-data'}>
            <div className="steps-data__content">
                <article className="steps-data__card">
                    <div className="steps-data__value">0%</div>
                    <div className="steps-data__text">
                        Цель: <br/>
                        <span>10000 шагов</span>
                    </div>
                </article>
                <article className="steps-data__card average">
                    <div className="steps-data__value"><img src={arrow} alt="arrow"/></div>
                    <div className="steps-data__text">
                        на <span>2000 шагов
                        меньше,</span>
                        чем вчера
                    </div>
                </article>
                <article className="steps-data__card">
                    <div className="steps-data__value"><span>+</span> 12</div>
                    <div className="steps-data__text">
                        <span>Health coin</span> <br/>получено
                    </div>
                </article>
            </div>
        </div>
    );
};

