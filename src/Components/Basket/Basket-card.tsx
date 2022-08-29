import React from 'react';
import './basket.scss'
import icon_reward from '../../assets/image/icon_reward.svg'

export const BasketCard = () => {
    return (
        <div className={'basket-card'}>
            <div className="basket-card__container">
                <div className="basket-card__image">
                    <img src={'https://avatars.mds.yandex.net/i?id=edf06d652e7d1f53c51d937d09b8cba3-5234866-images-thumbs&n=13&exp=1'} alt="product"/>
                </div>
                <div className="basket-card__info">
                    <div className="basket-card__title">
                        Скидка 50% на месячный абонемент в фитнес клуб X-FIT
                    </div>
                    <div className="basket-card__rewards">
                        <img src={icon_reward} alt="reward"/>
                        <div className="basket-card__count">10</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
