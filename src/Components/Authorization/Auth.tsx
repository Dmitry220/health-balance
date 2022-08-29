import React, {ChangeEvent, useState} from 'react';
import './auth.scss'
import {Link} from "react-router-dom";
import logo from '../../assets/image/Logo.svg'
import appleIcon from '../../assets/image/auth/appleIcon.svg'
import {ACCESS_RECOVERY__ROUTE, REGISTRATION_ROUTE} from "../../provider/constants-route";

export const Auth = () => {

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handlerLogin = (e:ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)
    const handlerPassword= (e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    const submit = () => {
        console.log(login, password)
    }

    return (
        <div className={'auth'}>
            <div className="auth__content">
                <div className="auth__logo">
                    <img src={logo} alt=""/>
                </div>
                <div className="auth__form form-auth">
                    <div className="form-auth__fields">
                        <input type="text" className="form-auth__field" placeholder={'Логин'} value={login} onChange={handlerLogin}/>
                        <input type="text" className="form-auth__field" placeholder={'Пароль'} value={password} onChange={handlerPassword}/>
                    </div>
                    <div className="form-auth__buttons">
                        <button className="form-auth__button" onClick={submit}>Войти</button>
                        <button className="form-auth__button transparent"><img src={appleIcon} alt="apple"/>Войти через Apple ID</button>
                    </div>
                    <Link to={ACCESS_RECOVERY__ROUTE} className="form-auth__link link-auth">Забыли пароль?</Link>
                </div>
                <div className="auth__links">
                    <Link to={REGISTRATION_ROUTE} className={'auth__link link-auth'}>У вас ещё нет аккаунта?</Link>
                    <Link to={REGISTRATION_ROUTE} className={'auth__link link-auth yellow'}>Регистрация</Link>
                </div>
            </div>
        </div>
    );
};
