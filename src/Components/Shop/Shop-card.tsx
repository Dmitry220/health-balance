import React from 'react';
import icon_reward from '../../assets/image/icon_reward.svg'
import './shop.scss'


export const ShopCard = () => {
    return (
        <div className={'shop-card'}>
            <div className="shop-card__img">
                <img src={'https://avatars.mds.yandex.net/i?id=edf06d652e7d1f53c51d937d09b8cba3-5234866-images-thumbs&n=13&exp=1'} alt="product"/>
            </div>
            <div className="shop-card__container">
                <div className="shop-card__title">3 мес. подписки на Яндекс.Плюс</div>
                <div className="shop-card__footer">
                    <div className="shop-card__footer-column">
                        <img src={icon_reward} alt="reward" className="shop-card__icon-reward"/>
                        <div className="shop-card__count-reward">140</div>
                    </div>
                    <div className="shop-card__footer-column">
                        <div className="shop-card__count-product">12 шт.</div>
                        <div className="shop-card__icon-add" />
                    </div>
                </div>
            </div>
        </div>
    );
};
