import { ChangeEvent, useEffect, useRef, useState } from 'react'
import paperclip from '../../assets/image/chat/icon_paperclip.svg'
import Header from '../../Components/Header/Header'
import ChatService from '../../services/ChatService'
import './chat-page.scss'

export const PersonalChat = () => {
  const id = Number(localStorage.getItem('id'))
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any>([])
  const socket: any = useRef()

  const sendMessage = () => {
    if (message.trim()) {
      const messagea = {
        message: message,
        id: id,
        event: 'message'
      }
      socket.current.send(JSON.stringify(messagea))
      setMessage('')

      //setMessages((prev:any)=>[...prev, message])
    }
    setMessage('')
  }


  useEffect(() => {
    async function asyncQuery() {
      const response = await ChatService.newChannel('канал', [164, 165])
      console.log(response.data);
    }
    asyncQuery()
  }, [])


  return (
    <div className='personal-chat'>
      <Header title={'Диалог #'} />
      <div className='personal-chat__container'>
        <div className='personal-chat__messages'>
          {messages.map((mess: any, i: any) => (
            <div
              className='personal-chat__message message-item'
              style={{ marginLeft: id === mess.id ? 'auto' : 0 }}
              key={i}
              id={'qw' + i}
            >
              <div className='message-item__text'>{mess?.message}</div>
              <div className='message-item__time'>
                {new Date().getHours() + ':' + new Date().getMinutes()}
              </div>
            </div>
          ))}
        </div>
        <div className='personal-chat__send'>
          <button className='personal-chat__paperclip'>
            <img src={paperclip} alt='paperclip' />
          </button>
          <input
            type='text'
            className='personal-chat__input'
            placeholder='Сообщение'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
            value={message}
          />
          <button
            className='personal-chat__submit icon-icon_send'
            onClick={sendMessage}
          ></button>
        </div>
      </div>
      <div className='line'></div>
    </div>
  )
}
