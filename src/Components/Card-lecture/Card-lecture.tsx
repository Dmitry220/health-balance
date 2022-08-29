import React, {FC} from 'react';
import './card-lecture.scss'
import icon from '../../assets/image/icon_reward.svg'

interface ICardLecture {
    img: string,
    title: string,
    date: string,
    reward: number
}

const CardLecture: FC<ICardLecture> = ({date, img, reward, title}) => {
    return (
        <div className={'card-lecture'}>
            <div className="card-lecture__image">
                <img src={img} alt="image"/>
            </div>
            <div className="card-lecture__info">
                <div className="card-lecture__title">
                    {title}
                </div>
                <div className="card-lecture__date">
                    Выполнить до {date}
                </div>
                <div className="card-lecture__reward reward">
                    Награда:
                    <img className='reward__icon' src={icon} alt="icon"/>
                    <span className='reward__count'>{reward}</span>
                </div>
            </div>
        </div>
    );
};

export default CardLecture;