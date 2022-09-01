import React, {useEffect, useState} from 'react';
import Header from "../../Components/Header/Header";
import {HeaderChallenge} from "../../Components/Active-challenge/Header-challenge";
import {ListLeadersChallenge} from "../../Components/List-leaders-challenge/List-leaders-challenge";
import {roles, typesChallenge} from "../../types/enums";
import './active-challenge-page.scss'
import {TaskChallenge} from "../../Components/Challenge/Task-challenge";
import {ProgressBar} from "../../Components/Progress-bar/Progress-bar";
import {ShopCard} from "../../Components/Shop/Shop-card";
import {RewardCount} from "../../Components/Reward/Reward-count";
import {Link, useParams} from "react-router-dom";
import {LECTURES_ROUTE} from "../../provider/constants-route";
import icon_clock from '../../assets/image/Interesting/clock.svg'

export const ActiveChallengePage = () => {

    const params = useParams()

    console.log(params)

    const itemsLeaders = [
        {
            reward: 40,
            place: 1,
            isYourCommand: true,
            avatar: 'https://e7.pngegg.com/pngimages/36/880/png-clipart-avatar-series-wykop-pl-designer-graphic-artist-designer-face-cartoon.png',
            title: 'Команда №1'
        },
        {
            reward: 40,
            place: 2,
            isYourCommand: false,
            avatar: 'https://avatars.mds.yandex.net/i?id=3fd93707d9fb159c82e4a25dc15d9e2c-4885166-images-thumbs&n=13&exp=1',
            title: 'Команда №2',
        },
    ]

    const itemsTask = [
        {
            title: 'Обучающий материал',
            value: '50',
            id: 454
        },
        {
            title: 'Обучающий материал',
            value: '4100',
            id: 43
        },
        {
            title: 'Обучающий материал',
            value: 'va10lue',
            id: 45245
        },
        {
            title: 'Обучающий материал',
            value: 'va10lue',
            id: 475
        }
    ]


    return (
        <div className={'active-challenge-page'}>
            <Header title={'Челлендж'} />
            <div className='active-challenge-page__main'>
                <HeaderChallenge/>
            </div>
            <div className='active-challenge-page__progress'>
                <div className="active-challenge-page__title-17 title-17">
                    Общий прогресс <span>86%</span> / 100%
                </div>
                <ProgressBar percent={86} type={typesChallenge.common}/>
            </div>
            <div className="active-challenge-page__tasks tasks-active-challenge">
                <div className="tasks-active-challenge__head">
                    <div className="tasks-active-challenge__title-17 title-17">Челлендж закончится:</div>
                    <div className="tasks-active-challenge__data"><img src={icon_clock} alt=""/>01.03.22</div>
                </div>
                <TaskChallenge type={typesChallenge.common} tasks={itemsTask}/>
            </div>
            <div className='active-challenge-page__reward'>
                Награда:  <RewardCount count={95} />
            </div>
            <Link to={LECTURES_ROUTE}  className="active-challenge-page__button _button-yellow">Лекции и домашнее задание</Link>
            <div className="active-challenge-page__title-block block-title">Лидеры челленджа</div>
            <ListLeadersChallenge items={itemsLeaders} role={roles.commands}/>
        </div>
    );
};

