import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux-hooks";
import {setDisabledButton, setTelephone, telephoneSelector} from "../../Redux/slice/registrationSlice";
import InputMask from "react-input-mask";
import React from "react";

export const Telephone = () => {

    const telephone = useAppSelector(telephoneSelector)
    const dispatch = useAppDispatch()

    const validateTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        dispatch(setTelephone(value))
        const isFullTelephone = value.includes('_')
        isFullTelephone ? dispatch(setDisabledButton(true)) : dispatch(setDisabledButton(false))
    }

    return <InputMask
        className="registration__field _field"
        mask="+7 (999) 999-99-99"
        placeholder="+7 (---) --------"
        type={"tel"}
        onChange={validateTelephone}
        value={telephone}
    />
}

