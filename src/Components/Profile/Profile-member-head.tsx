import React from 'react';
import './profile.scss'
import {Link} from "react-router-dom";
import {CHAT__ROUTE, DIALOG__ROUTE} from "../../provider/constants-route";
import icon_chat from "../../assets/image/icon_chat.svg";
import { useAppSelector } from '../../utils/hooks/redux-hooks';
import { infoUserSelector } from '../../Redux/slice/userSlice';
import { IMAGE_URL } from '../../http';

export const ProfileMemberHead = () => {

    const infoUser = useAppSelector(infoUserSelector)

    return (
        <div className={'profile-member-head'}>
            <div className="profile-member-head__row">
                <div className="profile-member-head__column">
                    <div className="profile-member-head__avatar">                   
                        <img
                            src={IMAGE_URL+"avatars/" + infoUser.avatar}
                            alt="avatar"/>
                    </div>
                    <div className="profile-member-head__user-name title">{infoUser.name}</div>
                </div>
                <div className="profile-member-head__column">
                    <Link to={DIALOG__ROUTE+'/'+infoUser.id}><img src={icon_chat} alt="chat"/></Link>
                </div>
            </div>
            <div className="profile-member-head__row">
                <button className="profile-member-head__button _button-dark-yellow">Добавить в общий чат</button>
            </div>
        </div>
    );
};

