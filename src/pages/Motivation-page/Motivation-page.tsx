import './motivation.scss'
import Header from '../../Components/Header/Header'
import { MotivationCard } from '../../Components/Motivation/Motivation-card'
import { Post } from '../../Components/Motivation/Post'
import { CommentForm } from '../../Components/Comment/Comment-form'
import { ListComments } from '../../Components/Comment/List-comments'

export const MotivationPage = () => {
  return (
    <div className={'motivation-page'}>
      <Header title={'Мотивация'} />
      <div className='motivation-page__card'>
        <MotivationCard />
      </div>
      <div className='motivation-page__hr' />
      {/*<Post />*/}
      <div className='motivation-page__comments'>
        <CommentForm parentId={0}/>
        <br />
        <br />
        <ListComments />
      </div>
    </div>
  )
}
