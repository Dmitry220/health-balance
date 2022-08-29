import React from 'react';

export const CardIndex = () => {
    return (
        <div className={'card-index'}>
            <div className="card-index__head">
                <div className="card-index__title">Уровень глюкозы в крови</div>
                <div className="card-index__hint">Есть риски</div>
            </div>

            <div className="card-index__value">6.6 ММОЛЬ</div>
        </div>
    );
};

