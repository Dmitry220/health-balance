import React from 'react';
import {Navigation} from "../../Components/Navigation/Navigation";
import Header from "../../Components/Header/Header";
import {Tabs, TabContent} from "../../Components/Tabs/Tabs";
import {CardInteresting} from "../../Components/Interesting/Card-interesting";
import {CardChallenge} from "../../Components/Challenge/Card-challenge";
import {typesChallenge} from "../../types/enums";
import './interesting-page.scss'
import CardLecture from "../../Components/Card-lecture/Card-lecture";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux-hooks";
import {CardActual} from "../../Components/Card-actual/Card-actual";
import {HeaderTwo} from "../../Components/Header-two/Header-two";
import {routesNavigation} from "../../utils/globalConstants";



export const InterestingPage = () => {

    const [value, setValue] = React.useState<number>(0)

    const labelTabs = ['Мотивация', 'Психология', 'Инструкция','Инструкция','Инструкция','Инструкция','Инструкция']

    return (
        <div className={'interesting-page'}>
            <HeaderTwo title={'Интересное'} marginBottom={20} />
            <div className="interesting-page__actual">
                <div className="interesting-page__actual-item">
                    <CardActual title={'Как начать сегодня!'} path={'/'} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
                <div className="interesting-page__actual-item">
                    <CardActual title={'Челлендж'} path={'/'} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
                <div className="interesting-page__actual-item">
                    <CardActual title={'Челлендж'} path={'/'} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
                <div className="interesting-page__actual-item">
                    <CardActual title={'Челлендж'} path={'/'} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
                <div className="interesting-page__actual-item">
                    <CardActual title={'Челлендж'} path={'/'} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
            </div>
            <div className="interesting-page__tabs">
                <Tabs
                    labels={labelTabs}
                    onClick={setValue}
                    value={value}
                    customClassChildren={'scroll-tabs-labels'}
                    customClassParent={'scroll-tabs'}
                />
                <TabContent value={value} index={0}>
                    <CardInteresting type={'Мотивация'} />
                    <CardInteresting type={'Мотивация'} />
                </TabContent>
                <TabContent value={value} index={1}>
                    <CardInteresting type={'Психология'} />
                </TabContent>
                <TabContent value={value} index={2}>
                    <CardInteresting type={'Инструкция'} />
                </TabContent>
            </div>
            <Navigation routes={routesNavigation}/>
        </div>
    );
};

