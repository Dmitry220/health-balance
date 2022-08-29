import React from 'react';
import './new-challenge-info.scss'
import Header from "../../Components/Header/Header";
import {HeaderChallenge} from "../../Components/Active-challenge/Header-challenge";
import {ProgressBar} from "../../Components/Progress-bar/Progress-bar";
import {roles, typesChallenge} from "../../types/enums";
import icon_clock from "../../assets/image/Interesting/clock.svg";
import {TaskChallenge} from "../../Components/Challenge/Task-challenge";
import {RewardCount} from "../../Components/Reward/Reward-count";
import {Link} from "react-router-dom";
import {LECTURES_ROUTE, TEAM_SELECTION_ROUTE} from "../../provider/constants";
import {ListLeadersChallenge} from "../../Components/List-leaders-challenge/List-leaders-challenge";
import icon_edit from "../../assets/image/icon-edit.svg";

export const NewChallengeInfo = () => {

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

    return (
        <div className={'new-challenge-info'}>
            <Header title={'Челлендж'} />
            <div className='new-challenge-info__main'>
                <HeaderChallenge/>
            </div>
            <div className="new-challenge-info__description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit
            </div>
            <div className="new-challenge-info__row">
                <div className="new-challenge-info__data">
                    <img className={'new-challenge-info__data-clock'} src={icon_clock} alt=""/>
                    15.01.22 - 01.03.22
                </div>
                <div className="new-challenge-info__reward">
                    <div className="new-challenge-info__reward-text">Награда:</div>
                    <RewardCount count={95} />
                </div>
            </div>
            <div className="new-challenge-info__title-block block-title">Задания</div>
            <div className="new-challenge-info__tasks">
                <TaskChallenge type={typesChallenge.common} tasks={itemsTask}/>
            </div>
            <Link className="new-challenge-info__button _button-white" to={TEAM_SELECTION_ROUTE}>Принять участие</Link>

            <div className="new-challenge-info__title-block block-title">Лидеры челленджа</div>
            <ListLeadersChallenge items={itemsLeaders} role={roles.members}/>
        </div>
    );
};
