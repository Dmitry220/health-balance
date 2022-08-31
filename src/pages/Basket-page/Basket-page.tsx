import React from 'react';
import Header from "../../Components/Header/Header";
import {BasketCard} from "../../Components/Basket/Basket-card";
import './basket-page.scss'
import icon_reward from '../../assets/image/icon_reward.svg'
import {RewardCount} from "../../Components/Reward/Reward-count";
import {Link} from "react-router-dom";
import {MAKING_ORDER_ROUTE} from "../../provider/constants-route";

export const BasketPage = () => {
    return (
        <div className={'basket-page'}>
            <Header title={'Корзина'} />
            <div className="basket-page__cards">
                <div className="basket-page__card"><BasketCard /></div>
                <div className="basket-page__card"><BasketCard /></div>
                <div className="basket-page__card"><BasketCard /></div>
            </div>

            <div className="basket-page__text-danger">На вашем счете недостаточно монет</div>


            <Link to={MAKING_ORDER_ROUTE} className="basket__page__button button-basket">
                <span className="button-basket__text text-blue">Обменять</span>
               <RewardCount count={260} fontSize={15}/>
            </Link>

        </div>
    );
};

