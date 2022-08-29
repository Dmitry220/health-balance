import React from 'react';
import './reward.scss'
import icon_reward from '../../assets/image/icon_reward.svg'


export const RewardCard = () => {
    return (
        <div className={'reward-card'}>
            <div className="reward-card__img">
                <img src={'https://avatars.mds.yandex.net/i?id=edf06d652e7d1f53c51d937d09b8cba3-5234866-images-thumbs&n=13&exp=1'} alt="product"/>
            </div>
            <div className="reward-card__container">
                <div className="reward-card__title">3 мес. подписки на Яндекс.Плюс</div>
                <div className="reward-card__footer">
                    <div className="reward-card__footer-column">
                        <img src={icon_reward} alt="reward" className="reward-card__icon-reward"/>
                        <div className="reward-card__count-reward">140</div>
                    </div>
                    <div className="reward-card__footer-column">
                        <div className="reward-card__count-product">12 шт.</div>
                        <div className="reward-card__icon-add" />
                    </div>
                </div>
            </div>
        </div>
    );
};
