import { FC, useEffect } from 'react'
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

interface ITarget {
  purpose?: IPurpose | null,
  currentSteps?: number,
  steps: IStepsPerDay[]
}

export const Target:FC<ITarget> = ({purpose, currentSteps, steps}) => {
  const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const week = new Date().getDay()

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
          {purpose&&steps&&
            steps.map((item,i)=>{
              return <CircleDays key={item.id} title={item.date} percent={steps[i]?.quantiny * 100 / purpose?.quantity || 0} />
            })
          }
        {!steps && <> <CircleDays title={'Пн'} percent={0} />
          <CircleDays title={'Вт'} percent={0} />
          <CircleDays title={'Ср'} percent={0} />
          <CircleDays title={'Чт'} percent={0} />
          <CircleDays title={'Пт'} percent={100 || 0} />
          <CircleDays title={'Сб'} percent={0} />
          <CircleDays title={'Вс'} percent={0} /></>}
        </div>
      </div>
    </div>
  )
}

interface IDays {
  title: string
  percent: number
}

export const CircleDays: FC<IDays> = ({ title, percent }) => {
  const circleOutlineLength: number = 295

  return (
    <div className='target__days days'>
      {percent === 100 ? (
        <img src={icon_status_full} alt='' className='days__circle' />
      ) : (
        <svg className='days__circle' viewBox='0 0 100 100'>
          <path
            d='M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94'
            fill={'#191919'}
            stroke={'#999999'}
            strokeWidth={2}
            id={'dfg'}
          ></path>
          <path
            d='M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94'
            stroke={'#56CCF2'}
            strokeWidth={2}
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
