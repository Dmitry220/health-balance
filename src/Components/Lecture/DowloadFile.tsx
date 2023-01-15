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
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { ModalSuccess } from '../Modals/Modal-success'
import { Preloader } from '../Preloader/Preloader'
import './lecture.scss'

export const DownloadFile = () => {
  const lesson = useAppSelector(lessonSelector)
  const challengeId = useAppSelector(challengeSelector)
  const dispacth = useAppDispatch()
  const [showModal, setShowModal] = useState<boolean>(false)

  const success = useAppSelector(successSelector)
  const isLoading = useAppSelector(isLoadingSuccessSelector)
  const [downloadFile, setDownloadFile] = useState<any | null>(null)

  const download = (e: ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files
    if (file[0]) {
      setDownloadFile(URL.createObjectURL(file[0]))
    }
  }

  const complete = async () => {
    if (downloadFile && lesson) {
      const params = new FormData()
      params.append('answer', downloadFile)
      try {
        await LessonService.complete(params, lesson.id)
        setShowModal(true)
      } catch (error) {
        await showToast('Произошла ошибка!')
      }
    } else {
      await showToast('Вы неправильно выполнили задание')
    }
  }

  useEffect(() => {
    lesson?.id && dispacth(checkTask(lesson.id))
  }, [])

  if (isLoading) {
    return <Preloader />
  }

  if (success) {
    return <h1 style={{ textAlign: 'center', color: 'red' }}>Выполнено</h1>
  }

  if (showModal) {
    return (
      <ModalSuccess
        route={LECTURES_ROUTE + '/' + challengeId?.id}
        reward={lesson?.score}
      />
    )
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
        onClick={complete}
      >
        Выполнить
      </button>
    </>
  )
}
