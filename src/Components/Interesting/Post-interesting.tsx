import {useState} from 'react'
import './interesting.scss'
import iconClock from '../../assets/image/Interesting/clock.svg'
import plug from '../../assets/image/plug.png'
import iconComments from '../../assets/image/icon-comments-fill.svg'
import {useParams} from 'react-router-dom'
import {useAppSelector} from '../../hooks/redux-hooks'
import {isLoadingSelector, newsByIdSelector} from '../../Redux/slice/newsSlice'
import {IMAGE_URL} from '../../http'
import NewsService from '../../services/NewsService'
import {showToast} from '../../utils/common-functions'
import {Preloader} from '../Preloader/Preloader'

export const PostInteresting = () => {
  const params = useParams()
  const news = useAppSelector(newsByIdSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const [isLike, setLike] = useState<boolean>(false)

  const like = async () => {
    try {
      await NewsService.likeNews(Number(params.id))
      setLike(true)
    } catch (error) {
      await showToast('Вы уже ставили лайк!')
    }
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      {news && (
        <div className={'post-interesting'}>
          <div className='post-interesting__image'>
            {news.image && (
              <img
                src={IMAGE_URL + 'news/' + news.image}
                alt={'news/' + news.id}
              />
            )}
            {!news.image && <img src={plug} alt={'news/'} />}
          </div>
          <div className='post-interesting__body'>
            <div className='post-interesting__text'>
              <img src={iconClock} alt='' />
              <span>
                {new Date(news.created_at * 1000).toLocaleDateString()}
              </span>
              <span>{news.author}</span>
            </div>
            <div className='post-interesting__title block-title'>
              {news.title}
            </div>
            <div className='post-interesting__feed-back feed-back'>
              <div className='feed-back__favourite' onClick={like}>
                {news.likes + (isLike ? 1 : 0)}{' '}
                <span style={{ color: 'white', fontSize: 18 }}>❤</span>
              </div>
              <div className='feed-back__comments'>
                <img src={iconComments} alt='comments' />
                {news.comments}
              </div>
            </div>
            <div className='post-interesting__content' dangerouslySetInnerHTML={{ __html: news.content }}></div>
          </div>
        </div>
      )}
    </>
  )
}
