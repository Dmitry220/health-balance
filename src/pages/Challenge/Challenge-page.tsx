import React from 'react';
import {Navigation} from '../../Components/Navigation/Navigation';
import Header from "../../Components/Header/Header";
import {CardChallenge} from "../../Components/Challenge/Card-challenge";
import {typesChallenge} from "../../types/enums";
import {NewChallengeCard} from "../../Components/Challenge/New-challenge-card";
import './challenge-page.scss'
import {HeaderTwo} from "../../Components/Header-two/Header-two";
import {TabContent, Tabs} from "../../Components/Tabs/Tabs";


export const ChallengePage = () => {

    const [valueTab, setValueTab] = React.useState<number>(0)
    const labelsTabChallenge = ['Личные', 'Коммандные', 'Общие', 'Архив']

    return (
        <div className={'challenge-page'}>
            <Navigation/>
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
                    <CardChallenge type={typesChallenge.personal} percent={45}/>
                    <CardChallenge type={typesChallenge.personal} percent={64}/>
                </div>
            </TabContent>
            <TabContent index={1} value={valueTab}>
                <div className="challenge-page__title-block block-title">Командные</div>
                <div className="challenge-page__active">
                    <CardChallenge type={typesChallenge.command} percent={12}/>
                    <CardChallenge type={typesChallenge.command} percent={84}/>
                </div>
            </TabContent>
            <TabContent index={2} value={valueTab}>
                <div className="challenge-page__title-block block-title">Общие</div>
                <div className="challenge-page__active">
                    <CardChallenge type={typesChallenge.common} percent={55}/>
                    <CardChallenge type={typesChallenge.common} percent={70}/>
                </div>
            </TabContent>
            <TabContent index={3} value={valueTab}>
                <div className="challenge-page__title-block block-title">Архив</div>
                <div className="challenge-page__active">
                    <CardChallenge type={typesChallenge.personal} percent={74}/>
                    <CardChallenge type={typesChallenge.command} percent={96}/>
                </div>
            </TabContent>


            <div className="challenge-page__title-block block-title">Новые челленджи</div>
            <NewChallengeCard type={typesChallenge.personal}/>
            <NewChallengeCard type={typesChallenge.command}/>
        </div>
    );
};

export default ChallengePage;