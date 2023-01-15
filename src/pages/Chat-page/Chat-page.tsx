import { ListDialog } from '../../Components/Chat/List-dialogs'
import Header from '../../Components/Header/Header'
import './chat-page.scss'

export const ChatPage = () => {
  return (
    <div className='chat'>
      <Header title='Чат' />
      <ListDialog />
    </div>
  )
}
