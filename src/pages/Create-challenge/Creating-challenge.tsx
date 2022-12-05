import React, { useState } from 'react';
import Header from "../../Components/Header/Header";
import { stageCreatingChallenge } from "../../types/enums";
import { CreatingChallengeItem } from "../../Components/Creating-challenge/Creating-challenge-item";
import './creating-challenge.scss'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks';
import { creatingChallenge, disableButtonChallengeSelector, setDisabledButton, typeCreatingChallengeSelector } from '../../Redux/slice/challengeSlice';
import { ModalStatus } from '../../Components/Modal-status/Modal-status';
import { CREATING_LECTURE_ROUTE } from '../../provider/constants-route';


export const CreatingChallengePage = () => {

    const [order, setOrder] = useState<number>(0)
    const disabledButton = useAppSelector(disableButtonChallengeSelector)
    const type = useAppSelector(typeCreatingChallengeSelector)
    const dispatch = useAppDispatch()

    const saveChallenge = async () => {        
        await dispatch(creatingChallenge())
        setOrder(prev => prev + 1)
    }

    const renderCreatingChallengeItems = () => {
        switch (order) {
            case 0:
                return <CreatingChallengeItem stage={stageCreatingChallenge.platform} />
            case 1:
                return <CreatingChallengeItem stage={stageCreatingChallenge.type} />
            case 2:
                return <CreatingChallengeItem stage={stageCreatingChallenge.target} />
            case 3:
                return <CreatingChallengeItem stage={stageCreatingChallenge.data} />
            case 4:
                return <CreatingChallengeItem stage={stageCreatingChallenge.title} />
            case 5:
                return <CreatingChallengeItem stage={stageCreatingChallenge.description} />
            case 6:
                return <CreatingChallengeItem stage={stageCreatingChallenge.teams} />
            case 7:
                return <CreatingChallengeItem stage={stageCreatingChallenge.finally} />
            case 8:
                return <ModalStatus
                    subTitle='Челлендж появится после проверки модератором'
                    textButton='Ок'
                    route={CREATING_LECTURE_ROUTE + '/0'}
                />
        }
    }

    return (
        <div className={'creating-challenge-page'}>
            <Header title={'Создание челленджа'} />
            {renderCreatingChallengeItems()}
            <div className="creating-challenge-page__buttons">
                {order > 0 && order <= 7 && <button className='creating-challenge-page__button _button-white' onClick={() => {
                    if (type === 1 && order === 7) {
                        setOrder(prev => prev - 2)
                    } else {
                        setOrder(prev => prev - 1)
                    }
                    if (order === 4) {
                        dispatch(setDisabledButton(false))
                    }
                }}>Назад</button>}
                {order === 7 && <button className='creating-challenge-page__button _button-white' onClick={saveChallenge}>Сохранить</button>}
                {order < 7 && <button
                    className={'creating-challenge-page__button _button-white' + (disabledButton ? ' disabled' : '')}
                    disabled={disabledButton}
                    onClick={() => {
                        if (type === 1 && order === 5) {
                            setOrder(prev => prev + 2)
                        } else {
                            setOrder(prev => prev + 1)
                        }
                        if (order === 3 || order === 4 || order === 5) {
                            dispatch(setDisabledButton(true))
                        }
                    }}
                >
                    Далее
                </button>}
            </div>
        </div>
    );
};

