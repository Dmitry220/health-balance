import React from 'react';
import Header from "../../Components/Header/Header";
import {RewardCard} from "../../Components/Reward/Reward-card";
import './shop-page.scss'
import {TabContent, Tabs} from "../../Components/Tabs/Tabs";
import {RewardCount} from "../../Components/Reward/Reward-count";
import {Link} from "react-router-dom";
import {BASKET_ROUTE} from "../../provider/constants-route";
import basket from '../../assets/image/icon_cart.svg'

export const RewardPage = () => {

    const [valueTab, setValueTab] = React.useState<number>(0)
    const labelTabs = ['Скидки', 'Спорт', 'Развлечения', 'Одежда', 'Детям', 'Техника']

    return (
        <div className={'reward-page'}>
            <Header title={'Награда'}/>
            <div className="reward-page__row">
                <div className="reward-page__title-balance title-17">
                    <span>Ваш баланс:</span><RewardCount count={365} />
                </div>
                <Link to={BASKET_ROUTE} className="reward-page__img">
                    <span className='reward-page__purchases text-blue'>Мои покупки</span>
                    <img src={basket} alt="basket"/>
                    <span className={'reward-page__img-before active'}/>
                </Link>
            </div>
            <Tabs
                labels={labelTabs}
                onClick={setValueTab}
                value={valueTab}
                customClassChildren={'reward-page__tabs-labels'}
                customClassParent={'reward-page__tabs'}
            />
            <TabContent index={0} value={valueTab}>
                <div className="reward-page__cards">
                    <div className="reward-page__item-card"><RewardCard/></div>
                    <div className="reward-page__item-card"><RewardCard/></div>
                    <div className="reward-page__item-card"><RewardCard/></div>
                    <div className="reward-page__item-card"><RewardCard/></div>
                </div>
            </TabContent>
            <TabContent index={1} value={valueTab}>
                <div className="reward-page__cards">
                    <div className="reward-page__item-card"><RewardCard/></div>
                </div>
            </TabContent>
            <TabContent index={2} value={valueTab}>
                <div className="reward-page__cards">
                    <div className="reward-page__item-card"><RewardCard/></div>
                    <div className="reward-page__item-card"><RewardCard/></div>
                </div>
            </TabContent>
            <TabContent index={3} value={valueTab}>
                <div className="reward-page__text">В этой категории предложения закончились :(</div>
            </TabContent>
            <TabContent index={4} value={valueTab}>
                <div className="reward-page__text">В этой категории предложения закончились :(</div>
            </TabContent>
            <TabContent index={5} value={valueTab}>
                <div className="reward-page__text">В этой категории предложения закончились :(</div>
            </TabContent>

        </div>
    );
};
