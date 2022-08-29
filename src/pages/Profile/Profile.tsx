import React, {useState} from 'react';
import './profile.scss'
import Header from "../../Components/Header/Header";
import icon_reward from '../../assets/image/icon_reward.svg'
import {Link} from "react-router-dom";
import {EDITING_ROUTE} from "../../provider/constants-route";

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
                        <Link to={EDITING_ROUTE} className="profile__link">Редактировать</Link>
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
                <div className="profile__title">Шаги</div>
                <div className="profile__items-steps">
                    <div className="profile__row">
                        <div className="profile__item-text">За все время</div>
                        <div className="profile__item-text profile__item-text_yellow">2 456 254</div>
                    </div>
                    <div className="profile__row">
                        <div className="profile__item-text">Километров пройденно</div>
                        <div className="profile__item-text profile__item-text_yellow">1965</div>
                    </div>
                </div>
            </div>
            <div className="profile__block">
                <div className="profile__title">Челленджи</div>
                <div className="profile__statistics-challenges">
                    <div className="profile__card-statistics">
                        <div className="profile__value">3</div>
                        <div className="profile__items-text">Активные</div>
                    </div>
                    <div className="profile__card-statistics">
                        <div className="profile__value">16</div>
                        <div className="profile__items-text">Пройдено</div>
                    </div>
                </div>
            </div>
            <div className="profile__block">
                <div className="profile__out">Выйти из аккаунта</div>
            </div>
        </div>
    );
};
