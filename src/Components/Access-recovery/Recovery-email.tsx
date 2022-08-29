import React, {FC, useState} from 'react';
import './access-recovery.scss'
import {useAppDispatch, useAppSelector} from "../../Redux/hooks";
import {emailRecoverySelector,setRecoveryEmail} from "../../Redux/slice/accessRecoverySlice";


export const RecoveryEmail = () => {

    const [isExists, setExists] = useState<boolean>(false)

    const handlerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRecoveryEmail(e.target.value))
    }

    const email = useAppSelector(emailRecoverySelector)
    const dispatch = useAppDispatch()

    return (
        <div className={'recovery-email'}>
            <div className="recovery-email__title main-title">Укажите почту</div>
            <input type="text" className={isExists ? "recovery-email__field _field error" : "recovery-email__field _field"} value={email} onChange={handlerEmail}/>
            {isExists && <div className="recovery-email__error">Учетная запись не с таким email не существует</div>}
        </div>
    );
};

