import {useAppDispatch, useAppSelector} from "../../Redux/hooks";
import {setDisabledButton, setTelephone, telephoneSelector} from "../../Redux/slice/registrationSlice";
import React from "react";

export const Telephone = () => {

    const telephone = useAppSelector(telephoneSelector)
    const dispatch = useAppDispatch()

    const validateTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        dispatch(setTelephone(value))
        value.length < 8 ? dispatch(setDisabledButton(true)) : dispatch(setDisabledButton(false))
    }
    return <input type='text' className="registration__field _field" value={telephone}
                  onChange={validateTelephone}/>
}

