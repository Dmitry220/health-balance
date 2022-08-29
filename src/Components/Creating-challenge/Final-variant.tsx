import React from 'react';
import HeaderActive from "../Header-active/Header-active";
import {HeaderChallenge} from "../Active-challenge/Header-challenge";
import {TaskChallenge} from "../Challenge/Task-challenge";
import './creating-challenge.scss'
import {useAppSelector} from "../../utils/hooks/redux-hooks";
import {
    descriptionSelector,
    titleChallengeSelector,
    typeChallengeSelector
} from "../../Redux/slice/creatingChallengeSlice";
import icon_edit from '../../assets/image/icon-edit.svg'
import icon_camera from '../../assets/image/icon-camera-add.svg'
import icon_clock from '../../assets/image/Interesting/clock.svg'
import { definitionColor } from '../../utils/common-functions';
import {RewardCount} from "../Reward/Reward-count";

export const FinalVariant = () => {

    const typeChallenge = useAppSelector(typeChallengeSelector)
    const titleChallenge = useAppSelector(titleChallengeSelector)
    const descriptionChallenge = useAppSelector(descriptionSelector)
    const preview = false
    const icon = false

    return (
        <div className={'final-variant'}>
            <div className="final-variant__image">
                {preview && <img className={'final-variant__image-main'} src={'https://turistigid.com/wp-content/uploads/2019/06/ozero-ritsa-foto.jpg'} alt=""/>}
                {!preview && <div className={'final-variant__text'}>
                   <img src={icon_camera} alt=""/>
                  <span>Загрузите обложку</span>
                </div>}
            </div>
            <div className="final-variant__header">
                <div className="final-variant__icon">
                    {icon && <img src={'https://turistigid.com/wp-content/uploads/2019/06/ozero-ritsa-foto.jpg'} alt=""/>}
                    {!icon && <div className={'final-variant__text'}>
                       <img src={icon_camera} alt=""/> <br/><br/>
                       <span>icon</span>
                    </div>}
                </div>
                <div className="final-variant__header__info">
                    <div className={definitionColor('', "final-variant__type")}>{typeChallenge} <img src={icon_edit} alt=""/></div>
                    <div className="final-variant__title">{titleChallenge} <img src={icon_edit} alt=""/></div>
                </div>
            </div>
            <div className="final-variant__description">
                {descriptionChallenge} <img src={icon_edit} alt=""/>
            </div>
            <div className="final-variant__row">
                <div className="final-variant__data">
                    <img className={'final-variant__data-clock'} src={icon_clock} alt=""/>
                    15.01.22 - 01.03.22
                    <img className={'final-variant__data-edit'} src={icon_edit} alt=""/>
                </div>
                <div className="final-variant__reward">
                    <div className="final-variant__reward-text">Награда:</div>
                    <RewardCount count={95} />
                    <img src={icon_edit} alt=""/>
                </div>

            </div>
            <div className="final-variant__tasks">
                <article className="task-challenge__card-task card-task">
                    <div className="card-task__container">
                        <div className="card-task__title">
                            Шаг
                        </div>
                        <div className={definitionColor('', 'card-task__count')}>
                            2 задания
                        </div>
                    </div>
                </article>
                <article className="task-challenge__card-task card-task">
                    <div className="card-task__container">
                        <div className="card-task__title">
                            Шаг
                        </div>
                        <div className={definitionColor('', 'card-task__count')}>
                            2 задания
                        </div>
                    </div>
                </article>
                <article className="task-challenge__card-task card-task">
                    <div className="card-task__container">
                        <div className="card-task__title">
                            Шаг
                        </div>
                        <div className={definitionColor('', 'card-task__count')}>
                            2 задания
                        </div>
                    </div>
                </article>
            </div>
          
            <button className='final-variant__button _button-yellow'>Добавить лекции и ДЗ</button>

        </div>
    );
};
