import React from 'react';
import './curator-interesting.scss'
import {CardActual} from "../../Components/Card-actual/Card-actual";
import {TabContent, Tabs} from "../../Components/Tabs/Tabs";
import {CardInteresting} from "../../Components/Interesting/Card-interesting";
import {NavigationCurator} from "../../Components/Navigation/Navigation-curator";


export const CuratorInteresting = () => {

    const [value, setValue] = React.useState<number>(0)

    const labelTabs = ['Мотивация', 'Психология', 'Инструкция','Инструкция','Инструкция','Инструкция','Инструкция']

    return (
        <div className={'curator-interesting'}>
            <div className="curator-interesting__title main-title">Интересное</div>
            <div className="curator-interesting__actual">
                <div className="curator-interesting__actual-item">
                    <CardActual title={'Как сегодня начать'} path={''} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
                <div className="curator-interesting__actual-item">
                    <CardActual title={'Как сегодня начать'} path={''} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
                <div className="curator-interesting__actual-item">
                    <CardActual title={'Как сегодня начать'} path={''} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
                <div className="curator-interesting__actual-item">
                    <CardActual title={'Как сегодня начать'} path={''} image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'} type={'Мотивация'} />
                </div>
            </div>
            <button className="curator-interesting__button _button-yellow">Дбавить интересное</button>
            <div className="curator-interesting__tabs">
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
            <NavigationCurator />
        </div>
    );
};