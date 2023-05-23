import { FC, useEffect } from 'react'
import './interesting.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { getNews, getNewsByCategory, isLoadingSelector, newsSelector } from '../../Redux/slice/newsSlice'
import { CardInteresting } from './Card-interesting'
import { Preloader } from '../Preloader/Preloader'


interface ICardsInteresting {
  idCategory: number
}

export const CardsInteresting: FC<ICardsInteresting> = ({ idCategory }) => {

  const dispatch = useAppDispatch()
  const news = useAppSelector(newsSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  useEffect(() => {
    if (idCategory === 0) {
      dispatch(getNews())
    }else{
      dispatch(getNewsByCategory(idCategory))
    }
   
  }, [])

  if (isLoading) {
    return <Preloader height='auto' />
  }

  return (
    <>
      {/* {
      isLoading && <Preloader height='auto'/>
    } */}
      {news?.length ? news?.map((item) => (
        <CardInteresting dataNews={item} key={item.id} />
      )) : <div className='active-plug'>Новостей нет</div>}
    </>
  )
}

