import { ChangeEvent, useState, forwardRef, useEffect } from 'react'
import './creating-challenge.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  descriptionCreatingChallengeSelector,
  endDateCreatingChallengeSelector,
  setDescriptionChallenge,
  setEndDateChallenge,
  setImageChallenge,
  setStartDateChallenge,
  setTitleChallenge,
  setTypeChallenge,
  startDateCreatingChallengeSelector,
  titleCreatingChallengeSelector,
  typeCreatingChallengeSelector
} from '../../Redux/slice/challengeSlice'
import icon_edit from '../../assets/image/icon-edit.svg'
import icon_camera from '../../assets/image/icon-camera-add.svg'
import icon_clock from '../../assets/image/Interesting/clock.svg'
import { definitionColor, showToast } from '../../utils/common-functions'
import { RewardCount } from '../Reward/Reward-count'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import {
  creatingPurposeSelector,
  setRewardPurpose
} from '../../Redux/slice/purposeSlice'
import { useLoadImage } from '../../hooks/useLoadImage'
import { typeImage } from '../../utils/enums'

registerLocale('ru', ru)

export const FinalVariant = () => {
  const title = useAppSelector(titleCreatingChallengeSelector)
  const description = useAppSelector(descriptionCreatingChallengeSelector)
  const type = useAppSelector(typeCreatingChallengeSelector)
  const startDate = useAppSelector(startDateCreatingChallengeSelector)
  const endDate = useAppSelector(endDateCreatingChallengeSelector)
  const creatingPurpose = useAppSelector(creatingPurposeSelector)
  const [isEditReward, setIsEditReward] = useState<boolean>(false)
  const [isEditTitle, setIsEditTitle] = useState<boolean>(false)
  const [isEditDescription, setIsEditDescription] = useState<boolean>(false)
  const [image, photoPath, isLoadingAvatar, clearImages, uploadImage] = useLoadImage()
  const dispatch = useAppDispatch()

  const addCover = async () => {
    await uploadImage(typeImage.challenges)    
  }

  useEffect(() => {  
    if(image){
      dispatch(setImageChallenge(image))
    }    
  }, [image])  

  const changeDate = (dates: any) => {
    const [start, end] = dates
    dispatch(setStartDateChallenge(start))
    dispatch(setEndDateChallenge(end))
  }

  return (
    <div className={'final-variant'}>
      {!isLoadingAvatar ? (
        <div onClick={addCover} className='final-variant__image'>
          {photoPath && (
            <img
              className={'final-variant__image-main'}
              src={photoPath}
              alt=''
            />
          )}
          {!photoPath && (
            <div className={'final-variant__text'}>
              <img src={icon_camera} alt='' />
              <span>Загрузите обложку</span>
            </div>
          )}
        </div>
      ) : (
        <h1 className='final-variant__image'>Загружается...</h1>
      )}
      <div className='final-variant__header'>
        {!isLoadingAvatar ? (
          <div onClick={addCover} className='final-variant__icon'>
            {photoPath && <img src={photoPath} alt='' />}
            {!photoPath && (
              <div className={'final-variant__text'}>
                <img src={icon_camera} alt='' /> <br />
                <br />
                <span>icon</span>
              </div>
            )}
          </div>
        ) : (
          <h1 className='final-variant__icon'>...</h1>
        )}
        <div className='final-variant__header__info'>
          <div>
            <select
              name=''
              id=''
              className={definitionColor(type, 'final-variant__type')}
              defaultValue={type}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                dispatch(setTypeChallenge(+e.target.value))
              }
            >
              <option value='3'>Личный</option>
              <option value='2'>Командный</option>
            </select>
            <img src={icon_edit} alt='' />
          </div>
          <div className='final-variant__title'>
            {!isEditTitle && title}
            {isEditTitle && (
              <input
                type='text'
                value={title}
                onBlur={() => setIsEditTitle(false)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(setTitleChallenge(e.target.value))
                }
              />
            )}
            <img src={icon_edit} alt='' onClick={() => setIsEditTitle(true)} />
          </div>
        </div>
      </div>
      <div className='final-variant__description'>
        {!isEditDescription && description}
        {isEditDescription && (
          <input
            type='text'
            value={description}
            onBlur={() => setIsEditDescription(false)}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(setDescriptionChallenge(e.target.value))
            }
          />
        )}
        <img
          src={icon_edit}
          alt=''
          onClick={() => setIsEditDescription(true)}
        />
      </div>
      <div className='final-variant__row'>
        <ReactDatePicker
          onChange={changeDate}
          startDate={startDate}
          selectsRange
          endDate={endDate}
          dateFormat='dd.MM.yyyy'
          locale={ru}
          customInput={<ExampleCustomInput />}
        />
        <div className='final-variant__reward'>
          <div className='final-variant__reward-text'>Награда:</div>
          {!isEditReward && <RewardCount count={creatingPurpose.reward} />}
          {isEditReward && (
            <input
              type={'number'}
              value={creatingPurpose.reward}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch(setRewardPurpose(e.target.value))
              }
              onBlur={() => setIsEditReward((prev) => !prev)}
            />
          )}
          <img
            src={icon_edit}
            alt=''
            onClick={() => setIsEditReward((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  )
}

const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
  const type = useAppSelector(typeCreatingChallengeSelector)
  return (
    <div className={definitionColor(type, 'final-variant__data')}>
      <img className={'final-variant__data-clock'} src={icon_clock} alt='' />
      {value}
      <img
        className={'final-variant__data-edit'}
        src={icon_edit}
        alt=''
        onClick={onClick}
        ref={ref}
      />
    </div>
  )
})
