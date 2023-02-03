import { useEffect } from 'react'
import './lecture-pages.scss'
import Header from '../../Components/Header/Header'
import { LectureTask } from '../../Components/Lecture/Lecture-task'
import { Video } from '../../Components/Lecture/Video'
import { LectureHead } from '../../Components/Lecture/Lecture-head'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import {
  getLessonById,
  isLoadingSelector,
  lessonSelector
} from '../../Redux/slice/lessonsSlice'
import { useParams } from 'react-router-dom'
import { Preloader } from '../../Components/Preloader/Preloader'

export const LecturePage = () => {
  const params = useParams()

  const dispatch = useAppDispatch()

  const lesson = useAppSelector(lessonSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  useEffect(() => {
    dispatch(getLessonById(Number(params.id)))
  }, [])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={'lecture-page'}>
      <Header title={lesson?.title || 'Лекция'} />
      {lesson?.video && <div className='lecture-page__video'>
        <Video url={lesson?.video || ''} />
      </div>}

      <div className='lecture__task task-lecture'>
        <LectureHead
          text={lesson?.description || 'Описание'}
          title={'Задание'}
        />
        <div className='task-lecture__body'>
          <LectureTask typeTask={lesson?.type || 1} />
        </div>
      </div>
    </div>
  )
}
