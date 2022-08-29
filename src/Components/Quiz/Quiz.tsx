import React, {ChangeEvent, FC} from 'react';
import './quiz.scss'
import {IQuestions} from "../../Redux/slice/quizSlice";


export interface IQuiz {
    answer_type: string,
    answers: string | null,
    id: string,
    question: string,
    tag: string,
    handleChange: (e:ChangeEvent<HTMLInputElement>)=>void,
    value: any
}

export const Quiz:FC<IQuiz> = ({answer_type,answers,id,question,tag, value, handleChange}) => {


    return (
        <div className={'quiz'}>
            <div className="quiz__title">{question}</div>
                <div className="custom-checkbox">
                    {answers && JSON.parse(answers).map((item:any, i:number)=>(<div key={i}>
                        <input checked={item===value} value={item} type="radio" name={'radio'+id} className={'custom-checkbox__checkbox'} id={i+id} onChange={handleChange} />
                        <label htmlFor={i+id}>{item}</label>
                    </div>))}
                </div>
        </div>
    );
};

