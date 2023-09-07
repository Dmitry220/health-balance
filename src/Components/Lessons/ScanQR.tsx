import { useState, useEffect } from 'react'
import { QrReader } from 'react-qr-reader'

import '../Lecture/lecture.scss'
import {
  checkTask,
  isLoadingSuccessSelector,
  lessonSelector,
  successSelector
} from '../../Redux/slice/lessonsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { ModalSuccess } from '../Modals/Modal-success'
import { showToast } from '../../utils/common-functions'
import LessonService from '../../services/LessonsService'
import { Preloader } from '../Preloader/Preloader'

export const ScanQR = () => {
  const lesson = useAppSelector(lessonSelector)
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [startScan, setStartScan] = useState<boolean>(false)
  const [data, setData] = useState<string>('')
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const success = useAppSelector(successSelector)
  const isLoading = useAppSelector(isLoadingSuccessSelector)

  useEffect(() => {
    if (data) checkQRCode()
  }, [data])

  const checkQRCode = async () => {
    if (data === lesson?.qr_code && lesson?.id) {
      try {
        setIsLoadingComplete(true)
        const dataTaskToCompleted = {
          answer: data
        }
        const response = await LessonService.complete(
          dataTaskToCompleted,
          lesson.id
        )
        if (response.data.success) {
          setShowModal(true)
          setData('')
        }
      } catch (error) {
      } finally {
        setIsLoadingComplete(false)
      }
    } else await showToast('Сканированный код не соответствует требуемому')
  }

  useEffect(() => {
    lesson?.id && dispatch(checkTask(lesson.id))
  }, [showModal])

  if (isLoading) return <Preloader height='auto' />

  if (showModal) {
    return (
      <ModalSuccess
        //route={LECTURES_ROUTE + '/' + challengeId?.id}
        setShowModal={setShowModal}
        showModal={showModal}
        updateActive={true}
        reward={lesson?.score}
      />
    )
  }

  if (success)
    return <h1 style={{ textAlign: 'center', color: 'red' }}>Выполнено</h1>

  if (startScan) {
    return (
      <QrReader
        scanDelay={0}
        onResult={(result, error) => {
          if (!!result) setData(result.getText())
          if (!!error) console.info(error)
        }}
        containerStyle={{ width: '100%' }}
        constraints={{ facingMode: 'environment' }}
      />
    )
  }

  return (
    <>
      <button
        className='task-lecture__button-execute _button-white'
        onClick={() => setStartScan(true)}
        disabled={isLoadingComplete}
      >
        {isLoadingComplete ? (
          <span className='spinner'>
            <i className='fa fa-spinner fa-spin'></i> Загрузка
          </span>
        ) : (
          'Сканировать QR'
        )}
      </button>
    </>
  )
}
