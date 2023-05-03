import { useEffect, useState, ChangeEvent } from 'react'
import { LECTURES_ROUTE } from '../../provider/constants-route'
import { challengeSelector } from '../../Redux/slice/challengeSlice'
import {
  checkTask,
  isLoadingSuccessSelector,
  lessonSelector,
  successSelector
} from '../../Redux/slice/lessonsSlice'
import LessonService from '../../services/LessonsService'
import { showToast } from '../../utils/common-functions'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { ModalSuccess } from '../Modals/Modal-success'
import { Preloader } from '../Preloader/Preloader'
import '../Lecture/lecture.scss'

export const DownloadFile = () => {
  const lesson = useAppSelector(lessonSelector)
  const challengeId = useAppSelector(challengeSelector)
  const dispacth = useAppDispatch()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const success = useAppSelector(successSelector)
  const isLoading = useAppSelector(isLoadingSuccessSelector)
  const [downloadFile, setDownloadFile] = useState<Blob | null>(null)

  const download = (e: ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files
    if (file[0]) {
      setDownloadFile(file[0])
    }
  }

  const complete = async () => {
    if (downloadFile && lesson) {
      try {
        setIsLoadingComplete(true)
        const dataTaskToCompleted = {
          file: downloadFile
        }
        await LessonService.complete(dataTaskToCompleted, lesson.id)
        setShowModal(true)
      } catch (error) {
        await showToast('Произошла ошибка!')
      }finally{
        setIsLoadingComplete(false)
      }
    } else {
      await showToast('Вы неправильно выполнили задание')
    }
  }

  useEffect(() => {
    lesson?.id && dispacth(checkTask(lesson.id))
  }, [showModal])

  if (isLoading) {
    return <Preloader height='auto' />
  }

  if (showModal) {
    return (
      <ModalSuccess
        // route={LECTURES_ROUTE + '/' + challengeId?.id}        
        setShowModal={setShowModal}
        showModal={showModal}
        updateActive={true}
        reward={lesson?.score}
      />
    )
  }

  if (success) {
    return <h1 style={{ textAlign: 'center', color: 'red' }}>Выполнено</h1>
  }

  return (
    <>
      <div className='task-lecture__title title-17'>Загрузите файл</div>
      <input
        id='file'
        type='file'
        className='creating-lecture__description'
        onChange={download}
      />
      <label
        htmlFor='file'
        className='task-lecture__button-download _button-dark-yellow'
      >
        Загрузить
      </label>
      <button
        className='task-lecture__button-execute _button-white'
        disabled={isLoadingComplete}
        onClick={complete}
      >
        {isLoadingComplete ? (
          <span className='spinner'>
            <i className='fa fa-spinner fa-spin'></i> Загрузка
          </span>
        ) : (
          'Выполнить'
        )}
      </button>
    </>
  )
}
