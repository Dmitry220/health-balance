import { FC } from 'react'
import { IMAGE_URL } from '../../http'
import { IComment } from '../../models/INews'
import { ItemComment } from './List-comments'
import avatar from '../../assets/image/avatar.jpeg'


interface ICommentAnswer {
  comment: IComment,
  replyAuthor: string,
  setShowForm: any,
  setParentId: any,
  setAuthor: any
  
}

export const CommentAnswer:FC<ICommentAnswer> = ({comment,replyAuthor,setParentId,setShowForm,setAuthor}) => {

  const idProfile = Number(localStorage.getItem("id"))

  const openForm = (id: number, name: string) => {
    setShowForm(true)
    setParentId(id)
    setAuthor(name)
  }

  const formMinute = (minute:number) => minute.toLocaleString().length === 1 ? '0' +  minute : minute
  

  const formatDate = (date: number) => {
    return new Date(date*1000).toLocaleDateString() + ' в ' + new Date(date*1000).getHours() + ":" + formMinute(new Date(date*1000).getMinutes())
  }

  return (
    <div>
      <div className={'item-comment-answer'}>
        <div className='item-comment-answer__avatar'>
          <img
            src={comment.customer_avatar ? IMAGE_URL+'avatars/'+ comment.customer_avatar : avatar}
            alt=''
          />
        </div>
        <div className='item-comment-answer__info'>
          <div className='item-comment-answer__author author-text'>
           {comment.customer_name}
            <span className={'small-text-comment'}>Ответ пользователю {replyAuthor}</span>
          </div>
          <div className='item-comment-answer__message message-text'>
          {comment.comment}
          </div>
          <div className='item-comment-answer__data small-text-comment'>
            {formatDate(comment.created_at) || '12.12.21 в 12:32'} 
          {comment.customer_id != idProfile &&  <span onClick={()=>openForm(comment.id, comment.customer_name)}>Ответить</span>}
          </div>
        </div>
      </div>
      <div className='item-comment__answer'>
        {comment.childrens.length != 0 &&  comment.childrens.map(item=><CommentAnswer setAuthor={setAuthor} key={comment.id} setParentId={setParentId} setShowForm={setShowForm} comment={item} replyAuthor={comment.customer_name}/>)}
      </div>
    </div>
  )
}
