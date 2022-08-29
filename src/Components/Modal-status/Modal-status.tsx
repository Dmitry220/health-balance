import React, {Dispatch, FC, SetStateAction} from 'react';
import './modal-status.scss'
import icon from '../../assets/image/icon_purpose__status_full.svg'

interface IModalStatus {
    active: boolean,
    setActive: Dispatch<SetStateAction<boolean>>,
    subTitle?: string,
    textButton?: string
}

export const ModalStatus:FC<IModalStatus> = ({active, setActive, subTitle, textButton}) => {

    if(!active) return null

    return (
        <div className={active ? 'modal-status active' : 'modal-status'}>
            <div className="modal-status__cross" onClick={() => setActive(false)}>&#10006;</div>
            <div className="modal-status__body">
                <div className="modal-status__icon">
                    <img src={icon} alt="icon"/>
                </div>
                <div className="modal-status__title">
                    Успех!
                </div>
                <div className="modal-status__sub-title">
                    {subTitle || 'Новость появится после проверки модератором'}
                </div>
                <button className="modal-status__button _button-white" onClick={() => setActive(false)}>
                    {textButton || 'Ок'}
                </button>
            </div>
        </div>
    );
};
