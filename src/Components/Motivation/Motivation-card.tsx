import { useEffect, useState } from 'react'
import './motivation.scss'
import iconClock from '../../assets/image/Interesting/clock.svg'
import plug from '../../assets/image/plug.png'
import iconComments from '../../assets/image/icon-comments-fill.svg'
import iconFavourite from '../../assets/image/icon-favourite-fill.svg'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  getNewsById,
  isLoadingSelector,
  newsByIdSelector
} from '../../Redux/slice/newsSlice'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import { IMAGE_URL } from '../../http'
import NewsService from '../../services/NewsService'
import { showToast } from '../../utils/common-functions'

export const MotivationCard = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const news = useAppSelector(newsByIdSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const [isLike, setLike] = useState<boolean>(false)

  const like = async () => {
   try {
    const response = await NewsService.likeNews(Number(params.id))
    console.log(response);
    setLike(true)
   } catch (error) {
    await showToast('Вы уже ставили лайк!')
   }
  }

  useEffect(() => {
    //dispatch(getNewsById(Number(params.id)))
  }, [])

  if (isLoading) {
    return <h1>Загрузка...</h1>
  }

  return (
    <>
      {news && (
        <div className={'motivation-card'}>
          <div className='motivation-card__image'>
            {news.image && <img src={IMAGE_URL + 'news/' + news.image} alt={'news/' + news.id} />}
            {!news.image && <img src={plug} alt={'news/'} />}
          </div>
          <div className='motivation-card__body'>
            <div className='motivation-card__text'>
              <img src={iconClock} alt='' />
              <span>
                {new Date(news.created_at * 1000).toLocaleDateString()}
              </span>
              <span>{news.author}</span>
            </div>
            <div className='motivation-card__title block-title'>
              {news.title}
            </div>
            <div className='motivation__feed-back feed-back'>
              <div className='feed-back__favourite' onClick={like} >
                {news.likes + (isLike ? 1 : 0)} <span style={{ color: 'white', fontSize: 18 }}>❤</span>
              </div>
              <div className='feed-back__comments'>
                <img src={iconComments} alt='comments' />
                {news.comments}
              </div>
            </div>
            <div className='motivation-card__content'>{news.content}</div>
          </div>
        </div>
      )}
    </>
  )
}
