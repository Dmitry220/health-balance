import React from "react";
import './lecture.scss'

export const AnswerOptions = () => {

    return (
        <>
            <div className="task-lecture__title title-17">Выберите правильный ответ</div>
            <div className="task-lecture__answers-options custom-checkbox">
                <input type="radio" id='var1' className={'custom-checkbox__radio'} name={'radio'}/>
                <label htmlFor="var1">Вариант 1</label>
                <input type="radio" id='var2' className={'custom-checkbox__radio'} name={'radio'}/>
                <label htmlFor="var2" className='custom-checkbox__radio'>Вариант 2</label>
            </div>
            <button className="task-lecture__button-execute _button-white">Выполнить</button>
        </>
    )
}