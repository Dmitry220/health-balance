import { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import NewsService from '../../services/NewsService'
import './commnet.scss'

export const CommentForm = () => {

  const params = useParams()
  const idNews = Number(params.id)
  const [message, setMessage] = useState<string>('Отличная статья!')
  const [openTextarea, setOpenTextArea] = useState(false)

  const handlerFocus = () => setOpenTextArea(true)

  const handlerMessage = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setMessage(e.target.value)

  const submit = async () => {
    console.log(message, idNews);
    // const formData = new FormData()
    // formData.append("news_id", JSON.stringify(idNews))
    // formData.append("comment", message)
    // formData.append("parent_id", JSON.stringify(0))
    // const response = await NewsService.addCommentsNews(formData)
    // console.log(response);
    
    setOpenTextArea(false)
  }

  return (
    <div className={'comment-form'}>
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
