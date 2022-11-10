import React, {useEffect, useState} from 'react';
import './profile.scss'
import Header from "../../Components/Header/Header";
import icon_reward from '../../assets/image/icon_reward.svg'
import {Link} from "react-router-dom";
import {EDITING_ROUTE} from "../../provider/constants-route";
import {ProfileSteps} from "../../Components/Profile/Profile-steps";
import {ProfileChallenge} from "../../Components/Profile/Profile-challenge";
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks';
import { dataUserSelector, setUserData, updateProfile } from '../../Redux/slice/userSlice';
import { logout } from '../../Redux/slice/authSlice';


export const Profile = () => {

    const dataUser = useAppSelector(dataUserSelector)

    const dispatch = useAppDispatch()

    const idUser = Number(localStorage.getItem("id"))   

    useEffect(()=>{
        dispatch(setUserData(idUser))
    }, [])  

    console.log('render');   
    
//     var reader = new FileReader();
// reader.readAsDataURL(new Blob([new Uint8Array()]));
// reader.onloadend = function() {
//   var base64data = reader.result;
//   this.setState({ base64ImageData: base64data })
// }
//myImage.src = URL.createObjectURL(dataUser.avatar);

    return (
        <div className={'profile'}>
            <Header title={'Мой профиль'}/>
            <div className="profile__block">
                <div className="profile__header">
                    <div className="profile__avatar">
                        <img                       
                            src={dataUser.avatar}
                            alt="avatar"/>
                    </div>
                    <div className="profile__user-info">
                        <div className="profile__user-name">
                            {dataUser.name}
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
                <div className="profile__out" onClick={()=>dispatch(logout())}>Выйти из аккаунта</div>
            </div>
        </div>
    );
};
