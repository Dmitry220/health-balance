import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DIALOG__ROUTE } from '../../provider/constants-route'
import { dataUserSelector } from '../../Redux/slice/profileSlice'
import ChatService from '../../services/ChatService'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import './chat.scss'
import avatarPlug from '../../assets/image/avatar.jpeg'
import { IMAGE_URL } from '../../http'


interface IDialogComponent{
  avatar?: string,
  title?: string,
  date?: string
  idChannel:number
}

export const Dialog:FC<IDialogComponent> = ({idChannel,title,avatar,date}) => {
  const id = Number(localStorage.getItem('id'))

  const [dialogs, setDialogs] = useState<any[]>([])

  useEffect(() => {
    async function asyncQuery() {
      // const response = await ChatService.getChannels()
      // setDialogs(response.data.data)
    }
    asyncQuery()
   
  }, [])

  

  return (
    <Link to={DIALOG__ROUTE + '/' + idChannel} className='dialog'>
      <div className='dialog__row'>
        <div className='dialog__column'>
          <div className='dialog__img'>
          {avatar && <img src={IMAGE_URL + 'avatars/' + avatar} alt='avatar' />}
           {!avatar && <img src={avatarPlug} alt='avatar' />}
          </div>
          <div className='dialog__body'>
            <div className='dialog__title'>{title}</div>
            <div className='dialog__author'>
              Вы: <span>Сделайте так...</span>
            </div>
          </div>
        </div>
        <div className='dialog__column'>
          <div className='dialog__date'>{date?.slice(0,-10)}</div>
        </div>
      </div>
    </Link>
  )
}
