import './motivation.scss'
import Header from '../../Components/Header/Header'
import { MotivationCard } from '../../Components/Motivation/Motivation-card'
import { Post } from '../../Components/Motivation/Post'
import { CommentForm } from '../../Components/Comment/Comment-form'
import { ListComments } from '../../Components/Comment/List-comments'
import { newsByIdSelector } from '../../Redux/slice/newsSlice'
import { useAppSelector } from '../../utils/hooks/redux-hooks'

export const MotivationPage = () => {
  const news = useAppSelector(newsByIdSelector)

  const conversionCategory = (category: number) => {
    switch (category) {
      case 1:
        return 'Психология'
      case 2:
        return 'Инструкция'
      case 3:
        return 'Мотивация'
      case 4:
        return 'Новость'
      default:
        return 'Новость'
    }
  }
  return (
    <div className={'motivation-page'}>
      <Header title={conversionCategory(news?.category||0)} />
      <div className='motivation-page__card'>
        <MotivationCard />
      </div>
      <div className='motivation-page__hr' />
      {/*<Post />*/}
      <div className='motivation-page__comments'>
        <CommentForm parentId={0} />
        <br />
        <br />
        <ListComments />
      </div>
    </div>
  )
}
