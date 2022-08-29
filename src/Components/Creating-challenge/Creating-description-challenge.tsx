import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { descriptionSelector, setDescriptionChallenge } from '../../Redux/slice/creatingChallengeSlice';
import './creating-challenge.scss'

export const CreatingDescriptionChallenge = () => {

    const dispatch = useAppDispatch()
    const description = useAppSelector(descriptionSelector)

    const handlerDescription= (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setDescriptionChallenge(e.target.value))

    return (
        <div className={'creating-description-challenge'}>
            <div className="creating-description-challenge__title main-title">Краткое описание</div>
            <input type="text" className="creating-description-challenge__field _field" value={description} onChange={handlerDescription} />
            <div className="creating-description-challenge__note small-text">{description.length}/180</div>
        </div>
    );
};

