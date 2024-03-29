import { useState, ChangeEvent, useEffect } from 'react'
import './creating-interesting.scss'
import Header from '../../Components/Header/Header'
import paper_clip from '../../assets/image/icon-paper-clip.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
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
import { rubricConversion, showToast } from '../../utils/common-functions'
import NewsService from '../../services/NewsService'
import { ICreatingNews } from '../../models/INews'
import { useLoadImage } from '../../hooks/useLoadImage'
import { typeImage } from '../../utils/enums'

export const CreatingInteresting = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const tempImage = useAppSelector(tempImageNewsSelector)
  const dataNews = useAppSelector(creatingNewsSelector)
  const [image, photoPath, isLoadingAvatar, clearImages, uploadImage] =
    useLoadImage()

  const takePicture = async () => {
    await uploadImage(typeImage.news)
  }

  const dispatch = useAppDispatch()

  const handlerTitle = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setTitleNews(e.target.value))

  const handlerContent = (e: ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(setContentNews(e.target.value))

  const handlerAnnotation = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setAnnotationNews(e.target.value))

  const handlerPush = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setPushNews(+e.target.checked))

  const publish = async () => {
    if (
      dataNews.title &&
      dataNews.annotation &&
      dataNews.category &&
      dataNews.content
    ) {
      const data: ICreatingNews = {
        title: dataNews.title,
        annotation: dataNews.annotation,
        content: dataNews.content,
        image: dataNews.image,
        category: dataNews.category,
        push: dataNews.push
      }
      setIsLoading(true)
      try {
        const response = await NewsService.creatingNews(data)
        if (response.data.news_id) {
          reset()
          clearImages()
          setShowModal(true)
        } else {
          await showToast('Ошибка')
        }
      } catch (e) {
        console.log(e)
        await showToast('Ошибка')
      } finally {
        setIsLoading(false)
      }
    } else {
      await showToast('Вы заполнили не все поля!')
    }
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

  useEffect(() => {
    if (image) {
      dispatch(setTempImageNews(photoPath))
      dispatch(setImageNews(image))
    }
  }, [image])

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
          {!isLoadingAvatar ? (
            <div
              onClick={takePicture}
              className='creating-interesting__cover text-blue'
            >
              <img src={paper_clip} alt='' />
              Загрузить обложку
            </div>
          ) : (
            <h1 className='creating-interesting__cover'>Загружается...</h1>
          )}
          <Link
            to={RUBRIC_ROUTE}
            className='creating-interesting__category text-blue'
          >
            Рубрика
          </Link>
          <div style={{ marginLeft: 20 }}>
            {rubricConversion(dataNews.category)}
          </div>
        </div>
        {tempImage && (
          <div className='creating-interesting__row'>
            <img
              className='creating-interesting__cover-image'
              src={tempImage}
              alt='cover'
            />
          </div>
        )}
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
          className={'creating-interesting__button _button-white'}
          disabled={isLoading}
          onClick={publish}
        >
          {isLoading ? (
            <span className='spinner'>
              <i className='fa fa-spinner fa-spin'></i> Загрузка
            </span>
          ) : (
            'Опубликовать'
          )}
        </button>
      </div>
    </div>
  )
}
