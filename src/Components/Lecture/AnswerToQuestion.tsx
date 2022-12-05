import React, { useState, useEffect, ChangeEvent } from "react";
import { LECTURES_ROUTE, LECTURE_ROUTE } from "../../provider/constants-route";
import { challengeIdSelector, challengeSelector } from "../../Redux/slice/challengeSlice";
import { checkTask, isLoadingSuccessSelector, lessonSelector, successSelector } from "../../Redux/slice/lessonsSlice";
import LessonService from "../../services/LessonsService";
import { showToast } from "../../utils/common-functions";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux-hooks";
import { ModalStatus } from "../Modal-status/Modal-status";
import { ModalSuccess } from "../Modal-status/Modal-success";
import './lecture.scss'

export const AnswerToQuestion = () => {

    const lesson = useAppSelector(lessonSelector)
    const challengeId = useAppSelector(challengeSelector)
    const dispacth = useAppDispatch()
    const [value, setValue] = useState<string>('')
    const [showModal, setShowModal] = useState<boolean>(false)


    const success = useAppSelector(successSelector)
    const isLoading = useAppSelector(isLoadingSuccessSelector)

    const complete = async () => {

        if (value != '' && lesson?.id) {
            const params = new FormData()
            params.append("answer", value)
            const response = await LessonService.complete(params, lesson.id)
            console.log(response);
            
            if (response.data.success) {
                setShowModal(true)
            }

        } else {
            await showToast("Произошла ошибка")
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
        return <ModalSuccess route={LECTURES_ROUTE + '/' + challengeId?.id} />
    }

    return (
        <>
            <div className="task-lecture__title title-17">{lesson?.question}</div>
            <input type='text' className="task-lecture__field _field" onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
            <button className="task-lecture__button-execute _button-white" onClick={complete}>Выполнить</button>
        </>
    )
}
