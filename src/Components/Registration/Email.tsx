import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux-hooks";
import {emailSelector, setDisabledButton, setEmail} from "../../Redux/slice/registrationSlice";
import React from "react";

export const Email = () => {

    const email = useAppSelector(emailSelector)
    const dispatch = useAppDispatch()

    const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const validRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        const value = e.target.value
        dispatch(setEmail(value))
        value.match(validRegex) ? dispatch(setDisabledButton(false)) : dispatch(setDisabledButton(true))
    }
    return <input
        className="registration__field _field"
        value={email}
        name="email"
        onChange={validateEmail}
    />
}