import React, { ChangeEvent, useState } from "react";
import { isLoadingSelector, lessonSelector } from "../../Redux/slice/lessonsSlice";
import { showToast } from "../../utils/common-functions";
import { useAppSelector } from "../../utils/hooks/redux-hooks";
import './lecture.scss'

export const AnswerOptions = () => {

    const lesson = useAppSelector(lessonSelector)
    const answers = lesson?.answers.split(';')

    const [value, setValue] = useState<string>('')

    console.log(value);
    
    const complete = async () => {
        if(+value === lesson?.correct_answer){             
            showToast("Задание выполнено")        
        }else{
            showToast("Вы не правильно ответили на вопрос")
        }
    }


    return (
        <>
            <div className="task-lecture__title title-17">{lesson?.question}</div>
            <div className="task-lecture__answers-options custom-checkbox">
                {answers?.map((answer, i) =>
                    <div key={i}>
                        <input type="radio" id={i + ''} className={'custom-checkbox__radio'} name={'radio'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} value={i} />
                        <label htmlFor={i + ''}>{answer}</label>
                    </div>
                )}
            </div>
            <button className="task-lecture__button-execute _button-white" onClick={complete}>Выполнить</button>
        </>
    )
}