import React, { useEffect } from 'react';
import './new-challenge-info.scss'
import Header from "../../Components/Header/Header";
import { HeaderChallenge } from "../../Components/Active-challenge/Header-challenge";
import { ProgressBar } from "../../Components/Progress-bar/Progress-bar";
import { roles, typesChallenge } from "../../types/enums";
import icon_clock from "../../assets/image/Interesting/clock.svg";
import { TaskChallenge } from "../../Components/Challenge/Task-challenge";
import { RewardCount } from "../../Components/Reward/Reward-count";
import { Link, useParams } from "react-router-dom";
import { LECTURES_ROUTE, TEAM_SELECTION_ROUTE } from "../../provider/constants-route";
import { ListLeadersChallenge } from "../../Components/List-leaders-challenge/List-leaders-challenge";
import icon_edit from "../../assets/image/icon-edit.svg";
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks';
import { challengeSelector, getChallengeById } from '../../Redux/slice/challengeSlice';
import { definitionColor } from '../../utils/common-functions';

export const NewChallengeInfo = () => {

    const dispatch = useAppDispatch()
    const params = useParams()
    const challenge = useAppSelector(challengeSelector)

    const itemsTask = [
        {
            title: challenge?.type === 1 ? 'Шагов для завершения' : 'Километров для завершения',
            value: 50,
            id: 1
        },
        {
            title: 'Обучающий материал',
            value: challenge?.total_lessons,
            id: 2
        },
        {
            title: 'Домашние задания',
            value: 0,
            id: 3
        },       
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

    useEffect(() => {
        dispatch(getChallengeById(Number(params.id)))
    }, [])

    return (
        <div className={'new-challenge-info'}>
            {
                challenge ? <>
                    <Header title={'Челлендж'} customClass={'new-challenge-info__header'}/>
                    <div className='new-challenge-info__main'>
                        <HeaderChallenge image={challenge.image} title={challenge.title} type={challenge.type}/>
                    </div>
                    <div className="new-challenge-info__description">
                        {challenge?.description}
                    </div>
                    <div className="new-challenge-info__row">
                        <div className={definitionColor(challenge.type, 'new-challenge-info__data')}>
                            <img className={'new-challenge-info__data-clock'} src={icon_clock} alt="" />
                            {new Date(challenge.start_date * 1000).toLocaleDateString() + ' - ' + new Date(challenge?.end_date * 1000).toLocaleDateString()}
                        </div>
                        <div className="new-challenge-info__reward">
                            <div className="new-challenge-info__reward-text">Награда:</div>
                            <RewardCount count={95} />
                        </div>
                    </div>
                    <div className="new-challenge-info__title-block block-title">Задания</div>
                    <div className="new-challenge-info__tasks">
                        <TaskChallenge type={challenge.type} tasks={itemsTask} />
                    </div>
                    <Link className="new-challenge-info__button _button-white" to={TEAM_SELECTION_ROUTE}>Принять участие</Link>
                    {
                    challenge.type === 1 && <> <div className="new-challenge-info__title-block block-title">Лидеры челленджа</div>
                    <ListLeadersChallenge items={itemsLeaders} role={roles.members} /></>
                    }
                  
                </>                    :
                    <h1>Загрузка...</h1>
            }
        </div>
    );
};
