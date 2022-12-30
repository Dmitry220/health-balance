import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IAllChannels } from '../../models/IChat'
import ChatService from '../../services/ChatService'
import { Dialog } from './Dialog'

export const ListDialog = () => {

  const id = Number(localStorage.getItem('id'))
  const params = useParams()
  const [dialogs, setDialogs] = useState<IAllChannels[]>([])

  useEffect(() => {
    async function asyncQuery() {
      const response = await ChatService.getChannels()
      setDialogs(response.data.data)


    }
    asyncQuery()

  }, [])
  console.log(dialogs);

  return (
    <div>
      {
        dialogs.map(dialog => {
          if(dialog.members.length === 2){
            let companionId = dialog.members[0].id === id ? 1 : 0
            return <Dialog idChannel={dialog.id} key={dialog.id} 
            title={dialog.members[companionId].name + ' ' + dialog.members[companionId].surname } 
            avatar={dialog.members[companionId].avatar } 
            date={dialog.created_at.date}
            />
          }
          return <Dialog idChannel={dialog.id} key={dialog.id} title={dialog.title} />
        })
      }
    </div>
  )
}