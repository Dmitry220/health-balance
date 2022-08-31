import React from 'react';
import Header from "../../Components/Header/Header";
import {BasketCard} from "../../Components/Basket/Basket-card";
import './basket-page.scss'
import {useNavigate} from "react-router-dom";
import {MAKING_ORDER_ROUTE} from "../../provider/constants-route";
import {ShopButton} from "../../Components/Shop/Shop-button";

export const BasketPage = () => {

    const navigate = useNavigate()

    const exchange = () => {
        navigate(MAKING_ORDER_ROUTE)
    }

    return (
        <div className={'basket-page'}>
            <Header title={'Корзина'}/>
            <div className="basket-page__cards">
                <div className="basket-page__card"><BasketCard/></div>
                <div className="basket-page__card"><BasketCard/></div>
                <div className="basket-page__card"><BasketCard/></div>
            </div>
            <div className="basket-page__button">
                <div className="basket-page__text-danger">На вашем счете недостаточно монет</div>
                <ShopButton title={'Обменять'} rewardCount={260} onClick={exchange}/>
            </div>


        </div>
    );
};

