import React, {FC} from 'react';
import './lecture.scss'
import {DownloadFile} from "./DowloadFile";
import {AnswerToQuestion} from "./AnswerToQuestion";
import {ScanQR} from "./ScanQR";
import {AnswerOptions} from "./AnswerOptions";

interface ILectureTask {
    typeTask: number
}

export const LectureTask:FC<ILectureTask> = ({typeTask}) => {

    const showTask = (type:number) => {
        switch (type) {
            case 1:
                return <DownloadFile />
            case 2:
                return <AnswerToQuestion />
            case 3:
                return <ScanQR />
            case 4:
                return <AnswerOptions />
            default:
                return <div>Задач нет!</div>
        }
    }

    return showTask(typeTask)

};





