import React from 'react';
import './profile.scss'
import {Link} from "react-router-dom";
import {CHAT__ROUTE} from "../../provider/constants-route";
import icon_chat from "../../assets/image/icon_chat.svg";

export const ProfileMemberHead = () => {
    return (
        <div className={'profile-member-head'}>
            <div className="profile-member-head__row">
                <div className="profile-member-head__column">
                    <div className="profile-member-head__avatar">
                        <img
                            src="https://i2.wp.com/www.easttamakidentist.co.nz/wp-content/uploads/2016/10/male-member-placeholder-1.jpg?fit=800%2C800&ssl=1"
                            alt="avatar"/>
                    </div>
                    <div className="profile-member-head__user-name title">Усейн Болт</div>
                </div>
                <div className="profile-member-head__column">
                    <Link to={CHAT__ROUTE}><img src={icon_chat} alt="chat"/></Link>
                </div>
            </div>
            <div className="profile-member-head__row">
                <button className="profile-member-head__button _button-dark-yellow">Добавить в общий чат</button>
            </div>
        </div>
    );
};

