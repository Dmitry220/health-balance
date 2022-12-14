import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
  forwardRef
} from 'react'
import './creating-challenge.scss'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
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
import { definitionColor } from '../../utils/common-functions'
import { RewardCount } from '../Reward/Reward-count'
import FileService from '../../services/FilesServices'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import {
  creatingPurposeSelector,
  setQuantityPurpose,
  setRewardPurpose,
  setTypePurpose
} from '../../Redux/slice/purposeSlice'
import { Link } from 'react-router-dom'

registerLocale('ru', ru)

export const FinalVariant = () => {
  const title = useAppSelector(titleCreatingChallengeSelector)
  const description = useAppSelector(descriptionCreatingChallengeSelector)
  const type = useAppSelector(typeCreatingChallengeSelector)
  const startDate = useAppSelector(startDateCreatingChallengeSelector)
  const endDate = useAppSelector(endDateCreatingChallengeSelector)
  const creatingPurpose = useAppSelector(creatingPurposeSelector)
  const icon = false

  const [photoPath, setPhotoPath] = useState<any | null>(null)
  const [isEditReward, setIsEditReward] = useState<boolean>(false)
  const [isEditTitle, setIsEditTitle] = useState<boolean>(false)
  const [isEditDescription, setIsEditDescription] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const addCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    const file: any = e.target.files
    if (file[0]) {
      setPhotoPath(URL.createObjectURL(file[0]))
      formData.append('image', file[0])
      const response = await FileService.addImageChallenge(formData)
      dispatch(setImageChallenge(response.data.data.avatar))
    }
  }

  const changeDate = (dates: any) => {
    const [start, end] = dates
    dispatch(setStartDateChallenge(start))
    dispatch(setEndDateChallenge(end))
  }

  return (
    <div className={'final-variant'}>
      <input type={'file'} onChange={addCover} id='file' />
      <label htmlFor='file' className='final-variant__image'>
        {photoPath && (
          <img className={'final-variant__image-main'} src={photoPath} alt='' />
        )}
        {!photoPath && (
          <div className={'final-variant__text'}>
            <img src={icon_camera} alt='' />
            <span>?????????????????? ??????????????</span>
          </div>
        )}
      </label>
      <div className='final-variant__header'>
        <input type={'file'} onChange={addCover} id='iconFile' />
        <label htmlFor='iconFile' className='final-variant__icon'>
          {photoPath && <img src={photoPath} alt='' />}
          {!photoPath && (
            <div className={'final-variant__text'}>
              <img src={icon_camera} alt='' /> <br />
              <br />
              <span>icon</span>
            </div>
          )}
        </label>
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
              <option value='3'>????????????</option>
              <option value='2'>??????????????????</option>
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
          <div className='final-variant__reward-text'>??????????????:</div>
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
      {/* <div className='final-variant__tasks'>
        <article className='task-challenge__card-task card-task'>
          <div className='card-task__container'>
            <div className='card-task__title'>?????????? ????????????????</div>
            <div className={definitionColor(type, 'card-task__count')}>
              {0 + '/' + creatingPurpose.quantity + (type===3 ? ' ??????????': ' ????')}
            </div>
          </div>
        </article>
        <article className='task-challenge__card-task card-task'>
          <div className='card-task__container'>
            <div className='card-task__title'>?????????????????? ????????????????</div>
            <div className={definitionColor(type, 'card-task__count')}>
              {0 + '/' + 0 + ' ????????????'}
            </div>
          </div>
        </article>
        <article className='task-challenge__card-task card-task'>
          <div className='card-task__container'>
            <div className='card-task__title'>???????????????? ??????????????</div>
            <div className={definitionColor(type, 'card-task__count')}>
              {0 + '/' + 0 + ' ????'}
            </div>
          </div>
        </article>
      </div> */}
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
