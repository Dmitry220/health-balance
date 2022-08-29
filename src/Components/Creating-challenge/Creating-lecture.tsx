import React from 'react';
import './creating-challenge.scss'

export const CreatingLecture = () => {
    return (
        <div className={'creating-lecture'}>
            <div className="creating-lecture__title creating-title">Лекции и ДЗ</div>
            <div className="creating-lecture__sub-title creating-sub-title">Лекции</div>
            <input type="text" className="creating-lecture__input _field" placeholder={'Заголовок лекции'}/>
            <button className={'creating-lecture__button-download _button-dark-yellow'}>Загрузить лекцию</button>

            <div className="creating-lecture__sub-title creating-sub-title">Задание</div>
            <input type="text" className="creating-lecture__input _field" placeholder={'Описание задания'}/>
            <div className="creating-lecture__select _custom-select">
                <select name="type-task" id="type-task">
                    <option value="">Тип задания</option>
                </select>
            </div>
            <div className="creating-lecture__buttons">
                <button className="creating-lecture__button button-end">Завершить</button>
                <button className="creating-lecture__button _button-white">Добавить лекцию</button>
            </div>
        </div>
    );
};
