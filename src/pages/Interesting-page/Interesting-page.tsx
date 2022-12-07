import React, { useEffect } from 'react'
import { Navigation } from '../../Components/Navigation/Navigation'
import { Tabs, TabContent } from '../../Components/Tabs/Tabs'
import { CardInteresting } from '../../Components/Interesting/Card-interesting'
import './interesting-page.scss'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { CardActual } from '../../Components/Card-actual/Card-actual'
import { HeaderTwo } from '../../Components/Header-two/Header-two'
import { routesNavigation } from '../../utils/globalConstants'
import {
  CREATING_INTERESTING_ROUTE,
  MOTIVATION_ROUTE
} from '../../provider/constants-route'
import { NavLink } from 'react-router-dom'
import {
  getNews,
  instructionNewsSelector,
  isLoadingSelector,
  motivationSelector,
  newsSelector,
  psyholgySelector
} from '../../Redux/slice/newsSlice'

export const InterestingPage = () => {
  const dispatch = useAppDispatch()
  const news = useAppSelector(newsSelector)
  const psyhologyNews = useAppSelector(psyholgySelector)
  const motivationNews = useAppSelector(motivationSelector)
  const instructionNews = useAppSelector(instructionNewsSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const [value, setValue] = React.useState<number>(0)

  const labelTabs = ['Психология', 'Инструкция', 'Мотивация', 'Новость']

  const isCurator = true

  useEffect(() => {
    dispatch(getNews())
  }, [])

  if (isLoading) {
    return <h1>Загрузка...</h1>
  }

  return (
    <div className={'interesting-page'}>
      <HeaderTwo title={'Интересное'} marginBottom={20} />
      <div className='interesting-page__actual'>
        {/* <div className='interesting-page__actual-item'>
          <CardActual
            title={'Как начать сегодня!'}
            path={MOTIVATION_ROUTE}
            image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'}
            type={'Мотивация'}
          />
        </div>
        <div className='interesting-page__actual-item'>
          <CardActual
            title={'Челлендж'}
            path={MOTIVATION_ROUTE}
            image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'}
            type={'Мотивация'}
          />
        </div>
        <div className='interesting-page__actual-item'>
          <CardActual
            title={'Челлендж'}
            path={MOTIVATION_ROUTE}
            image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'}
            type={'Мотивация'}
          />
        </div>
        <div className='interesting-page__actual-item'>
          <CardActual
            title={'Челлендж'}
            path={MOTIVATION_ROUTE}
            image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'}
            type={'Мотивация'}
          />
        </div>
        <div className='interesting-page__actual-item'>
          <CardActual
            title={'Челлендж'}
            path={MOTIVATION_ROUTE}
            image={'https://www.cruisetips.ru/upload/upload1331487961917_1.jpg'}
            type={'Мотивация'}
          />
        </div> */}
      </div>
      {isCurator && (
        <div style={{ marginTop: '-20px', marginBottom: '20px' }}>
          <NavLink to={CREATING_INTERESTING_ROUTE} className='_button-yellow'>
            Добавить интересное
          </NavLink>
        </div>
      )}
      <div className='interesting-page__tabs'>
        <Tabs
          labels={labelTabs}
          onClick={setValue}
          value={value}
          customClassChildren={'scroll-tabs-labels'}
          customClassParent={'scroll-tabs'}
        />
        <TabContent value={value} index={0}>
          {psyhologyNews.length ? psyhologyNews?.map((item) => (
            <CardInteresting dataNews={item} key={item.id} />
          )): <div className='active-plug'>Новостей нет</div>}
        </TabContent>
        <TabContent value={value} index={1}>
          {instructionNews.length ? instructionNews?.map((item) => (
            <CardInteresting dataNews={item} key={item.id}/>
          )): <div className='active-plug'>Новостей нет</div>}
        </TabContent>
        <TabContent value={value} index={2}>
          {motivationNews.length ? motivationNews?.map((item) => (
            <CardInteresting dataNews={item} key={item.id}/>
          )) : <div className='active-plug'>Новостей нет</div>}
        </TabContent>
        <TabContent value={value} index={3}>
          {news.length ? news?.map((item) => (
            <CardInteresting dataNews={item} key={item.id}/>
          )): <div className='active-plug'>Новостей нет</div>}
        </TabContent>
      </div>
      <Navigation routes={routesNavigation} />
    </div>
  )
}
