import { useState, ChangeEvent } from 'react'
import './creating-interesting.scss'
import Header from '../../Components/Header/Header'
import paper_clip from '../../assets/image/icon-paper-clip.svg'
import { Camera, CameraResultType } from '@capacitor/camera'
import {
  setAvatarRegistartion,
  setDisabledButton
} from '../../Redux/slice/authSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  creatingNews,
  creatingNewsSelector,
  setAnnotationNews,
  setContentNews,
  setImageNews,
  setPushNews,
  setRubricNews,
  setTempImageNews,
  setTitleNews,
  tempImageNewsSelector
} from '../../Redux/slice/newsSlice'
import { Link } from 'react-router-dom'
import { INTERESTING_ROUTE, RUBRIC_ROUTE } from '../../provider/constants-route'
import { ModalStatus } from '../../Components/Modals/Modal-status'
import FileService from '../../services/FilesServices'
import { rubricConversion } from '../../utils/common-functions'


export const CreatingInteresting = () => {
  
  const [showModal, setShowModal] = useState<boolean>(false)
  const tempImage = useAppSelector(tempImageNewsSelector)
  const takePicture = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    const file: any = e.target.files
    if (file[0]) {
      dispatch(setTempImageNews(URL.createObjectURL(file[0])))
      formData.append('image', file[0])
      const response = await FileService.addImageNews(formData)
      dispatch(setImageNews(response.data.data.avatar))
    }
  }

  const dispatch = useAppDispatch()

  const dataNews = useAppSelector(creatingNewsSelector)

  const handlerTitle = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setTitleNews(e.target.value))

  const handlerContent = (e: ChangeEvent<HTMLTextAreaElement>) =>
    {dispatch(setContentNews(e.target.value))
  }

  const handlerAnnotation = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setAnnotationNews(e.target.value))

  const handlerPush = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setPushNews(+e.target.checked))

  const publish = async () => {
    await dispatch(creatingNews())
    reset()
    setShowModal(true)
  }


  const reset = () => {
    dispatch(setPushNews(0))
    dispatch(setAnnotationNews(''))
    dispatch(setContentNews(''))
    dispatch(setTitleNews(''))
    dispatch(setImageNews(''))
    dispatch(setTempImageNews(''))
    dispatch(setRubricNews(0))
  }

  if (showModal) {
    return <ModalStatus route={INTERESTING_ROUTE} />
  }

  return (
    <div className={'creating-interesting'}>
      <Header title={'Добавить интересное'} />
      <div className='creating-interesting__container'>
        <div className='creating-interesting__fields'>
          <input
            type='text'
            className='creating-interesting__field'
            placeholder={'Введите заголовок записи...'}
            value={dataNews.title}
            onChange={handlerTitle}
            required
          />
          <input
            type='text'
            className='creating-interesting__field'
            placeholder={'Введите аннотацию...'}
            onChange={handlerAnnotation}
            value={dataNews.annotation}
            required
          />
          <textarea
            className='creating-interesting__field'
            placeholder={'Введите текст записи...'}
            onChange={handlerContent}
            value={dataNews.content}
          />
        </div>
        <div className='creating-interesting__row'>
          <input id='cover' type='file' onChange={takePicture} />
          <label
            htmlFor='cover'
            className='creating-interesting__cover text-blue'
          >
            <img src={paper_clip} alt='' />
            Загрузить обложку
          </label>
          <Link
            to={RUBRIC_ROUTE}
            className='creating-interesting__category text-blue'
          >
            Рубрика
          </Link>
          <div style={{marginLeft: 20}}>{rubricConversion(dataNews.category)}</div>
        </div>
        {tempImage &&<div className='creating-interesting__row'>         
            <img
              className='creating-interesting__cover-image'
              src={tempImage}
              alt='cover'
            />          
        </div>}
        <div className='creating-interesting__push'>
          <div className='custom-checkbox'>
            <input
              type='checkbox'
              className='custom-checkbox__checkbox'
              id={'push'}
              checked={dataNews.push === 1}
              onChange={handlerPush}
            />
            <label htmlFor='push'>Отправить PUSH</label>
          </div>
        </div>
        <button
          className='creating-interesting__button _button-white'
          onClick={publish}
        >
          Опубликовать
        </button>
      </div>
    </div>
  )
}
