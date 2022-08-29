import React from 'react';
import Header from "../../Components/Header/Header";
import {RewardCard} from "../../Components/Reward/Reward-card";
import './reward-page.scss'

export const RewardPage = () => {
    return (
        <div className={'reward-page'}>
            <Header title={'Награда'} />
            <div className="reward-page__cards">
                <div className="reward-page__item-card"> <RewardCard /></div>
                <div className="reward-page__item-card"> <RewardCard /></div>
                <div className="reward-page__item-card"> <RewardCard /></div>
                <div className="reward-page__item-card"> <RewardCard /></div>
            </div>


        </div>
    );
};
