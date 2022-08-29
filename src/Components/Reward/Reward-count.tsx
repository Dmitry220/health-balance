import React, {FC} from 'react';
import icon from "../../assets/image/icon_reward.svg";
import './reward.scss'

interface IReward {
    count: number
}

export const RewardCount:FC<IReward> = ({count}) => {
    return (
        <div className={'reward-count'}>
            <img className='reward-count__icon' src={icon} alt="icon"/>
            <span className='reward-count__value'>{count}</span>
        </div>
    );
};

