import React, {FC} from 'react';
import './header-active.scss'
import icon from '../../assets/image/icon_reward.svg'
import {RewardCount} from "../Reward/Reward-count";
import icon_chat from '../../assets/image/icon_chat.svg'
import {Link} from "react-router-dom";
import {CHAT__ROUTE} from "../../provider/constants";

interface IHeaderActive{
    transparent: boolean
}

const HeaderActive:FC<IHeaderActive> = ({transparent}) => {
    return (
        <div className={'header-active'} style={{background: transparent ? "transparent" : "#121212"}}>
            <div className="header-active__container">
                <div className="header-active__column">
                    <div className="header-active__avatar">
                        <img src="https://w-dog.ru/wallpapers/3/19/345083118206129/sportsmenka-devushka-begovaya-dorozhka.jpg" alt=""/>
                    </div>
                    <div className="header-active__user-name icon-icon_back">Усейн болт</div>
                </div>
                <div className="header-active__column">
                    {/*<div className="header-active__icon-reward">*/}
                    {/*    <img src={icon} alt=""/>*/}
                    {/*</div>*/}
                    {/*<div className="header-active__value">365</div>*/}
                    {transparent ?   <RewardCount count={365} /> :   <Link to={CHAT__ROUTE}><img src={icon_chat} alt=""/></Link>}
                </div>
            </div>
        </div>
    );
};

export default HeaderActive;