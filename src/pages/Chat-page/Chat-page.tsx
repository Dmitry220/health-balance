import axios from 'axios'
import { useEffect } from 'react'
import { ListDialog } from '../../Components/Chat/List-dialogs'
import Header from '../../Components/Header/Header'
import './chat-page.scss'
import { PersonalChat } from './Personal-chat'

export const ChatPage = () => {
  // useEffect(()=>{
  //     axios.get('').then((e:any)=>{
  //         console.log(e);

  //     })
  // }, [])

  return (
    <div className='chat'>
      <Header title='Чат' />
      <ListDialog />
    </div>
  )
}
