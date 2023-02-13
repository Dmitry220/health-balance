import { Dispatch, FC, SetStateAction } from 'react'
import './modals.scss'
import icon from '../../assets/image/icon_purpose__status_full.svg'
import { useNavigate } from 'react-router-dom'
import { RewardCount } from '../Reward/Reward-count'

interface IModalSuccess {
  subTitle?: string
  textButton?: string
  route?: any
  reward?: number,
  title?: string,
  setShowModal?:  Dispatch<SetStateAction<boolean>>
  showModal?: boolean 
}

export const ModalSuccess: FC<IModalSuccess> = ({
  reward,
  subTitle,
  textButton,
  route,
  setShowModal,
  showModal,
  title
}) => {
  const navigation = useNavigate()

  const handler = () => {
    if (route) {
      navigation(route)
    }else{      
      setShowModal&&setShowModal(false)
    }
  }

  return (
    <div className={'modal-status active'}>
      <div className='modal-status__cross' onClick={handler}>
        &#10006;
      </div>
      <div className='modal-status__body'>
        <div className='modal-status__icon'>
          <img src={icon} alt='icon' />
        </div>
        <div className='modal-status__title'>{title||'Задание выполнено'}</div>
        <div className='modal-status__sub-title'>
          {subTitle || 'Ваша награда: '} <RewardCount count={reward || 0} />
        </div>
      </div>
    </div>
  )
}
