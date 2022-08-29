import React from 'react';
import './creating-challenge.scss'
import {useAppDispatch} from "../../Redux/hooks";
import { setTypeChallenge } from '../../Redux/slice/creatingChallengeSlice';

export const TypeChallenge = () => {

    const dispatch = useAppDispatch()

    const handlerType = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setTypeChallenge(e.target.value))

    return (
        <div className={'type-challenge'}>
            <div className="type-challenge__title main-title">Тип челленджа</div>
            <div className="type-challenge__body" onChange={handlerType}>
                <input type="radio" name={'type-challenge'} value={'Личный'} id={'personal'} className="type-challenge__input" />
                <label htmlFor="personal" className="type-challenge__label">Личный</label>
                <input type="radio" name={'type-challenge'} value={'Командный'} className="type-challenge__input" id={'command'}/>
                <label htmlFor="command" className="type-challenge__label command">Командный</label>
            </div>
        </div>
    );
};

