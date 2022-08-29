import React from "react";
import './lecture.scss'

export const AnswerToQuestion = () => {
    return (
        <>
            <div className="task-lecture__title title-17">Ответ на вопрос</div>
            <input type='text' className="task-lecture__field _field" />
            <button className="task-lecture__button-execute _button-white">Выполнить</button>
        </>
    )
}
