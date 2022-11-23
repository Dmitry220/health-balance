import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks';
import { descriptionCreatingChallengeSelector, setDescriptionChallenge, setDisabledButton } from '../../Redux/slice/creatingChallengeSlice';
import './creating-challenge.scss'

export const CreatingDescriptionChallenge = () => {

    const dispatch = useAppDispatch()
    const description = useAppSelector(descriptionCreatingChallengeSelector)

    const handlerDescription= (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDescriptionChallenge(e.target.value))
        e.target.value.length >= 3 ? dispatch(setDisabledButton(false)) : dispatch(setDisabledButton(true))
    }
    useEffect(()=>{
        if(description.length >= 3){
            dispatch(setDisabledButton(false))
        }
    }, [])

    return (
        <div className={'creating-description-challenge'}>
            <div className="creating-description-challenge__title main-title">Краткое описание</div>
            <input type="text" className="creating-description-challenge__field _field" value={description} onChange={handlerDescription} />
            <div className="creating-description-challenge__note small-text">{description.length}/180</div>
        </div>
    );
};

