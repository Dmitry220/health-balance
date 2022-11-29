import React from 'react';
import { Navigation } from "../../Components/Navigation/Navigation";
import Header from "../../Components/Header/Header";
import { Tabs, TabContent } from "../../Components/Tabs/Tabs";
import { CardInteresting } from "../../Components/Interesting/Card-interesting";
import { CardChallenge } from "../../Components/Challenge/Card-challenge";
import { typesChallenge } from "../../types/enums";
import './interesting-page.scss'
import CardLecture from "../../Components/Card-lecture/Card-lecture";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux-hooks";
import { CardActual } from "../../Components/Card-actual/Card-actual";
import { HeaderTwo } from "../../Components/Header-two/Header-two";
import { routesNavigation } from "../../utils/globalConstants";
import { CREATING_INTERESTING_ROUTE, MOTIVATION_ROUTE } from '../../provider/constants-route';
import { NavLink } from 'react-router-dom';



export const InterestingPage = () => {

    const [value, setValue] = React.useState<number>(0)

    const labelTabs = ['Мотивация', 'Психология', 'Инструкция', 'Инструкция', 'Инструкция', 'Инструкция', 'Инструкция']

    const isCurator = true;

    return (
        <div className={'interesting-page'}>
            <HeaderTwo title={'Интересное'} marginBottom={20} />
            <div className="interesting-page__actual">
                <div className="interesting-page__actual-item">
                    <CardActual title={'Как начать сегодня!'} path={MOTIVATION_ROUTE} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
                <div className="interesting-page__actual-item">
                    <CardActual title={'Челлендж'} path={MOTIVATION_ROUTE} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
                <div className="interesting-page__actual-item">
                    <CardActual title={'Челлендж'} path={MOTIVATION_ROUTE} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
                <div className="interesting-page__actual-item">
                    <CardActual title={'Челлендж'} path={MOTIVATION_ROUTE} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
                <div className="interesting-page__actual-item">
                    <CardActual title={'Челлендж'} path={MOTIVATION_ROUTE} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
            </div>
            {isCurator && (
                <div style={{ marginTop: "-20px", marginBottom: "20px" }}>
                    <NavLink to={CREATING_INTERESTING_ROUTE} className="_button-yellow">
                        Добавить интересное
                    </NavLink>
                </div>
            )}
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
            <Navigation routes={routesNavigation} />
        </div>
    );
};

