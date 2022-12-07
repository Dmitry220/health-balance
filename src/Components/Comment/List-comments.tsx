import './commnet.scss'
import { CommentAnswer } from './Comment-answer'
import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { commentsSelector, getComments } from '../../Redux/slice/newsSlice'
import { IComment } from '../../models/INews'
import { CommentForm } from './Comment-form'

export const ListComments = () => {

  const comments = useAppSelector(commentsSelector)
  const dispatch = useAppDispatch() 
  useEffect(() => {
    dispatch(getComments(1))
  }, [])
  
  const [showForm, setShowForm] = useState<boolean>(false) 

  return (
    <div className={'list-comments'}>
      <div className='list-comments__items'>
        {comments.map(comment=> <ItemComment comment={comment} key={comment.id} setShowForm={setShowForm}/>)}
        {/* {comments.map(comment=> <ItemComment comment={comment} key={comment.id}/>)}
         {comments.map(comment=> <ItemComment comment={comment} key={comment.id}/>)} */}
      </div>
      <div className="list-comments">
          {showForm && <CommentForm />}
      </div>   
    </div>
  )
}

interface ICommentItem {
  comment: IComment,
  setShowForm: any
}

export const ItemComment:FC<ICommentItem> = ({comment, setShowForm}) => {

  //const [showForm, setShowForm] = useState<boolean>(false)

  // useEffect(() => {
  //   setShowForm(isShowForm) // Как только компонент получит кол-во, засетаем его
  // }, [isShowForm])

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
            {comment.comment}
          </div>
          <div className='item-comment__data small-text-comment'>
          {comment.created_at || '12.12.21 в 12:32'} <span onClick={()=>setShowForm(true)}>Ответить</span>
          </div>
        </div>
      </div>
      <div className='item-comment__answer'>
        {comment.childrens.length != 0 && <CommentAnswer />}
      </div>
   
    </div>
  )
}
