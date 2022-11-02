import React, {ChangeEvent, useState} from 'react';
import './auth.scss'
import {Link} from "react-router-dom";
import logo from '../../assets/image/Logo.svg'
import appleIcon from '../../assets/image/auth/appleIcon.svg'
import {ACCESS_RECOVERY__ROUTE, REGISTRATION_ROUTE} from "../../provider/constants-route";
import { useAppDispatch } from '../../utils/hooks/redux-hooks';
import { sendLogin } from '../../Redux/slice/registrationSlice';

export const Auth = () => {

    const [email, setEmail] = useState<string>('dk@gmail.com')
    const [password, setPassword] = useState<string>('qwerrty123')

    const dispatch = useAppDispatch()

    const handlerLogin = (e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlerPassword= (e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    const submit = () => {        
        dispatch(sendLogin({email, password}))
    }

    return (
        <div className={'auth'}>
            <div className="auth__content">
                <div className="auth__logo">
                    <img src={logo} alt=""/>
                </div>
                <div className="auth__form form-auth">
                    <div className="form-auth__fields">
                        <input type="text" className="form-auth__field" placeholder={'Email'} value={email} onChange={handlerLogin}/>
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
