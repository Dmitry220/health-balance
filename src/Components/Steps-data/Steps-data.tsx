import './steps-data.scss'
import arrowDanger from '../../assets/image/Arrow.svg'
import arrowSuccess from '../../assets/image/Arrow-success.png'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { currentStepsCountSelector, daysSelector, stepsPerDaySelector } from '../../Redux/slice/appSlice'
import { purposeSelector } from '../../Redux/slice/purposeSlice'

export const StepsData = () => {

  const purpose = useAppSelector(purposeSelector)
  const steps = useAppSelector(stepsPerDaySelector)
  const currentStepsCount = useAppSelector(currentStepsCountSelector)

  return (
    <div className={'steps-data'}>
      <div className='steps-data__content'>
        <article className='steps-data__card'>
          <div className='steps-data__value'>{purpose&&(currentStepsCount *100 / purpose?.quantity <=100 || 100)}%</div>
          <div className='steps-data__text'>
            Цель: <br />
            <span>{purpose?.quantity} шагов</span>
          </div>
        </article>
        <article className='steps-data__card average'>
          <div className='steps-data__value'>
         { steps?.length >= 2 ? <img src={steps[steps.length-1].quantity > steps[steps.length-2].quantity ? arrowSuccess:arrowDanger} alt='arrow' /> : ''}
           
          </div>
          <div className='steps-data__text'>
            {'на '} <span>
            {steps?.length >= 2 && Math.abs(steps[steps.length-1].quantity - steps[steps.length-2].quantity)}
              {' шагов '} 
            {steps?.length >= 2 && steps[steps.length-1].quantity > steps[steps.length-2].quantity ? ' больше':' меньше'},</span>
            чем вчера
          </div>
        </article>
        <article className='steps-data__card'>
          <div className='steps-data__value'>
            <span>+0</span>{' '}
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
