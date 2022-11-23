import React from 'react';
import './creating-challenge.scss'
import icon_reward from '../../assets/image/icon_reward.svg'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks';
import { quantityPurposeSelector, rewardPurposeSelector, setQuantityPurpose, setRewardPurpose, setTypePurpose } from '../../Redux/slice/challengeSlice';

export const CreatingTargets = () => {

    const minReward = 0
    const maxReward = 200
    const minDistance = 0
    const maxDistance = 50

    const dispatch = useAppDispatch()

    const handlerTargetRange = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuantityPurpose(+e.target.value))       
    }

    const handlerRewardRange = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRewardPurpose(+e.target.value))      
    }

    const handlerTypePurpose = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTypePurpose(+e.target.value))      
    }
    const reward = useAppSelector(rewardPurposeSelector)
    const quantity = useAppSelector(quantityPurposeSelector)

    return (
        <div className={'targets'}>
            <div className="targets__top-block">
                <div className="targets__title creating-title">Цели</div>
                <div className="targets__sub-title creating-sub-title">Тип цели</div>
                <div className="targets__checkbox custom-checkbox" onChange={handlerTypePurpose}>
                    <input type="radio" name='typeReward' className={'custom-checkbox__checkbox'} id={'1'} defaultChecked value={1}/>
                    <label htmlFor="1">Бег</label>
                    <input type="radio" name='typeReward' className={'custom-checkbox__checkbox'} id={'2'} value={2}/>
                    <label htmlFor="2">Ходьба</label>
                </div>
            </div>
            <div className="targets__block">
                <div className="targets__choice choice-target">
                    <div className="choice-target__head">
                        <div className="choice-target__sub-title creating-sub-title">Цель челленджа</div>
                        <div className="choice-target__value creating-title">{quantity} км</div>
                    </div>
                    <input
                        min={minDistance}
                        max={maxDistance}
                        type="range" className={'choice-target__range '} value={quantity} onChange={handlerTargetRange}
                        style={{ backgroundImage: `linear-gradient( to right, #F2994A, 
                        #F4C319 ${100*+quantity/maxDistance}%, 
                        #474747 ${100*+quantity/maxDistance}%)`}}
                    />
                </div>

                <div className="targets__title creating-title">Награда</div>

                <div className="targets__choice-target choice-target">
                    <div className="choice-target__head">
                        <div className="choice-target__sub-title creating-sub-title">Количество <img src={icon_reward} alt="icon reward"/></div>
                        <div className="choice-target__value creating-title">{reward}</div>
                    </div>
                    <input
                        min={minReward}
                        max={maxReward}
                        type="range" className={'choice-target__range green'}
                        value={reward}
                        onChange={handlerRewardRange}
                        style={{backgroundImage: `linear-gradient( to right, #00A62E, 
                        #3CF470 ${100*+reward/maxReward}%, 
                        #474747 ${100*+reward/maxReward}% )`}}
                    />
                </div>
            </div>
        </div>
    );
};

