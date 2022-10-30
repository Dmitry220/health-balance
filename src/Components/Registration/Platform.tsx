import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux-hooks";
import React, {useEffect, useState} from "react";
import {getPlatforms, listPlatformSelector, setDisabledButton, setPlatform} from "../../Redux/slice/registrationSlice";
import {Link} from "react-router-dom";

export const Platform = () => {

    const dispatch = useAppDispatch()
    const listPLatforms = useAppSelector(listPlatformSelector)
    const [agree, setAgree] = useState(false)

    const handlerAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgree(prev=>!prev)
        dispatch(setDisabledButton(agree))
    }

    const handlerPlatforms = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPlatform(e.target.value))
    }

    useEffect(()=>{
       dispatch(getPlatforms())   
    }, [])
    

    return (
        <div className={'registration__platform'}>
            <div className="registration__select _custom-select">
                <select name="platform" id="platform" onChange={handlerPlatforms}>
                    <option value="" selected disabled hidden>Ваша платформа</option>
                    {
                        listPLatforms && listPLatforms.map(p=>(
                            <option value={p.id} key={p.id}>{p.title}</option>
                        ))
                    }
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