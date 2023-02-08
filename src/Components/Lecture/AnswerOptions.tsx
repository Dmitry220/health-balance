import { ChangeEvent, useEffect, useState } from 'react'
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

export const AnswerOptions = () => {
  const dispacth = useAppDispatch()

  const lesson = useAppSelector(lessonSelector)
  const answers = lesson?.answers
  const [value, setValue] = useState<string>('')
  const challengeId = useAppSelector(challengeSelector)
  const success = useAppSelector(successSelector)
  const isLoading = useAppSelector(isLoadingSuccessSelector)

  const [showModal, setShowModal] = useState<boolean>(false)

  const sendAnswer = async (lessonId: number) => {
    const params = new FormData()
    params.append('answer', value)
    try {
      await LessonService.complete(params, lessonId)
      setShowModal(true)
    } catch (error) {
      await showToast('Ошибка')
     }
  }

  const complete = async () => {
 
    if (lesson?.correct_answer === -1 && value) {
      await sendAnswer(lesson.id)
    } else {
      if (+value === lesson?.correct_answer) {
        await sendAnswer(lesson.id)
      } else {
        await showToast('Вы неправильно ответили на вопрос')
      }
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
      <div className='task-lecture__title title-17'>{lesson?.question}</div>
      <div className='task-lecture__answers-options custom-checkbox'>
        {answers?.map((answer, i) => (
          <div key={i}>
            <input
              type={'radio'}
              id={i + ''}
              className={'custom-checkbox__radio'}
              name={'radio'}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              value={i}
            />
            <label htmlFor={i + ''}>{answer}</label>
          </div>
        ))}
      </div>
      <button
        className='task-lecture__button-execute _button-white'
        onClick={complete}
      >
        Выполнить
      </button>
    </>
  )
}
