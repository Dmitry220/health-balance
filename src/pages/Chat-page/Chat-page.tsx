import axios from 'axios'
import { useEffect } from 'react'
import { ListChat } from '../../Components/Chat/List-chat'
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
    <div>
      <Header title='Чат' />
      <ListChat />
      {/* <PersonalChat /> */}
    </div>
  )
}
