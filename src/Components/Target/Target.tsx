import { FC, useEffect } from 'react'
import './target.scss'
import { Link } from 'react-router-dom'
import { NEW_TARGET_ROUTE } from '../../provider/constants-route'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  getPersonalPurpose,
  purposeSelector, setPurposeSteps
} from '../../Redux/slice/purposeSlice'
import { IPurpose } from '../../models/IPurpose'
import { IStepsPerDay } from '../../models/IApp'
import { stepsPerDaySelector } from '../../Redux/slice/appSlice'
import { CircleDays } from './Circle-days'

interface ITarget {
  purpose?: IPurpose | null
  currentSteps?: number
  steps?: IStepsPerDay[]
}

export const Target: FC<ITarget> = () => {
  const dispatch = useAppDispatch()
  const purpose = useAppSelector(purposeSelector)
  const steps = useAppSelector(stepsPerDaySelector)

  useEffect(() => {
    dispatch(getPersonalPurpose()).unwrap().then(e=>{
      if(!e.quantity){
        dispatch(setPurposeSteps({ quantity:'10000', type: 1 }))
      }
    })
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
          {purpose &&
            Object.values(steps.statistic).map((item, i) => (
              <CircleDays
                key={i}
                item={item}
                percent={
                  (item.quantity * 100) / purpose.quantity >= 100
                    ? 100
                    : (item.quantity * 100) / purpose.quantity
                }
              />
            ))}
        </div>
      </div>
    </div>
  )
}
