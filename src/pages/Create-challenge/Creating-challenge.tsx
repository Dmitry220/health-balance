import React, {useState} from 'react';
import Header from "../../Components/Header/Header";
import {stageCreatingChallenge, stageRegistration} from "../../types/enums";
import {CreatingChallengeItem} from "../../Components/Creating-challenge/Creating-challenge-item";
import './creating-challenge.scss'


export const CreatingChallengePage = () => {

    const [order, setOrder] = useState<number>(0)

    console.log("creating challenge page render")

    const saveChallenge = () => {
        console.log('Save challenge')
    }

    const renderCreatingChallengeItems = () => {
        switch (order) {
            case 0:
                return <CreatingChallengeItem stage={stageCreatingChallenge.platform}
                                         order={order} setOrder={setOrder}/>
            case 1:
                return <CreatingChallengeItem stage={stageCreatingChallenge.type}
                                         order={order} setOrder={setOrder}/>
            case 2:
                return <CreatingChallengeItem stage={stageCreatingChallenge.target}
                                         order={order} setOrder={setOrder}/>
            case 3:
                return <CreatingChallengeItem stage={stageCreatingChallenge.data}
                                         order={order} setOrder={setOrder}/>
            case 4:
                return <CreatingChallengeItem stage={stageCreatingChallenge.title}
                                         order={order} setOrder={setOrder}/>
            case 5:
                return <CreatingChallengeItem stage={stageCreatingChallenge.description}
                                         order={order} setOrder={setOrder}/>
            case 6:
                return <CreatingChallengeItem stage={stageCreatingChallenge.teams}
                                         order={order} setOrder={setOrder}/>
            case 7:
                return <CreatingChallengeItem stage={stageCreatingChallenge.finally}
                                              order={order} setOrder={setOrder}/>
            case 8:
                return <CreatingChallengeItem stage={stageCreatingChallenge.lecture}
                                              order={order} setOrder={setOrder}/>

        }
    }

    return (
        <div className={'creating-challenge-page'}>
            <Header title={'Создание челленджа'} />
            {renderCreatingChallengeItems()}
            {order === 7 && <button className='creating-challenge-page__button _button-white' onClick={saveChallenge}>Сохранить</button>}
            {order < 7 && <button className='creating-challenge-page__button _button-white' onClick={()=>setOrder(prev=>prev+1)}>Далее</button>}
        </div>
    );
};

