import React, {useState} from 'react';
import './profile.scss'
import Header from "../../Components/Header/Header";
import icon_reward from '../../assets/image/icon_reward.svg'
import {Link} from "react-router-dom";
import {EDITING_ROUTE} from "../../provider/constants-route";
import {ProfileSteps} from "../../Components/Profile/Profile-steps";
import {ProfileChallenge} from "../../Components/Profile/Profile-challenge";

export const Profile = () => {


    return (
        <div className={'profile'}>
            <Header title={'Мой профиль'}/>
            <div className="profile__block">
                <div className="profile__header">
                    <div className="profile__avatar">
                        <img
                            src="https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1"
                            alt="avatar"/>
                    </div>
                    <div className="profile__user-info">
                        <div className="profile__user-name">
                            Усейн Болт
                        </div>
                        <Link to={EDITING_ROUTE} className="profile__link text-blue">Редактировать</Link>
                    </div>
                </div>
                <div className="profile__buttons">
                    <button className="profile__button-balance">
                        Баланс: 365 <img src={icon_reward} alt="reward"/>
                    </button>
                    <button className="_button-white">Обменять</button>
                </div>
            </div>
            <div className="profile__block">
                <ProfileSteps steps={237456} kilometer={456}/>
            </div>
            <div className="profile__block">
                <ProfileChallenge />
            </div>
            <div className="profile__block">
                <div className="profile__out">Выйти из аккаунта</div>
            </div>
        </div>
    );
};
