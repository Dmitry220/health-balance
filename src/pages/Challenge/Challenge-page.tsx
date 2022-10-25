import React, {useEffect, useState} from 'react';
import {Navigation} from '../../Components/Navigation/Navigation';
import Header from "../../Components/Header/Header";
import {CardChallenge} from "../../Components/Challenge/Card-challenge";
import {typesChallenge} from "../../types/enums";
import {NewChallengeCard} from "../../Components/Challenge/New-challenge-card";
import './challenge-page.scss'
import {HeaderTwo} from "../../Components/Header-two/Header-two";
import {TabContent, Tabs} from "../../Components/Tabs/Tabs";
import {ModalInstructions} from "../../Components/Modal-instructions/Modal-instructions";


export const ChallengePage = () => {

    const [valueTab, setValueTab] = React.useState<number>(0)
    const labelsTabChallenge = ['Личные', 'Коммандные', 'Общие', 'Архив']

    const [activeInstructions, setActiveInstructions] = useState(false)

    useEffect(()=>{
        if(!activeInstructions){
            const timer = setTimeout(()=>{
                setActiveInstructions(true)
            }, 500)
            return () => {
                clearTimeout(timer);
            };
        }

    }, [])

    console.log('render challenge')

    return (
        <div className={'challenge-page'} style={{pointerEvents: activeInstructions ? 'none' : 'all'}}>
        <div className={'challenge-page__after'} style={{background: activeInstructions ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0)'}} />
            <Navigation/>
            {activeInstructions &&   <ModalInstructions positionTop={45} text={'Примите участие в своём первом челлендже'} fontSize={35} fontWeight={700}/>}
            <HeaderTwo title={'Челленджи'} marginBottom={40}/>

            <Tabs
                labels={labelsTabChallenge}
                onClick={setValueTab}
                value={valueTab}
                customClassParent={'scroll-tabs'}
                customClassChildren={'scroll-tabs-labels'}
            />
            <TabContent index={0} value={valueTab}>
                <div className="challenge-page__title-block block-title">Активные</div>
                <div className="challenge-page__active">
                    <div className="challenge-page__active-plug">Нет активных челленджей</div>
                    {/*<CardChallenge type={typesChallenge.personal} percent={45} id={0}/>*/}
                    {/*<CardChallenge type={typesChallenge.personal} percent={64} id={1}/>*/}
                </div>
            </TabContent>
            <TabContent index={1} value={valueTab}>
                <div className="challenge-page__title-block block-title">Командные</div>
                <div className="challenge-page__active">
                    <CardChallenge type={typesChallenge.command} percent={12}id={3}/>
                    <CardChallenge type={typesChallenge.command} percent={84}id={8}/>
                </div>
            </TabContent>
            <TabContent index={2} value={valueTab}>
                <div className="challenge-page__title-block block-title">Общие</div>
                <div className="challenge-page__active">
                    <CardChallenge type={typesChallenge.common} percent={55}id={9}/>
                    <CardChallenge type={typesChallenge.common} percent={70}id={2}/>
                </div>
            </TabContent>
            <TabContent index={3} value={valueTab}>
                <div className="challenge-page__title-block block-title">Архив</div>
                <div className="challenge-page__active">
                    <CardChallenge type={typesChallenge.personal} percent={74}id={4}/>
                    <CardChallenge type={typesChallenge.command} percent={96}id={5}/>
                </div>
            </TabContent>


            <div className="challenge-page__title-block block-title">Новые челленджи</div>
            <div className={'challenge-page__new-challenges'} >
                <NewChallengeCard type={typesChallenge.personal} id={456}/>
            </div>

            {/*<NewChallengeCard type={typesChallenge.command} id={789 }/>*/}
        </div>
    );
};

export default ChallengePage;