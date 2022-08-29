import React, {useState} from 'react';
import {getItemsHour, getItemsMinutes, getItemsWeight} from "../../utils/common-functions";
import Header from "../../Components/Header/Header";
import {ScrollPicker} from "../../Components/Scroll-picker/Scroll-picker";
import './goal-sleep.scss'

export const GoalSleep = () => {

    const itemsHour = getItemsHour()
    const itemsMinutes = getItemsMinutes()
    const [hour, setHour] = useState<string>(12+'')
    const [minutes, setMinutes] = useState<string>(30+'')

    const changeHour = (value: string) => setHour(value)
    const changeMinutes= (value: string) => setMinutes(value)

    return (
        <div className={'goal-sleep'}>
            <Header title={'Цель сон'}/>
            <div className="goal-sleep__title main-title">Во сколько вы <br/>просыпаетесь?</div>

            <div className="goal-sleep__digits">
                <div className="goal-sleep__digits-item">
                    <ScrollPicker onChange={changeHour} items={itemsHour} value={hour} totalHeight={77} size={1} customClassname={'clock'} fontSize={44}/>
                </div>
                <div className={''}>:</div>
                <div className="goal-sleep__digits-item">
                    <ScrollPicker onChange={changeMinutes} items={itemsMinutes} value={minutes} size={1} totalHeight={77} fontSize={44} customClassname={'clock'}/>
                </div>


            </div>

            <div className="goal-sleep__recommendation small-text">Оптимальное время засыпания: <span className='text-blue'>22:30</span></div>
            <button className="goal-sleep__button _button-white">Установить</button>
        </div>
    );
};

