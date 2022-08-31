import React, {FC} from 'react';
import {RewardCount} from "../Reward/Reward-count";
import {Link} from "react-router-dom";
import {BASKET_ROUTE} from "../../provider/constants-route";
import basket from "../../assets/image/icon_cart.svg";
import './shop.scss'

interface IShopHead {
    marginBottom?: number
}

export const ShopHead:FC<IShopHead> = ({marginBottom}) => {
    return (
        <div className="shop-head" style={{marginBottom: marginBottom}}>
            <div className="shop-head__title title-17">
                <span>Ваш баланс:</span><RewardCount count={365} />
            </div>
            <Link to={BASKET_ROUTE} className="shop-head__link">
                <span className='shop-head__purchases text-blue'>Мои покупки</span>
                <img src={basket} alt="basket"/>
                <span className={'shop-head__img-before active'}/>
            </Link>
        </div>
    );
};
