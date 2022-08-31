import React from 'react';
import Header from "../../Components/Header/Header";
import {ShopCard} from "../../Components/Shop/Shop-card";
import './shop-page.scss'
import {TabContent, Tabs} from "../../Components/Tabs/Tabs";
import {Link} from "react-router-dom";
import {PRODUCT_SCREEN_ROUTE} from "../../provider/constants-route";
import {ShopHead} from "../../Components/Shop/Shop-head";

export const ShopPage = () => {

    const [valueTab, setValueTab] = React.useState<number>(0)
    const labelTabs = ['Скидки', 'Спорт', 'Развлечения', 'Одежда', 'Детям', 'Техника']

    return (
        <div className={'shop-page'}>
            <Header title={'Награда'}/>
            <ShopHead marginBottom={42}/>
            <Tabs
                labels={labelTabs}
                onClick={setValueTab}
                value={valueTab}
                customClassChildren={'shop-page__tabs-labels'}
                customClassParent={'shop-page__tabs'}
            />
            <TabContent index={0} value={valueTab}>
                <div className="shop-page__cards">
                    <Link to={PRODUCT_SCREEN_ROUTE+'/0'} className="shop-page__item-card"><ShopCard/></Link>
                    <Link to={PRODUCT_SCREEN_ROUTE+'/1'} className="shop-page__item-card"><ShopCard/></Link>
                    <Link to={PRODUCT_SCREEN_ROUTE+'/2'} className="shop-page__item-card"><ShopCard/></Link>
                    <Link to={PRODUCT_SCREEN_ROUTE+'/3'} className="shop-page__item-card"><ShopCard/></Link>
                </div>
            </TabContent>
            <TabContent index={1} value={valueTab}>
                <div className="shop-page__cards">
                    <Link to={PRODUCT_SCREEN_ROUTE+'/2'} className="shop-page__item-card"><ShopCard/></Link>
                </div>
            </TabContent>
            <TabContent index={2} value={valueTab}>
                <div className="shop-page__cards">
                    <Link to={PRODUCT_SCREEN_ROUTE+'/0'} className="shop-page__item-card"><ShopCard/></Link>
                    <Link to={PRODUCT_SCREEN_ROUTE+'/1'} className="shop-page__item-card"><ShopCard/></Link>
                </div>
            </TabContent>
            <TabContent index={3} value={valueTab}>
                <div className="shop-page__text">В этой категории предложения закончились :(</div>
            </TabContent>
            <TabContent index={4} value={valueTab}>
                <div className="shop-page__text">В этой категории предложения закончились :(</div>
            </TabContent>
            <TabContent index={5} value={valueTab}>
                <div className="shop-page__text">В этой категории предложения закончились :(</div>
            </TabContent>
        </div>
    );
};
