import React from 'react';
import warning from '../../assets/image/icon-warning.svg'
import danger from '../../assets/image/icon-danger.svg'

export const CardDisease = () => {
    return (
        <div className={'card-disease'}>
            <div className="card-disease__title">Сахарный диабет</div>
            <div className="card-disease__mark" style={{color: '#F24A4A'}}><img src={danger} alt=""/>Высокий</div>
        </div>
    );
};

