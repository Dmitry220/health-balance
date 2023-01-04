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
import { ModalStatus } from '../Modals/Modal-status'
import { ModalSuccess } from '../Modals/Modal-success'
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

  const complete = async () => {
    console.log(lesson, value);
    
    if (+value === lesson?.correct_answer) {
      const params = new FormData()
      params.append('answer', value)
     try {
      const response = await LessonService.complete(params, lesson.id)
      console.log(response);      
      setShowModal(true)
     } catch (error) {      
     }
     
    } else {
      await showToast('Вы неправильно ответили на вопрос')
    }
  }

  useEffect(() => {
    lesson?.id && dispacth(checkTask(lesson.id))
  }, [])

  if (isLoading) {
    return <h1>Загрузка...</h1>
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
              type='radio'
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
