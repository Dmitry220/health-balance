import React, { useEffect } from 'react'
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
  isLoadingSelector,
  newsSelector,
} from '../../Redux/slice/newsSlice'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import { Preloader } from '../../Components/Preloader/Preloader'


export const InterestingPage = () => {

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(isLoadingSelector)
  const dataUser = useAppSelector(dataUserSelector)
  const [value, setValue] = React.useState<number>(0)

  const categoryNews = [
    {
      id: 0,
      title: 'Все'
    },
    {
      id: 4,
      title: 'Новость'
    },
    {
      id: 2,
      title: 'Инструкция'
    },
    {
      id: 3,
      title: 'Мотивация'
    },
    {
      id: 1,
      title: 'Психология'
    }   
  ]

  // useEffect(() => {

  // }, [])


  return (
    <div className={'interesting-page'}>
      <HeaderTwo title={'Интересное'} marginBottom={20} />
      {dataUser.role === 1 && (
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <NavLink to={CREATING_INTERESTING_ROUTE} className='_button-yellow'>
            Добавить интересное
          </NavLink>
        </div>
      )}
      <div className='interesting-page__tabs'>
        <Tabs
          labels={categoryNews.map(item => item.title)}
          onClick={setValue}
          value={value}
          customClassChildren={'scroll-tabs-labels'}
          customClassParent={'scroll-tabs'}
        />
        {
          categoryNews.map((label, i) => (
            <TabContent index={i} value={value} key={i}>     
                <CardsInteresting idCategory={label.id} key={i} />    
            </TabContent>
          ))
        }
      </div>
      <Navigation />
    </div>
  )
}
