import React, {FC} from 'react';
import logo from '../../assets/image/Logo-dark.svg'
import {definitionColor} from "../../utils/common-functions";
import {Link} from "react-router-dom";
import {NEW_CHALLENGE_INFO_ROUTE} from "../../provider/constants-route";

interface INewChallengeCard {
    type: number,
    id: number
}

export const NewChallengeCard:FC<INewChallengeCard> = ({type, id}) => {
    return (
        <Link to={NEW_CHALLENGE_INFO_ROUTE+'/'+id} className={'new-board'}>
            <div className="new-board__image">
                <div className={definitionColor(type, '_hint')}>{type}</div>
                <img src="https://a.d-cd.net/55199ads-1920.jpg" alt="image-new-board"/>
            </div>
            <div className="new-board__body">
                <div className={definitionColor(type, 'new-board__icon')}>
                    <img src={logo} alt="icon"/>
                </div>
                <div className="new-board__description">
                    <div className="new-board__title">
                        Мой первый челлендж в Health Balance!
                    </div>
                    <div className="new-board__text">
                        Сделайте первый шаг к здоровому, активному будущему
                    </div>
                </div>
            </div>
        </Link>
    );
};

