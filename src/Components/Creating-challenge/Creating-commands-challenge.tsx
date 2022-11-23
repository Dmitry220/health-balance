import React, { ChangeEvent, useEffect } from 'react';
import { maxPeoplesCreatingChallengeSelector, setDisabledButton, setMaxPeoplesChallenge, setTeamAmountChallenge, teamAmountCreatingChallengeSelector } from '../../Redux/slice/challengeSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks';
import './creating-challenge.scss'

export const CreatingCommandsChallenge = () => {

    const dispatch = useAppDispatch()

    const maxPeoples = useAppSelector(maxPeoplesCreatingChallengeSelector)
    const teamAmount = useAppSelector(teamAmountCreatingChallengeSelector)

    const handlerTeamAmount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setTeamAmountChallenge(+e.target.value))
       // dispatch(setDisabledButton(false))
    }
    const handleraMaxPeoples = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setMaxPeoplesChallenge(+e.target.value))
        //dispatch(setDisabledButton(false))
    }

    useEffect(()=>{
        if(maxPeoples !== 0 && teamAmount !== 0){
           dispatch(setDisabledButton(false))
        }
    }, [maxPeoples, teamAmount])


    return (
        <div className={'creating-commands-challenge'}>
            <div className="creating-commands-challenge__title main-title">Команды</div>
            <div className="creating-commands-challenge__select _custom-select">
                <select defaultValue={teamAmount === 0 ? 'DEFAULT' : teamAmount} onChange={handlerTeamAmount}>
                    <option value={'DEFAULT'} disabled>Количество команд</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
            <div className="creating-commands-challenge__select _custom-select">
                <select defaultValue={maxPeoples === 0 ? 'DEFAULT' : maxPeoples} onChange={handleraMaxPeoples}>
                    <option value={'DEFAULT'} disabled>Участников на команду</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
        </div>
    );
};

