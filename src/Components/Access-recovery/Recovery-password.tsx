import React from 'react';
import './access-recovery.scss'

export const RecoveryPassword = () => {

    const handlerPassword = () => {}
    const handlerRepeatPassword = () => {}

    return (
        <div className={'recovery-password'}>
            <div className="recovery-password__title main-title">Новый пароль</div>
            <input type="password" className="recovery-password__field _field" onChange={handlerPassword}/>
            <div className="recovery-password__title main-title">Повторите пароль</div>
            <input type="password" className="recovery-password__field _field" onChange={handlerRepeatPassword}/>
        </div>
    );
};

