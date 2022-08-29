import React from 'react';
import './motivation.scss'
import iconClock from '../../assets/image/Interesting/clock.svg'
import iconComments from '../../assets/image/icon-comments-fill.svg'
import iconFavourite from '../../assets/image/icon-favourite-fill.svg'

export const MotivationCard = () => {
    return (
        <div className={'motivation-card'}>
            <div className="motivation-card__image">
                <img src="https://img3.akspic.ru/attachments/crops/2/4/9/3/0/103942/103942-stolica-darling_harbor-metropoliya-perevozka_vody-opernyj_teatr-1920x1080.jpg" alt=""/>
            </div>
            <div className="motivation-card__body">
                <div className="motivation-card__text">
                    <img src={iconClock} alt=""/>
                    <span>12.12.2021</span>
                    <span>Автор: Иван Рыбаков</span>
                </div>
                <div className="motivation-card__title block-title">
                    Бег утром или вечером? Когда лучше всего бегать и почему.
                </div>
                <div className="motivation__feed-back feed-back">
                    <div className="feed-back__favourite"><img src={iconFavourite} alt="favourite"/>123</div>
                    <div className="feed-back__comments"><img src={iconComments} alt="comments"/>24</div>
                </div>
            </div>
        </div>
    );
};
