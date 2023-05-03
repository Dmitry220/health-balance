import { useState, useEffect, ChangeEvent } from 'react'
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

export const AnswerToQuestion = () => {
  const lesson = useAppSelector(lessonSelector)
  const challengeId = useAppSelector(challengeSelector)
  const dispacth = useAppDispatch()
  const [value, setValue] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const success = useAppSelector(successSelector)
  const isLoading = useAppSelector(isLoadingSuccessSelector)

  const complete = async () => {
    if (value !== '' && lesson?.id) {
      try {
        setIsLoadingComplete(true)
        const dataTaskToCompleted = {
          answer: value
        }
        await LessonService.complete(dataTaskToCompleted, lesson.id)
        setShowModal(true)
      } catch (error) { 

      }finally{
        setIsLoadingComplete(false)
      }
    } else {
      await showToast('Произошла ошибка')
    }
  }

  useEffect(() => {
    lesson?.id && dispacth(checkTask(lesson.id))
  }, [showModal])

  // if (isLoading) {
  //   return <Preloader height='auto' />
  // }

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
      <div className='task-lecture__title title-17'>{lesson?.question}</div>
      <input
        type='text'
        className='task-lecture__field _field'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
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
