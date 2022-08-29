import React, {useState} from 'react';
import './creating-challenge.scss'
import icon_reward from '../../assets/image/icon_reward.svg'

export const CreatingTargets = () => {

    const minReward = 0
    const maxReward = 200
    const minDistance = 0
    const maxDistance = 50

    const [targetRangeValue, setTargetRangeValue] = useState<string>('0')
    const [rewardRangeValue, setRewardRangeValue] = useState<string>('0')

    const handlerTargetRange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTargetRangeValue(e.target.value)
    }

    const handlerRewardRange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRewardRangeValue(e.target.value)
    }

    return (
        <div className={'targets'}>
            <div className="targets__top-block">
                <div className="targets__title creating-title">Цели</div>
                <div className="targets__sub-title creating-sub-title">Тип цели</div>
                <div className="targets__checkbox custom-checkbox">
                    <input type="checkbox" className={'custom-checkbox__checkbox'} id={'1'}/>
                    <label htmlFor="1">Бег</label>
                    <input type="checkbox" className={'custom-checkbox__checkbox'} id={'2'}/>
                    <label htmlFor="2">Ходьба</label>
                </div>
            </div>
            <div className="targets__block">
                <div className="targets__choice choice-target">
                    <div className="choice-target__head">
                        <div className="choice-target__sub-title creating-sub-title">Цель челленджа</div>
                        <div className="choice-target__value creating-title">{targetRangeValue} км</div>
                    </div>
                    <input
                        min={minDistance}
                        max={maxDistance}
                        type="range" className={'choice-target__range '} value={targetRangeValue} onChange={handlerTargetRange}
                        style={{ backgroundImage: `linear-gradient( to right, #F2994A, 
                        #F4C319 ${100*+targetRangeValue/maxDistance}%, 
                        #474747 ${100*+targetRangeValue/maxDistance}%)`}}
                    />
                </div>

                <div className="targets__title creating-title">Награда</div>

                <div className="targets__choice-target choice-target">
                    <div className="choice-target__head">
                        <div className="choice-target__sub-title creating-sub-title">Количество <img src={icon_reward} alt="icon reward"/></div>
                        <div className="choice-target__value creating-title">{rewardRangeValue}</div>
                    </div>
                    <input
                        min={minReward}
                        max={maxReward}
                        type="range" className={'choice-target__range green'}
                        value={rewardRangeValue}
                        onChange={handlerRewardRange}
                        style={{backgroundImage: `linear-gradient( to right, #00A62E, 
                        #3CF470 ${100*+rewardRangeValue/maxReward}%, 
                        #474747 ${100*+rewardRangeValue/maxReward}% )`}}
                    />
                </div>
            </div>
        </div>
    );
};

