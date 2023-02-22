import './commnet.scss'
import { CommentAnswer } from './Comment-answer'
import { FC, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  commentsSelector,
  getComments,
  getNewsById,
  idNewCommentSelector,
  newsByIdSelector
} from '../../Redux/slice/newsSlice'
import { IComment } from '../../models/INews'
import { CommentForm } from './Comment-form'
import { useParams } from 'react-router-dom'
import { IMAGE_URL } from '../../http'
import avatar from '../../assets/image/avatar.jpeg'
import { sklonenie } from '../../utils/common-functions'

export const ListComments = () => {
  const params = useParams()
  const newsId = Number(params.id)
  const comments = useAppSelector(commentsSelector)
  const newsById = useAppSelector(newsByIdSelector)
  const idNewComment = useAppSelector(idNewCommentSelector)

  const dispatch = useAppDispatch()

  const [parentId, setParentId] = useState<number>(0)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [author, setAuthor] = useState<string | null>(null)

  useEffect(() => {
    dispatch(getComments(newsId))
    if (idNewComment) {
      dispatch(getNewsById(Number(params.id)))
    }
  }, [idNewComment])

  return (
    <div className={'list-comments'}>
      <div className='list-comments__count'>
        {newsById?.comments}{' '}
        {sklonenie(newsById?.comments || 0, [
          'комментарий',
          'комментария',
          'комментариев'
        ])}
      </div>
      <div className='list-comments__items'>
        {comments.map((comment) => (
          <ItemComment
            comment={comment}
            key={comment.id}
            setAuthor={setAuthor}
            setShowForm={setShowForm}
            setParentId={setParentId}
          />
        ))}
      </div>
      <div className='list-comments' style={{ padding: 0 }}>
        {showForm && (
          <CommentForm
            parentId={parentId}
            author={author}
            setShowForm={setShowForm}
          />
        )}
      </div>
    </div>
  )
}

interface ICommentItem {
  comment: IComment
  setShowForm: any
  setParentId: any
  setAuthor: any
}

export const ItemComment: FC<ICommentItem> = ({
  comment,
  setShowForm,
  setParentId,
  setAuthor
}) => {
  const idProfile = Number(localStorage.getItem('id'))

  const openForm = (id: number, name: string) => {
    setShowForm(true)
    setParentId(id)
    setAuthor(name)
  }

  const formMinute = (minute: number) =>
    minute.toLocaleString().length === 1 ? '0' + minute : minute
  const formatDate = (date: number) => {
    return (
      new Date(date * 1000).toLocaleDateString() +
      ' в ' +
      new Date(date * 1000).getHours() +
      ':' +
      formMinute(new Date(date * 1000).getMinutes())
    )
  }

  return (
    <div className={'item-comment'}>
      <div className='item-comment__body'>
        <div className='item-comment__avatar'>
          <img
            src={
              comment.customer_avatar
                ? IMAGE_URL + 'avatars/' + comment.customer_avatar
                : avatar
            }
            alt=''
          />
        </div>
        <div className='item-comment__info'>
          <div className='item-comment__author author-text'>
            {comment.customer_name}
          </div>
          <div className='item-comment__message message-text'>
            {comment.comment}
          </div>
          <div className='item-comment__data small-text-comment'>
            {formatDate(comment.created_at) || '12.12.21 в 12:32'}
            {comment.customer_id != idProfile && (
              <span onClick={() => openForm(comment.id, comment.customer_name)}>
                Ответить
              </span>
            )}
          </div>
        </div>
      </div>
      <div className='item-comment__answer'>
        {comment.childrens.length != 0 &&
          comment.childrens.map((item) => (
            <CommentAnswer
              key={comment.id}
              setParentId={setParentId}
              setShowForm={setShowForm}
              comment={item}
              setAuthor={setAuthor}
              replyAuthor={comment.customer_name}
            />
          ))}
      </div>
    </div>
  )
}
