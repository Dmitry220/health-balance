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
import { currentStepsCountSelector, daysSelector, setActualStepsbyWeek, setDaysWeek, stepsPerDaySelector } from '../../Redux/slice/appSlice'
import PurposeService from '../../services/PurposeService'

interface ITarget {
  purpose?: IPurpose | null,
  currentSteps?: number,
  steps?: IStepsPerDay[]
}

export const Target: FC<ITarget> = () => {

  const dispatch = useAppDispatch()
  const days = useAppSelector(daysSelector)  
  const purpose = useAppSelector(purposeSelector)
  const steps = useAppSelector(stepsPerDaySelector)

  useEffect(()=>{
    dispatch(getPersonalPurpose())
  }, [])

  // useEffect(() => {
  //   dispatch(setDaysWeek())
  //   overwriteDaysWeek()
   
  // }, [steps])


  // const overwriteDaysWeek = () => {
  //   steps?.forEach(item=>dispatch(setActualStepsbyWeek(item)))    
  // }

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
            purpose&&days.map(
              item => 
              <CircleDays key={item.id} id={purpose.id} date={item.date} finished={item.finished} title={item.title} percent={(item.quantity * 100 / purpose.quantity)>=100 ? 100:item.quantity * 100 / purpose.quantity} />)
          }         
        </div>
      </div>
    </div>
  )
}

interface IDays {
  title: string
  percent: number,
  finished: null | number
  id: number,
  date: number
}

export const CircleDays: FC<IDays> = ({ title, percent,finished,id,date }) => {

  const circleOutlineLength: number = 295
  const currentStepsCount = useAppSelector(currentStepsCountSelector)

  useEffect(()=>{
    if(percent >= 100 && finished === null && (new Date(date).getTime() === date)){     
      PurposeService.completePersonalPurpose(id)
    }
  }, [currentStepsCount])

  return (
    <div className='target__days days'>
      {finished === 1 ? (
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
      <div className='days__text'>{title}</div>
    </div>
  )
}
