import { ChangeEvent, FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { setIdNewComment } from '../../Redux/slice/newsSlice'
import NewsService from '../../services/NewsService'
import { useAppDispatch } from '../../utils/hooks/redux-hooks'
import './commnet.scss'

interface ICommentForm {
  parentId: number
  author?: string | null
  setShowForm?: any
}

export const CommentForm: FC<ICommentForm> = ({
  parentId,
  author,
  setShowForm
}) => {
  const params = useParams()
  const idNews = Number(params.id)
  const [message, setMessage] = useState<string>('')
  const [openTextarea, setOpenTextArea] = useState(false)

  const dispatch = useAppDispatch()

  const handlerFocus = () => setOpenTextArea(true)

  const handlerMessage = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setMessage(e.target.value)

  const submit = async () => {
    const formData = new FormData()
    formData.append('news_id', JSON.stringify(idNews))
    formData.append('comment', message)
    formData.append('parent_id', JSON.stringify(parentId))
    const response = await NewsService.addCommentsNews(formData)
    dispatch(setIdNewComment(response.data.comment_id))
    setShowForm && setShowForm(false)
    setMessage('')
    setOpenTextArea(false)
  }

  return (
    <div className={'comment-form'}>
      {author && (
        <div className='comment-form__answer-author'>
          Вы отвечаете <span>{author}</span>
        </div>
      )}
      <div className='comment-form__body'>
        <textarea
          className='comment-form__textarea'
          value={message}
          onChange={handlerMessage}
          onFocus={handlerFocus}
          placeholder={!openTextarea ? 'Написать комментарий' : ''}
          style={{ height: openTextarea ? 124 : 44 }}
        />
        {openTextarea && (
          <button className={'comment-form__button-submit'} onClick={submit}>
            Отправить
          </button>
        )}
      </div>
    </div>
  )
}
