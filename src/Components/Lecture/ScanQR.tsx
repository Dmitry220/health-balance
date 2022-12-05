import React, { useState, useEffect } from "react";
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

import './lecture.scss'
import { checkTask, isLoadingSuccessSelector, lessonSelector, successSelector } from "../../Redux/slice/lessonsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux-hooks";
import { ModalSuccess } from "../Modal-status/Modal-success";
import { LECTURES_ROUTE } from "../../provider/constants-route";
import { challengeSelector } from "../../Redux/slice/challengeSlice";
import { showToast } from "../../utils/common-functions";
import LessonService from "../../services/LessonsService";

export const ScanQR = () => {


  const lesson = useAppSelector(lessonSelector)
  const challengeId = useAppSelector(challengeSelector)
  const dispacth = useAppDispatch()
  const [showModal, setShowModal] = useState<boolean>(false)

  const success = useAppSelector(successSelector)
  const isLoading = useAppSelector(isLoadingSuccessSelector)


  const startScan = async () => {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent && result.content === lesson?.qr_code && lesson?.id && result.content) {
      console.log(result.content);
      const params = new FormData()
      params.append("answer", result.content)
      const response = await LessonService.complete(params, lesson.id)
      if (response.data.success) {
        setShowModal(true)
      }
    } else {
      await showToast("Сканированный код не соответствует требуемому")
    }
  };

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
    return <ModalSuccess route={LECTURES_ROUTE + '/' + challengeId?.id} reward={lesson?.score}/>
  }

  return (
    <>
      <button className="task-lecture__button-execute _button-white" onClick={startScan}>Сканировать QR</button>
    </>
  )
}
