import { FC, useEffect, useState } from 'react'
import './target.scss'
import icon_status_full from '../../assets/image/icon_purpose__status_full.svg'
import { Link } from 'react-router-dom'
import { NEW_TARGET_ROUTE } from '../../provider/constants-route'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  getPersonalPurpose,
  purposeSelector
} from '../../Redux/slice/purposeSlice'
import { IPurpose } from '../../models/IPurpose'
import { IStepsPerDay } from '../../models/IApp'
import { stepsPerDaySelector } from '../../Redux/slice/appSlice'
import PurposeService from '../../services/PurposeService'
import { ModalSuccess } from '../Modals/Modal-success'

interface ITarget {
  purpose?: IPurpose | null,
  currentSteps?: number,
  steps?: IStepsPerDay[]
}

export const Target: FC<ITarget> = () => {

  const dispatch = useAppDispatch()
  const purpose = useAppSelector(purposeSelector)
  const steps = useAppSelector(stepsPerDaySelector)

  useEffect(() => {
    dispatch(getPersonalPurpose())
  }, [])

  return (
    <div className={'target'}>
      <div className='target__container'>
        <div className='target__header'>
          <div className='target__title'>
            Цель - <span>{purpose?.quantity}</span>
          </div>
          <Link to={NEW_TARGET_ROUTE} className='target__change'>
            изменить цель
          </Link>
        </div>
        <div className='target__body'>
          {
            purpose && Object.values(steps.statistic).map(
              (item, i) =>
                <CircleDays key={i}
                  id={purpose.id} item={item}
                  reward={purpose.reward}
                  percent={(item.quantity * 100 / purpose.quantity) >= 100 ? 100 : item.quantity * 100 / purpose.quantity}
                />)
          }
        </div>
      </div>
    </div>
  )
}

interface IDays {
  percent: number,
  id: number,
  reward: number,
  item: IStepsPerDay
}

export const CircleDays: FC<IDays> = ({ percent, item, id, reward }) => {

  const circleOutlineLength: number = 295
  const [showModal, setShowModal] = useState<boolean>(false)


  useEffect(() => {
    (async () => {
      if (percent >= 100 && item.finished===false && new Date().setHours(0, 0, 0, 0) / 1000 === item.date) {
        const response = await PurposeService.completePersonalPurpose(id)
        if (response.data.success) {
          setShowModal(true)
        }  
      }
    })()
  }, [percent])

  if (showModal) {
    return <ModalSuccess updateActive={true} 
    setShowModal={setShowModal} showModal={showModal} subTitle='Ваша награда' reward={reward} title={'Личная цель на сегодня выполнена'} />
  }

  return (
    <div className='target__days days'>
      {item.finished ? (
        <img src={icon_status_full} alt='' className='days__circle' />
      ) : (
        <svg className='days__circle' viewBox='0 0 100 100'>
          <path
            d='M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94'
            fill={'#191919'}
            stroke={'#999999'}
            strokeWidth={3}
            id={'dfg'}
          ></path>
          <path
            d='M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94'
            stroke={'#56CCF2'}
            strokeWidth={3}
            fillOpacity={0}
            style={{
              strokeDasharray: '295.416, 295.416',
              strokeDashoffset:
                circleOutlineLength - (circleOutlineLength * percent) / 100
            }}
          ></path>
        </svg>
      )}
      <div className='days__text'>{item.day}</div>
    </div>
  )
}
