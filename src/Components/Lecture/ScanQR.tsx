import { useState, useEffect } from 'react'
import { QrReader } from 'react-qr-reader'

import './lecture.scss'
import {
  checkTask,
  isLoadingSuccessSelector,
  lessonSelector,
  successSelector
} from '../../Redux/slice/lessonsSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/redux-hooks'
import { ModalSuccess } from '../Modals/Modal-success'
import { LECTURES_ROUTE } from '../../provider/constants-route'
import { challengeSelector } from '../../Redux/slice/challengeSlice'
import { showToast } from '../../utils/common-functions'
import LessonService from '../../services/LessonsService'
import { Preloader } from '../Preloader/Preloader'

export const ScanQR = () => {
  const lesson = useAppSelector(lessonSelector)
  const challengeId = useAppSelector(challengeSelector)
  const dispacth = useAppDispatch()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [startScan, setStartScan] = useState<boolean>(false)
  const [data, setData] = useState<string>('')

  const success = useAppSelector(successSelector)
  const isLoading = useAppSelector(isLoadingSuccessSelector)

  useEffect(() => {
    if (data) {
      checkQRCode()
    }
  }, [data])

  const checkQRCode = async () => {
    if (data === lesson?.qr_code && lesson?.id) {
      const params = new FormData()
      params.append('answer', data)
      const response = await LessonService.complete(params, lesson.id)
      if (response.data.success) {
        setShowModal(true)
        setData('')
      }
    } else {
      await showToast('Сканированный код не соответствует требуемому')
    }
  }

  // const startScan = async () => {
  // const status = await BarcodeScanner.checkPermission({ force: true })

  // if (status.granted) {
  //   BarcodeScanner.hideBackground()

  //   const result = await BarcodeScanner.startScan({
  //     targetedFormats: [SupportedFormat.QR_CODE]
  //   })

  //   if (
  //     result.hasContent &&
  //     result.content === lesson?.qr_code &&
  //     lesson?.id &&
  //     result.content
  //   ) {
  //     const params = new FormData()
  //     params.append('answer', result.content)
  //     const response = await LessonService.complete(params, lesson.id)
  //     if (response.data.success) {
  //       setShowModal(true)
  //     }
  //   } else {
  //     await showToast('Сканированный код не соответствует требуемому')
  //   }
  // }

  // return false
  // }

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

  if (startScan) {
    return (
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result.getText())
          }

          if (!!error) {
            console.info(error)
          }
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
      >
        Сканировать QR
      </button>
    </>
  )
}
