import React from 'react';
import './creating-challenge.scss'

export const CreatingCommandsChallenge = () => {
    return (
        <div className={'creating-commands-challenge'}>
            <div className="creating-commands-challenge__title main-title">Команды</div>
            <div className="creating-commands-challenge__select _custom-select">
                <select>
                    <option value="">Количество команд</option>
                </select>
            </div>
            <div className="creating-commands-challenge__select _custom-select">
                <select>
                    <option value="">Участников на команду</option>
                </select>
            </div>
        </div>
    );
};

