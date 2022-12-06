import './commnet.scss'
import { CommentAnswer } from './Comment-answer'

export const ListComments = () => {
  return (
    <div className={'list-comments'}>
      <div className='list-comments__items'>
        <ItemComment />
        <ItemComment />
        <ItemComment />
        <ItemComment />
      </div>
    </div>
  )
}

export const ItemComment = () => {
  return (
    <div className={'item-comment'}>
      <div className='item-comment__body'>
        <div className='item-comment__avatar'>
          <img
            src='https://avatars.mds.yandex.net/i?id=9581e6f00597e511219d903f1808ce7a-5232396-images-thumbs&n=13&exp=1'
            alt=''
          />
        </div>
        <div className='item-comment__info'>
          <div className='item-comment__author author-text'>Усейн Болт</div>
          <div className='item-comment__message message-text'>
            Бегаю каждую минуту и всю свою жизнь! Бегать нужно тогда, когда это
            возможно!
          </div>
          <div className='item-comment__data small-text-comment'>
            12.12.21 в 12:32
          </div>
        </div>
      </div>

      <div className='item-comment__answer'>
        <CommentAnswer />
      </div>
    </div>
  )
}
