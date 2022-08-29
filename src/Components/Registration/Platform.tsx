import {useAppDispatch} from "../../Redux/hooks";
import React from "react";
import {setDisabledButton} from "../../Redux/slice/registrationSlice";
import {Link} from "react-router-dom";

export const Platform = () => {

    const dispatch = useAppDispatch()

    const handlerAgree = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setDisabledButton(false))

    return (
        <div className={'registration__platform'}>
            <div className="registration__select _custom-select">
                <select name="platform" id="platform">
                    <option>Ваша платформа</option>
                </select>
            </div>
            <hr className={'registration__line'}/>
            <div className="registration__necessarily">Обязательно</div>
            <div className="registration__confidentiality confidentiality-block">
                <div className="confidentiality-block__row custom-radio">
                    <input type="checkbox" id={'agree'} className={'custom-radio__checkbox'}
                           onChange={handlerAgree}/>
                    <label htmlFor={'agree'} className="confidentiality-block__text">Я принимаю условия
                        использования и Политику <br/>
                        конфиденциальности Health Balance</label>
                </div>
                <Link to={'/'} className="confidentiality-block__text yellow">Условия использования</Link>
                <Link to={'/'} className="confidentiality-block__text yellow">Политика
                    конфиденциальности</Link>
            </div>
        </div>
    )
}