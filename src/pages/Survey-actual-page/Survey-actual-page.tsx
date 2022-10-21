import React, {useState} from 'react';
import './survey-actual-page.scss'
import {Quiz} from "../../Components/Quiz/Quiz";

const surveys = [
    {
        id: 1,
        title: "Заголовок вопроса. Вопроса номер 1",
        variants : [
            {
                id: 1,
                answer: 'Ответ на вопрос 1'
            },
            {
                id: 2,
                answer: 'Ответ на вопрос 2'
            },
            {
                id: 3,
                answer: 'Ответ на вопрос 3'
            },
        ]
    },
    {
        id: 2,
        title: "Заголовок вопроса. Вопроса номер 2",
        variants : [
            {
                id: 1,
                answer: 'Ответ на вопрос 1'
            },
            {
                id: 2,
                answer: 'Ответ на вопрос 2'
            },
            {
                id: 3,
                answer: 'Ответ на вопрос 3'
            },
        ]
    },    {
        id: 3,
        title: "Заголовок вопроса. Вопроса номер 3",
        variants : [
            {
                id: 1,
                answer: 'Ответ на вопрос 1'
            },
            {
                id: 2,
                answer: 'Ответ на вопрос 2'
            },
            {
                id: 3,
                answer: 'Ответ на вопрос 3'
            },
        ]
    }
]


export const SurveyActualPage = () => {

    const [checkedValues, setCheckedValues] = useState<any>()

    const showQuestion = (current: number) => {
        const itemQuestion = surveys[current]
        console.log(checkedValues);
        // return <Quiz
        //     answer_type={''}
        //     answers={itemQuestion.variants[current].answer}
        //     id={itemQuestion.id}
        //     question={itemQuestion.question}
        //     tag={itemQuestion.tag}
        //     handleChange={handleChange}
        //     value=checkedValues}
        // />
    }

    return (
        <div className={'survey-actual'}>
            <div className="survey-actual__pagination">
            </div>
        </div>
    );
};
