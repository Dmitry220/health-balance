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
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { ModalSuccess } from '../Modals/Modal-success'
import { Preloader } from '../Preloader/Preloader'
import '../Lecture/lecture.scss'

export const AnswerOptions = () => {
  const dispacth = useAppDispatch()

  const lesson = useAppSelector(lessonSelector)
  const answers = lesson?.answers
  const [value, setValue] = useState<string>('')
  const challengeId = useAppSelector(challengeSelector)
  const success = useAppSelector(successSelector)
  const isLoading = useAppSelector(isLoadingSuccessSelector)
  const [title, setTitle] = useState('Задание выполнено')
  const [showReward, setShowReward] = useState(true)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)

  const sendAnswer = async (lessonId: number) => {
    try {
      setIsLoadingComplete(true)
      const dataTaskToCompleted = {
        answer: value
      }
      const response = await LessonService.complete(dataTaskToCompleted, lessonId)
      if (response.status === 203) {
        setShowReward(false)
        setTitle('К сожалению, вы не правильно ответили на вопрос')
      }
    } catch (error) {
      console.log(error);
      setShowReward(false)
      setTitle('К сожалению, вы не правильно ответили на вопрос')
    }
    finally {
      setShowModal(true)
      setIsLoadingComplete(false)
    }
  }

  const complete = async () => {
    if (value) {
      await sendAnswer(lesson?.id!)
    } else {
      await showToast('Вы не ответили на вопрос')
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
        //route={LECTURES_ROUTE + '/' + challengeId?.id}
        showReward={showReward}
        setShowModal={setShowModal}
        showModal={showModal}
        updateActive={true}
        title={title}
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
