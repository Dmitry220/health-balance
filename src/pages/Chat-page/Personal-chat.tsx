import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import paperclip from '../../assets/image/chat/icon_paperclip.svg'
import Header from '../../Components/Header/Header'
import { IAllMessages } from '../../models/IChat'
import ChatService from '../../services/ChatService'
import './chat-page.scss'

export const PersonalChat = () => {
  const id = Number(localStorage.getItem('id'))

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<IAllMessages[]>([])
  const params = useParams()
  const idChannel = Number(params.id)

  const sendMessage = async () => {
    if (message.trim()) {
      const response = await ChatService.sendMessage(message,idChannel)
      console.log(response);
      const allMessages = await ChatService.listMessages(idChannel)
      setMessages(allMessages.data.data)  
      //setMessages(prev=>[...prev,response.data.data])
      setMessage('')
    } 
  }

  useEffect(() => {

      let interval = setInterval(async ()=>{
        const allMessages = await ChatService.listMessages(idChannel)
        setMessages(allMessages.data.data)   
        console.log(allMessages.data.data);
      }, 5000)
          
    return ()=>clearInterval(interval)
  
  }, [])


  return (
    <div className='personal-chat'>
      <Header title={'Диалог #'} />
      <div className='personal-chat__container'>
        <div className='personal-chat__messages'>
          {messages.map((mess, i) => (
            <div
              className='personal-chat__message message-item'
              style={{ marginLeft: id === mess.author.id ? 'auto' : 0 }}
              key={i}
              id={'qw' + i}
            >
              <div className='message-item__text'>{mess.content}</div>
              <div className='message-item__time'>
                {mess.createdAt.date.slice(7,-7)}
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
