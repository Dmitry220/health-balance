import React, {FC} from 'react';
import './target.scss'
import icon_status_full from '../../assets/image/icon_purpose__status_full.svg'
import {Link} from "react-router-dom";
import {NEW_TARGET_ROUTE} from "../../provider/constants";


export const Target = () => {

    return (
        <div className={'target'}>
            <div className="target__container">
                <div className="target__header">
                    <div className="target__title">
                        Цель - <span>10 000</span>
                    </div>
                    <Link to={NEW_TARGET_ROUTE} className="target__change">изменить цель</Link>
                </div>
                <div className="target__body">
                    <CircleDays title={'Пн'} percent={10}/>
                    <CircleDays title={"Вт"} percent={40}/>
                    <CircleDays title={"Ср"} percent={100}/>
                    <CircleDays title={"Чт"} percent={100}/>
                    <CircleDays title={"Пт"} percent={80}/>
                    <CircleDays title={"Сб"} percent={0}/>
                    <CircleDays title={"Вс"} percent={100}/>
                </div>
            </div>
        </div>
    );
};

interface IDays {
    title: string,
    percent: number
}

export const CircleDays:FC<IDays> = ({title,percent}) => {


    const circleOutlineLength: number = 295

    return (
        <div className="target__days days">
            {percent === 100 ?
                <img src={icon_status_full} alt="" className="days__circle"/>
                :
            <svg className="days__circle" viewBox="0 0 100 100">
                <path d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
                fill={'#191919'}
                stroke={'#999999'}
                strokeWidth={2}
                id={'dfg'}
                >
                </path>
                <path d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
                stroke={"#56CCF2"}
                strokeWidth={2}
                fillOpacity={0}
                style={{strokeDasharray: '295.416, 295.416',
                strokeDashoffset: circleOutlineLength - (circleOutlineLength * percent / 100)}}
                >
                </path>
                </svg>
            }
            <div className="days__text">{title}</div>
        </div>
    )
}
