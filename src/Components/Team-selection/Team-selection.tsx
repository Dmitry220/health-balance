import React from 'react';
import './team-selection.scss'

export const TeamSelection = () => {
    return (
        <div className={'team-selection'}>
           <TeamItem />
           <TeamItem />
           <TeamItem />
           <TeamItem />
           <TeamItem />
        </div>
    );
};

const TeamItem = () => {
    return (
        <div className="team-selection__item team-item">
            <div className="team-item__column">
                <div className="team-item__img">
                    <img src="" alt=""/>
                </div>
                <div className="team-item__title">HARDCORE</div>
            </div>
            <div className="team-item__join text-blue">Вступить</div>
            {/*<div className="team-item__joined text-yellow">Вы в команде <span /></div>*/}
        </div>
    )
}