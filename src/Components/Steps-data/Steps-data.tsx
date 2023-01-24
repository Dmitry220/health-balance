import './steps-data.scss'
import arrowDanger from '../../assets/image/Arrow.svg'
import arrowSuccess from '../../assets/image/Arrow-success.png'
import { useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  currentStepsCountSelector,
  stepsPerDaySelector
} from '../../Redux/slice/appSlice'
import { purposeSelector } from '../../Redux/slice/purposeSlice'
import { sklonenie } from '../../utils/common-functions'

export const StepsData = () => {
  const purpose = useAppSelector(purposeSelector)
  const steps = useAppSelector(stepsPerDaySelector)
  const currentStepsCount = useAppSelector(currentStepsCountSelector)
  const sortStepsForDate = steps
    ? steps?.slice().sort((a, b) => a.date - b.date)
    : []
  let currentProgressPurpose =purpose && steps
    ? sortStepsForDate[sortStepsForDate.length - 1]?.finished === 1
      ? 100
      : ((currentStepsCount * 100) / purpose?.quantity).toFixed(2)
    : 0

  return (
    <div className={'steps-data'}>
      <div className='steps-data__content'>
        <article className='steps-data__card'>
          <div className='steps-data__value'>{currentProgressPurpose}%</div>
          <div className='steps-data__text'>
            Цель: <br />
            <span>
              {purpose?.quantity}
              {purpose?.quantity &&
                sklonenie(purpose?.quantity, [' шаг', ' шага', ' шагов'])}
            </span>
          </div>
        </article>
        <article className='steps-data__card average'>
          <div className='steps-data__value'>
            {sortStepsForDate?.length >= 2 ? (
              <img
                src={
                  sortStepsForDate[sortStepsForDate.length - 1].quantity >
                    sortStepsForDate[sortStepsForDate.length - 2].quantity
                    ? arrowSuccess
                    : arrowDanger
                }
                alt='arrow'
              />
            ) : (
              ''
            )}
          </div>
          {sortStepsForDate.length<2 || sortStepsForDate[sortStepsForDate.length-1].quantity === sortStepsForDate[sortStepsForDate.length-2].quantity ? 
           <div className="steps-data__text">
              Шагов пройдено столько же, сколько и в прошлый раз
            </div> : 
            <div className='steps-data__text'>
            {'на '}{' '}
            <span>
              {sortStepsForDate?.length >= 2
                ? Math.abs(
                  sortStepsForDate[sortStepsForDate.length - 1].quantity -
                  sortStepsForDate[sortStepsForDate.length - 2].quantity
                )
                : 0}
              {sklonenie(
                Math.abs(
                  sortStepsForDate[sortStepsForDate.length - 1]?.quantity -
                  sortStepsForDate[sortStepsForDate.length - 2]?.quantity
                ),
                [' шаг', ' шага', ' шагов']
              )}
              {sortStepsForDate?.length >= 2 &&
                (sortStepsForDate[sortStepsForDate.length - 1].quantity >
                  sortStepsForDate[sortStepsForDate.length - 2].quantity
                  ? ' больше'
                  : ' меньше')}
              ,
            </span>
            чем в прошлый раз
          </div>}
        </article>
        <article className='steps-data__card'>
          <div className='steps-data__value'>
            <span>+{sortStepsForDate[sortStepsForDate.length-1]?.finished === 1 ? purpose?.reward : 0}</span>{' '}
          </div>
          <div className='steps-data__text'>
            <span>Health coin</span> <br />
            получено
          </div>
        </article>
      </div>
    </div>
  )
}
