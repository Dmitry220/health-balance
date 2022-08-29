import React from 'react';
import Header from "../../Components/Header/Header";
import {BasketCard} from "../../Components/Basket/Basket-card";
import './basket-page.scss'
import icon_reward from '../../assets/image/icon_reward.svg'

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


            <button className="basket__page__button button-basket">
                <span className="button-basket__text text-blue">Обменять</span>
                <span className="button-basket__rewards">
                      <img src={icon_reward} alt="reward"/>
                      <span className="button-basket__count">260</span>
                </span>
            </button>

        </div>
    );
};

