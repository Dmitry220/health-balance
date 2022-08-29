import React from 'react';
import './creating-challenge.scss'

export const SelectPlatform = () => {
    return (
        <div className={'select-platform'}>
            <div className="select-platform__title main-title">Выберите платформу</div>
            <div className="select-platform__select _custom-select">
                <select>
                    <option value="">Ваша платформа</option>
                </select>
            </div>
        </div>
    );
};
