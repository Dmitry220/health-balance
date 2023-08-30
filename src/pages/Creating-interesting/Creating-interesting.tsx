import {ChangeEvent, useEffect, useState} from 'react'
import './creating-interesting.scss'
import Header from '../../Components/Header/Header'
import paper_clip from '../../assets/image/icon-paper-clip.svg'
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks'
import {
    creatingNewsSelector,
    handlerNews,
    previewImageSelector,
    resetDataNews,
    setPreviewImage,
} from '../../Redux/slice/newsSlice'
import {Link} from 'react-router-dom'
import {INTERESTING_ROUTE, RUBRIC_ROUTE} from '../../provider/constants-route'
import {ModalStatus} from '../../Components/Modals/Modal-status'
import {rubricConversion, showToast} from '../../utils/common-functions'
import {useCreateNewsMutation} from '../../services/news.api'
import {useLoadImage} from '../../hooks/useLoadImage'
import {typeImage} from '../../utils/enums'
import {errorHandler} from "../../utils/errorsHandler";

export const CreatingInteresting = () => {

    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState<boolean>(false)
    const dataNews = useAppSelector(creatingNewsSelector)
    const previewImage = useAppSelector(previewImageSelector)
    const [creatingNews, {isLoading}] = useCreateNewsMutation()
    const [image, photoPath, isLoadingAvatar, clearImages, uploadImage] =
        useLoadImage()

    const takePicture = async () => await uploadImage(typeImage.news)

    const handlerTitle = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(handlerNews({...dataNews, title: e.target.value}))

    const handlerContent = (e: ChangeEvent<HTMLTextAreaElement>) =>
        dispatch(handlerNews({...dataNews, content: e.target.value}))

    const handlerAnnotation = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(handlerNews({...dataNews, annotation: e.target.value}))

    const handlerPush = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(handlerNews({...dataNews, push: +e.target.checked as 0 | 1}))


    const publish = async () => {
        if (
            dataNews.title &&
            dataNews.annotation &&
            dataNews.category &&
            dataNews.content
        ) {
            await creatingNews(dataNews)
                .unwrap()
                .then((response) => {
                    if (response.news_id) {
                        reset()
                        clearImages()
                        setShowModal(true)
                    }
                })
                .catch(e => errorHandler(e))
        } else {
            await showToast('Вы заполнили не все поля!')
        }
    }

    const reset = () => dispatch(resetDataNews())

    useEffect(() => {
        if (image) {
            dispatch(handlerNews({...dataNews, image}))
            dispatch(setPreviewImage(photoPath))
        }
    }, [image])

    if (showModal) {
        return <ModalStatus route={INTERESTING_ROUTE}/>
    }

    return (
        <div className={'creating-interesting'}>
            <Header title={'Добавить интересное'}/>
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
                            <img src={paper_clip} alt=''/>
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
                    <div style={{marginLeft: 20}}>
                        {rubricConversion(dataNews.category)}
                    </div>
                </div>
                {previewImage && (
                    <div className='creating-interesting__row'>
                        <img
                            className='creating-interesting__cover-image'
                            src={previewImage}
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
