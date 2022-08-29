import {useAppDispatch, useAppSelector} from "../../Redux/hooks";
import {nameUserSelector, setDisabledButton, setNameUser} from "../../Redux/slice/registrationSlice";
import React from "react";

export const NameUser = () => {

    const nameUser = useAppSelector(nameUserSelector)
    const dispatch = useAppDispatch()

    const validateUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        dispatch(setNameUser(value))
        value.length < 3 ? dispatch(setDisabledButton(true)) : dispatch(setDisabledButton(false))
    }
    return (
        <div style={{position: "relative"}}>
            <input type="text" className="registration__field _field" value={nameUser}
                   onChange={validateUserName}/>
            <span className={'registration__sub-text-input'}>Это имя появится в профиле Healt Balance</span>
        </div>
    )
}