import React from 'react'
import { Navigation } from '../../Components/Navigation/Navigation'
import { TabContent, Tabs } from '../../Components/Tabs/Tabs'
import { CardsInteresting } from '../../Components/Interesting/Cards-interesting'
import './interesting-page.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { HeaderTwo } from '../../Components/Header-two/Header-two'
import { CREATING_INTERESTING_ROUTE } from '../../provider/constants-route'
import { NavLink } from 'react-router-dom'
import {
  getNews,
  getNewsByCategory,
} from '../../Redux/slice/newsSlice'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import { CATEGORY_NEWS } from '../../utils/globalConstants'
import { Preloader } from '../../Components/Preloader/Preloader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
//import PullToRefresh from 'react-simple-pull-to-refresh'
import ReactPullToRefresh from 'react-pull-to-refresh'
import { PullDownContent, ReleaseContent, RefreshContent, PullToRefresh } from "react-js-pull-to-refresh";

export const InterestingPage = () => {

  const dispatch = useAppDispatch()
  const dataUser = useAppSelector(dataUserSelector)
  const [value, setValue] = React.useState<number>(0)


  async function handleRefresh() {
    const idCategory = CATEGORY_NEWS[value].id
    if (idCategory === 0) {
      dispatch(getNews())
      return
    }
    dispatch(getNewsByCategory(idCategory))
  }


  return (
    <div className={'interesting-page'}>

      <HeaderTwo title={'Интересное'} marginBottom={20} />
      {/* <PullToRefresh
        maxPullDownDistance={95}
        pullDownThreshold={67}
        fetchMoreThreshold={100}
        pullingContent={''}
        refreshingContent={<span id="loader"></span>}
        onRefresh={handleRefresh}
        className='pull-to-refresh'
        canFetchMore={true}
      > */}
      {/* <ReactPullToRefresh onRefresh={handleRefresh}  style={{ textAlign: 'center' }}> */}
      <PullToRefresh
        pullDownContent={<PullDownContent />}
        releaseContent={<div id="loader"></div>}
        refreshContent={<RefreshContent />}
        pullDownThreshold={100}
        onRefresh={handleRefresh}
        triggerHeight={window.innerHeight/2}
        startInvisible={true}
      >
        <>
          {(dataUser.role === 1 || dataUser.role === 2) && (
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
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
                  <CardsInteresting idCategory={label.id} key={i} />
                </TabContent>
              ))
            }
          </div>
        </>
      </PullToRefresh>
      <Navigation />

    </div>

  )
}
