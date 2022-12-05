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
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks';
import { challengeSelector, getChallengeById } from '../../Redux/slice/challengeSlice';
import { definitionColor } from '../../utils/common-functions';

export const ActiveChallengePage = () => {

    const params = useParams()
    const dispatch = useAppDispatch()
    const challenge = useAppSelector(challengeSelector)

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
            title: challenge?.type === 1 ? 'Шагов для завершения' : 'Километров для завершения',
            value: 0,
            text: challenge?.purpose?.quantity +'к',
            id: 1
        },
        {
            title: 'Обучающий материал',
            value: challenge?.homeworks || 0,
            text:  challenge?.total_lessons + ' лекции',
            id: 2
        },
        {
            title: 'Домашние задания',
            value: challenge?.homeworks || 0,
            text: challenge?.total_lessons +' ДЗ',
            id: 3
        },
    ]

    useEffect(() => {
        dispatch(getChallengeById(Number(params.id)))
    }, [])


    return (
        <div className={'active-challenge-page'}>
            <Header title={'Челлендж'} customClass={'active-challenge-page__header'}/>
            <div className='active-challenge-page__main'>
                <HeaderChallenge type={challenge?.type || 1} image={challenge?.image || ''} title={challenge?.title || ''} newChallengeCategory/>
            </div>
            <div className='active-challenge-page__progress'>
                <div className={definitionColor(challenge?.type || 1,'active-challenge-page__title-17') + " title-17"}>
                    Общий прогресс <span>0%</span> / 100%
                </div>
                <ProgressBar percent={0} type={challenge?.type || 1}/>
            </div>
            <div className="active-challenge-page__tasks tasks-active-challenge">
                <div className="tasks-active-challenge__head">
                    <div className="tasks-active-challenge__title-17 title-17">Челлендж закончится:</div>
                    <div className="tasks-active-challenge__data"><img src={icon_clock} alt=""/>{challenge?.end_date && new Date(challenge?.end_date*1000).toLocaleDateString()}</div>
                </div>
                <TaskChallenge type={challenge?.type || 1} tasks={itemsTask}/>
            </div>
            <div className='active-challenge-page__reward'>
                Награда:  <RewardCount count={challenge?.purpose?.reward || 0} />
            </div>
            <Link to={LECTURES_ROUTE+'/'+params.id}  className="active-challenge-page__button _button-yellow">Лекции и домашнее задание</Link>
            <div className="active-challenge-page__title-block block-title">Лидеры челленджа</div>
            <ListLeadersChallenge items={itemsLeaders} role={roles.commands}/>
        </div>
    );
};

