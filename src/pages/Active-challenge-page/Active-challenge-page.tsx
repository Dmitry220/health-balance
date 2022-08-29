import React, {useEffect, useState} from 'react';
import Header from "../../Components/Header/Header";
import {HeaderChallenge} from "../../Components/Active-challenge/Header-challenge";
import {ListLeadersChallenge} from "../../Components/List-leaders-challenge/List-leaders-challenge";
import {roles, typesChallenge} from "../../types/enums";
import './active-challenge-page.scss'
import {TaskChallenge} from "../../Components/Challenge/Task-challenge";
import {ProgressBar} from "../../Components/Progress-bar/Progress-bar";
import {RewardCard} from "../../Components/Reward/Reward-card";
import {RewardCount} from "../../Components/Reward/Reward-count";
import {Link} from "react-router-dom";
import {LECTURES_ROUTE} from "../../provider/constants";
import icon_clock from '../../assets/image/Interesting/clock.svg'

export const ActiveChallengePage = () => {

    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    console.log(scrollPosition)

    useEffect(() => {
        // window.addEventListener('scroll', handleScroll);
        //
        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        // };


    }, [])

    const itemsLeaders = [
        {
            reward: 40,
            place: 1,
            isYourCommand: true,
            avatar: 'https://e7.pngegg.com/pngimages/36/880/png-clipart-avatar-series-wykop-pl-designer-graphic-artist-designer-face-cartoon.png',
            title: 'Усейн Болт',
            isYou: false,
        },
        {
            reward: 40,
            place: 2,
            isYourCommand: false,
            avatar: 'https://avatars.mds.yandex.net/i?id=3fd93707d9fb159c82e4a25dc15d9e2c-4885166-images-thumbs&n=13&exp=1',
            title: 'Усейн Болт',
            isYou: true,
        },
    ]

    const itemsTask = [
        {
            title: 'Обучающий материал',
            value: '50'
        },
        {
            title: 'Обучающий материал',
            value: '4100'
        },
        {
            title: 'Обучающий материал',
            value: 'va10lue'
        },
        {
            title: 'Обучающий материал',
            value: 'va10lue'
        }
    ]

    return (
        <div className={'active-challenge-page'}>
            <Header title={'Челлендж'} customClass={scrollPosition <= 257 ? 'ds' : ''}/>
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
            <ListLeadersChallenge items={itemsLeaders} role={roles.commands}/>
            <ListLeadersChallenge items={itemsLeaders} role={roles.commands}/>
            <ListLeadersChallenge items={itemsLeaders} role={roles.commands}/>
            <ListLeadersChallenge items={itemsLeaders} role={roles.commands}/>
            <ListLeadersChallenge items={itemsLeaders} role={roles.commands}/>
        </div>
    );
};

