import { ChangeEvent, useState } from 'react'
import './commnet.scss'

export const CommentForm = () => {
  const [message, setMessage] = useState<string>('')
  const [openTextarea, setOpenTextArea] = useState(false)

  const handlerFocus = () => setOpenTextArea(true)

  const handlerMessage = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setMessage(e.target.value)

  const submit = () => {
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
