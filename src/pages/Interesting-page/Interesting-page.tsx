import React from 'react'
import {Navigation} from '../../Components/Navigation/Navigation'
import {TabContent, Tabs} from '../../Components/Tabs/Tabs'
import {CardsInteresting} from '../../Components/Interesting/Cards-interesting'
import './interesting-page.scss'
import {useAppSelector} from '../../hooks/redux-hooks'
import {HeaderTwo} from '../../Components/Header-two/Header-two'
import {CREATING_INTERESTING_ROUTE} from '../../provider/constants-route'
import {NavLink} from 'react-router-dom'
import {dataUserSelector} from '../../Redux/slice/profileSlice'
import {CATEGORY_NEWS} from '../../utils/globalConstants'
import {PullToRefresh} from "../../Components/PullToRefresh/PulltoRefresh";
import {useGetNewsByCategoryQuery} from "../../services/news.api";


export const InterestingPage = () => {

    const dataUser = useAppSelector(dataUserSelector)
    const [value, setValue] = React.useState<number>(0)
    const idCategory = CATEGORY_NEWS[value].id

    const {refetch} = useGetNewsByCategoryQuery(idCategory)

    async function handleRefresh() {
        refetch()
    }

    return (
        <div className={'interesting-page'}>
            <PullToRefresh onTrigger={handleRefresh}/>
            <HeaderTwo title={'Интересное'} marginBottom={20}/>
            <div style={{position: "relative"}}>
                <>
                    {(dataUser.role === 1 || dataUser.role === 2) && (
                        <div style={{marginTop: '20px', marginBottom: '20px'}}>
                            <NavLink to={CREATING_INTERESTING_ROUTE} className='_button-yellow'>
                                Добавить интересное
                            </NavLink>
                        </div>
                    )}
                    <div className='interesting-page__tabs'>
                        <Tabs
                            labels={CATEGORY_NEWS.map(item => item.title)}
                            onClick={setValue}
                            value={value}
                            customClassChildren={'scroll-tabs-labels'}
                            customClassParent={'scroll-tabs'}
                        />
                        {
                            CATEGORY_NEWS.map((label, i) => (
                                <TabContent index={i} value={value} key={i}>
                                    <CardsInteresting idCategory={label.id} key={i}/>
                                </TabContent>
                            ))
                        }
                    </div>
                </>
            </div>
            <Navigation/>

        </div>

    )
}
