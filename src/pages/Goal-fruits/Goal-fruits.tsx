import React, {useState} from 'react';
import Header from "../../Components/Header/Header";
import './goal-fruits.scss'

export const GoalFruits = () => {

    const [countFruits, setCountFruits] = useState<number>(0)

    const addCountFruits = () => setCountFruits((prev)=>prev+1)
    const decreaseCountFruits = () => {
        if(countFruits >0) {
            setCountFruits((prev) => prev - 1)
        }
    }

    return (
        <div className={'goal-fruits'}>
            <Header title={'Цель фрукты'}/>
            <div className="goal-fruits__title main-title">Количество <br/> фруктов/овощей</div>
            <div className="goal-fruits__digits digits">
                <div onClick={decreaseCountFruits}>-</div>
                <div className="digits__square">
                    {countFruits >=10 ? countFruits : '0'+countFruits}
                </div>
                <div onClick={addCountFruits}>+</div>
            </div>
            <button className="goal-fruits__button _button-white">Установить</button>
        </div>
    );
};
