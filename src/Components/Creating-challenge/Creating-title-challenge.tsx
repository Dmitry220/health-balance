import React from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks';
import { setTitleChallenge, titleChallengeSelector } from '../../Redux/slice/creatingChallengeSlice';
import './creating-challenge.scss'


export const CreatingTitleChallenge = () => {

    const dispatch = useAppDispatch()
    const title = useAppSelector(titleChallengeSelector)

    const handlerTitle = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setTitleChallenge(e.target.value))
    

    return (
        <div className={'creating-title-challenge'}>
            <div className="creating-title-challenge__title main-title">Название</div>
            <input type="text" className="creating-title-challenge__field _field" onChange={handlerTitle} value={title} />
            <div className="creating-title-challenge__note small-text">{title.length}/65</div>
        </div>
    );
};
