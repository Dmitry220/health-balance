import React, {FC} from 'react';
import './interesting.scss'
import iconClock from '../../assets/image/Interesting/clock.svg'
import {definitionColor} from "../../utils/common-functions";

interface ICardInteresting {
    type: string
}

export const CardInteresting:FC<ICardInteresting> = ({type}) => {
    return (
        <div className='card-interesting'>
            <div className="card-interesting__container">
                <div className="card-interesting__image">
                    <div className={"card-interesting__hint " + definitionColor(type, '_hint')}>{type}</div>
                    <img src="https://a.d-cd.net/55199ads-1920.jpg" alt="image-interesting"/>
                </div>
                <div className="card-interesting__title">
                    Бег утром или вечером? Когда лучше всего бегать и почему.
                </div>
                <div className="card-interesting__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit
                </div>
                <div className="card-interesting__info info-card">
                    <div className="info-card__date"><img src={iconClock} alt="clock"/>12.12.2021</div>
                    <div className="info-card__author">Автор: Иван Рыбаков</div>
                </div>
            </div>
        </div>
    );
};

