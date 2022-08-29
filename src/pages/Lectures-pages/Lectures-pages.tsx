import React from 'react';
import './lecures-page.scss'
import CardLecture from "../../Components/Card-lecture/Card-lecture";
import Header from "../../Components/Header/Header";

export const LecturesPages = () => {

    return (
        <div className={'lectures-pages'}>
            <Header title={'Лекции и дз'} />
            <div className="lectures-pages__title main-title">Лекции</div>
            <CardLecture
                img={'https://inring.ru/images/stati/sport-dlya-doshkolnikov.jpg'}
                title={'Тут будет текст названия урока. Максимум в три строки'}
                date={'18.05.2022'}
                reward={15}
            />
            <CardLecture
                img={'https://inring.ru/images/stati/sport-dlya-doshkolnikov.jpg'}
                title={'Тут будет текст названия урока. Максимум в три строки'}
                date={'18.05.2022'}
                reward={15}
            />
            <CardLecture
                img={'https://inring.ru/images/stati/sport-dlya-doshkolnikov.jpg'}
                title={'Тут будет текст названия урока. Максимум в три строки'}
                date={'18.05.2022'}
                reward={15}
            />
        </div>
    );
};

