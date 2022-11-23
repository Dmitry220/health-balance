import React, {FC} from 'react';
import './challenge.scss'
import {definitionColor} from "../../utils/common-functions";
import {ProgressBar} from "../Progress-bar/Progress-bar";
import {typesChallenge} from "../../types/enums";
import {Link} from "react-router-dom";
import {ACTIVE_CHALLENGE_ROUTE} from "../../provider/constants-route";

interface ICardChallenge {
    type: number,
    percent: number,
    id: number
}

export const CardChallenge: FC<ICardChallenge> = ({percent,type, id}) => {



    return (
        <Link to={ACTIVE_CHALLENGE_ROUTE+'/'+id} className={'card-challenge'}>
            <div className="card-challenge__container">
                <div className="card-challenge__dots">
                    <div className="card-challenge__dot" />
                    <div className="card-challenge__dot" />
                    <div className="card-challenge__dot" />
                </div>
                <div className="card-challenge__head">
                    <div className="card-challenge__img">
                        <img src="https://a.d-cd.net/55199ads-1920.jpg" alt="challenge-image"/>
                    </div>
                    <div className="card-challenge__head-body">
                        <div className={definitionColor(type,'card-challenge__type')}>{type}</div>
                        <div className="card-challenge__title">
                            Российский марафон “Зимние забавы”
                        </div>
                        <div className="card-challenge__sub-title">
                            Вы в команде “Hardcore”
                        </div>
                    </div>

                </div>
                <div className="card-challenge__progress-bar">
                   <ProgressBar percent={percent} type={typesChallenge.common}/>
                   <div className={'progress-bar__value'}>{percent}%</div>
                </div>
                <div className="card-challenge__data">
                    <div className="card-challenge__days">12 <span>Дней</span></div>
                    <div className="card-challenge__days">200К <span>Шагов</span></div>
                    <div className="card-challenge__days">0/2 <span>Лекций</span></div>
                    <div className="card-challenge__days">1/2 <span>Заданий</span></div>
                </div>
            </div>
        </Link>
    );
};

