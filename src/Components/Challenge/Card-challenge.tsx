import React, { FC } from 'react';
import './challenge.scss'
import { definitionColor, typeConversion } from "../../utils/common-functions";
import { ProgressBar } from "../Progress-bar/Progress-bar";
import { typesChallenge } from "../../types/enums";
import { Link } from "react-router-dom";
import { ACTIVE_CHALLENGE_ROUTE } from "../../provider/constants-route";
import { IChallengeCard } from '../../models/IChallenge';
import { IMAGE_URL } from '../../http';

interface ICardChallenge {
    challenge: IChallengeCard
    percent: number,

}

export const CardChallenge: FC<ICardChallenge> = ({ percent, challenge }) => {



    return (
        <Link to={ACTIVE_CHALLENGE_ROUTE + '/' + challenge.id} className={'card-challenge'}>
            <div className="card-challenge__container">
                <div className="card-challenge__dots">
                    <div className="card-challenge__dot" />
                    <div className="card-challenge__dot" />
                    <div className="card-challenge__dot" />
                </div>
                <div className="card-challenge__head">
                    <div className="card-challenge__img">
                        <img src={IMAGE_URL + 'challenges/' + challenge.image} alt="challenge-image" />
                    </div>
                    <div className="card-challenge__head-body">
                        <div className={definitionColor(challenge.type, 'card-challenge__type')}>{typeConversion(challenge.type)}</div>
                        <div className="card-challenge__title">
                            {challenge.title}
                            <div className="card-challenge__sub-title">
                                {challenge.type === 2 ? 'Вы в команде “Hardcore”' : 'Личное задание'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-challenge__progress-bar">
                    <ProgressBar percent={percent} type={challenge.type} />
                    <div className={'progress-bar__value'}>{percent}%</div>
                </div>
                <div className="card-challenge__data">
                    <div className="card-challenge__days">{1} <span>Дней</span></div>
                    <div className="card-challenge__days">{challenge.purpose?.quantity} <span>{ } Шагов</span></div>
                    <div className="card-challenge__days">0/{challenge.total_lessons} <span>Лекций</span></div>
                    <div className="card-challenge__days">0/{challenge.total_lessons} <span>Заданий</span></div>
                </div>
            </div>
        </Link>
    );
};

