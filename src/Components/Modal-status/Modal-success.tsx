import React, { Dispatch, FC, SetStateAction } from 'react';
import './modal-status.scss'
import icon from '../../assets/image/icon_purpose__status_full.svg'
import { useNavigate } from 'react-router-dom';
import { RewardCount } from '../Reward/Reward-count';

interface IModalSuccess {   
    subTitle?: string,
    textButton?: string,
    route?: any,
    reward? : number
}

export const ModalSuccess: FC<IModalSuccess> = ({ reward,subTitle, textButton,route }) => {

    const navigation = useNavigate();

    const handler = () => {
        if(route){
           navigation(route); 
        }         
    };

    return (
        <div className={'modal-status active'}>
            <div className="modal-status__cross" onClick={handler}>&#10006;</div>
            <div className="modal-status__body">
                <div className="modal-status__icon">
                    <img src={icon} alt="icon" />
                </div>
                <div className="modal-status__title">
                Задание выполнено
                </div>
                <div className="modal-status__sub-title">
                    {subTitle || 'Ваша награда: '}  <RewardCount count={reward || 0}/>
                    
                </div>               
            </div>
        </div>
    );
};
